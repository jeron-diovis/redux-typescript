#!/bin/sh

# ---
# Package manager utils

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

# ---
# Misc utils

function append_line() {
  LINE=$1
  FILE=$2
  if [ -f "$FILE" ] && ! (grep -q "$LINE" "$FILE"); then
    echo "$LINE" >> "$FILE"
  else
    return 1
  fi
}

function add_global_types() {
  LINE=$1
  TYPES_FILE=vite-env.d.ts
  FILES=($TYPES_FILE, types/$TYPES_FILE)
  for file in "${FILES[@]}"; do
    if append_line "$LINE" "src/$file"; then
      break
    fi
  done
}

function add_types_reference() {
  add_global_types "/// <reference types=\"$1\" />"
}

function colored() {
  PREFIX='\033['
  COLOR="${PREFIX}${1}"
  NOCOLOR="${PREFIX}0m"
  shift 1
  echo "${COLOR}${*}${NOCOLOR}"
}

function section_header() {
  PKG=$(npm pkg get name)
  COLOR='0;32m'
  echo "$(colored ${COLOR} [${PKG}:setup])" "$@"
}

# ---
# Installation scripts

function add_eslint() {
  section_header Install eslint

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
  section_header Install stylelint and CSS preprocessor
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
  section_header Install react-control-statements
  install -D vite-plugin-react-control-statements \
    @types/vite-plugin-react-control-statements \
    eslint-plugin-jsx-control-statements

  add_types_reference vite-plugin-react-control-statements
}

function add_vite_plugins() {
  section_header Install Vite quality-of-life plugins
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

  add_types_reference vite-plugin-svgr/client
}

function add_musthave_packages() {
  section_header Install must-have utility packages
  install lodash-es date-fns \
    clsx axios query-string utility-types
  install -D @types/lodash-es @types/node chalk
}

function add_precommit() {
  section_header Install git-hooks tools
  install -D 'husky@^7.0.0' lint-staged
  ./init-git-hooks.sh
  # if other developer clones and installs already set up repo,
  # he must get hooks installed after running `npm install`
  npm_script prepare "./init-git-hooks.sh"
}

function add_tests() {
  section_header Install testing utilities
  install -D vitest \
    @vitest/ui \
    @testing-library/react \
    @testing-library/jest-dom
}

function add_npm_scripts() {
  section_header Add npm scripts to package.json
  npm_script stat './view-stats.sh'
  npm_script lint:js "eslint src --ext .cjs,.js,.jsx,.ts,.tsx"
  npm_script lint:ts "tsc --noEmit && cd mock && tsc --noEmit"
  npm_script lint:css "stylelint \"src/**/*.{s,}css\""
  npm_script lint "yarn lint:js && yarn lint:ts && yarn lint:css"
  npm_script fix "yarn lint:js --fix && yarn lint:css --fix"
  npm_script test "vitest"
}

function edit_ts_config() {
  section_header Adjust tsconfig with types and plugins
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

function fix_bad_deps() {
  # these indirect deps report deprecation errors
  override rimraf ">=4.0.0"
  override glob ">=9.0.0"

  # these ones report deprecation warnings with specific replacements
  override rollup-plugin-inject "npm:@rollup/plugin-inject"
  override sourcemap-codec "npm:@jridgewell/sourcemap-codec"
}

# ---
# Run

function main() {
  section_header Start configuring project

  fix_bad_deps
  add_eslint
  add_styles
  add_jsx_if
  add_vite_plugins
  add_musthave_packages
  add_tests
  edit_ts_config
  add_npm_scripts
  add_precommit

  section_header All done!
}

main
