#!/bin/sh

# ---

function npm_or_yarn() {
  if [ -f yarn.lock ]; then
    echo "$2"
  else
    echo "$1"
  fi
}

function install() {
  CMD=$(npm_or_yarn \
   "npm install --audit=false --fund=false" \
   "yarn add")

  $CMD "$@"
}

function override() {
  PROP=$(npm_or_yarn overrides resolutions)
  npm pkg set "$PROP.$1=$2"
}

function npm_script() {
  npm pkg set "scripts.$1=$2"
}

function append_line() {
  LINE=$1
  FILE=$2
  if [ -f "$FILE" ] && ! (grep -q "$LINE" "$FILE"); then
    echo "$LINE" >> "$FILE"
  else
    return 1
  fi
}

# ---

function add_eslint() {
  echo Install eslint

  # have to pin it to make eslint@8 and vite-plugin-checker a friends
  override meow "^9.0.0"
  append_line .eslintcache .gitignore

  # Pin eslint to v8, because v9 seems to be incompatible with vite-plugin-checker@0.6.4
  install -D eslint@^8.0.0 \
    @typescript-eslint/eslint-plugin \
    @typescript-eslint/parser \
    eslint-plugin-react-hooks \
    eslint-plugin-react \
    eslint-plugin-import \
    eslint-plugin-react-refresh \
    prettier \
    eslint-plugin-prettier \
    eslint-config-prettier
}

function add_styles() {
  echo Install stylelint and CSS preprocessor
  append_line .stylelintcache .gitignore
  install -D sass \
    stylelint \
    stylelint-config-css-modules \
    stylelint-config-standard-scss \
    typescript-plugin-css-modules \
    postcss-nested \
    postcss-mixins \
    postcss-custom-selectors
}

function add_jsx_if() {
  echo Install jsx-control-statements
  install -D eslint-plugin-jsx-control-statements \
    babel-plugin-jsx-control-statements \
    @babel/plugin-transform-react-jsx
}

function add_vite_plugins() {
  echo Install Vite quality-of-life plugins
  install -D @vitejs/plugin-react \
    vite-split-config \
    vite-plugin-checker \
    vite-plugin-importus \
    vite-plugin-mock-dev-server \
    vite-plugin-chunk-split \
    vite-plugin-svgr \
    vite-plugin-time-reporter \
    vite-tsconfig-paths \
    rollup-plugin-visualizer \
    rollup-plugin-module-replacement \
    rollup-plugin-node-polyfills \
    vite-plugin-node-polyfills

  # Add types for SVGR plugin
  TYPES_FILE=vite-env.d.ts
  FILES=($TYPES_FILE, types/$TYPES_FILE)
  for file in "${FILES[@]}"; do
    LINE='/// <reference types="vite-plugin-svgr/client" />'
    if append_line "$LINE" "src/$file"; then
      break
    fi
  done
}

function add_musthave_packages() {
  echo Install must-have utility packages
  install lodash-es date-fns \
    clsx axios query-string utility-types
  install -D @types/lodash-es @types/node
}

function add_precommit() {
  echo Install git-hooks tools
  install -D 'husky@^7.0.0' lint-staged
  ./init-git-hooks.sh
}

function add_tests() {
  echo Install testing utilities
  install -D vitest \
    @vitest/ui \
    @testing-library/react \
    @testing-library/jest-dom
}

function add_npm_scripts() {
  echo Add npm scripts to package.json
  npm_script stat './view-stats.sh'
  npm_script lint:js "eslint src --ext .cjs,.js,.jsx,.ts,.tsx"
  npm_script lint:ts "tsc --noEmit && cd mock && tsc --noEmit"
  npm_script lint:css "stylelint \"src/**/*.{s,}css\""
  npm_script lint "yarn lint:js && yarn lint:ts && yarn lint:css"
  npm_script fix "yarn lint:js --fix && yarn lint:css --fix"
  npm_script test "vitest"
}

function edit_ts_config() {
  echo Adjust tsconfig with types and plugins
  install -D dot-json

  function remove_comments() {
    sed -i '' -e '/^[[:space:]]*\/\*.*\*\//d' "$1"
  }

  function json_prop() {
    dot-json "$1" -j "$2" "$3"
  }

  # remove block comments (which may be added by Vite's scaffolder, for example)
  # Because any json-parsers will break at comment lines
  remove_comments tsconfig.json
  remove_comments tsconfig.node.json

  json_prop tsconfig.json compilerOptions.plugins '[{ "name": "typescript-plugin-css-modules" }]'
  json_prop tsconfig.json compilerOptions.types '["vitest", "vitest/globals", "vitest/importMeta", "@testing-library/jest-dom"]'
  json_prop tsconfig.node.json include '["vite.config.ts", ".vite/**/*.ts", "package.json"]'
}

function main() {
  add_precommit
  add_eslint
  add_styles
  add_jsx_if
  add_vite_plugins
  add_musthave_packages
  add_tests
  edit_ts_config
  add_npm_scripts
}

main
