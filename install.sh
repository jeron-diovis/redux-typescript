#!/bin/sh

function add_eslint() {
  echo Install eslint
  # prettier@3 has weird bugs in loading prettierrc and trailing commas formatting
  # eslint-plugin-prettier@5 use s prettier v3
  yarn add -D eslint \
    eslint-config-react-app \
    prettier@^2.8.8 \
    eslint-plugin-prettier@^4.2.1 \
    eslint-config-prettier
}

function add_styles() {
  echo Install stylelint and CSS preprocessor
  # stylelint@15 is incompatible with vite-plugin-checker
  yarn add -D sass \
    stylelint@^14.0 \
    stylelint-config-css-modules \
    stylelint-config-standard-scss \
    typescript-plugin-css-modules \
    postcss-nested \
    postcss-mixins \
    postcss-custom-selectors
}

function add_jsx_if() {
  echo Install jsx-control-statements
  yarn add -D eslint-plugin-jsx-control-statements babel-plugin-jsx-control-statements @babel/plugin-transform-react-jsx
}

function add_vite_plugins() {
  echo Install Vite quality-of-life plugins
  yarn add -D @vitejs/plugin-react \
    vite-split-config \
    vite-plugin-checker \
    vite-plugin-importus \
    vite-plugin-mock-dev-server \
    vite-plugin-chunk-split \
    vite-plugin-svgr \
    vite-plugin-time-reporter \
    rollup-plugin-visualizer \
    rollup-plugin-module-replacement \
    @esbuild-plugins/node-globals-polyfill \
    @esbuild-plugins/node-modules-polyfill
}

function add_musthave_packages() {
  echo Install must-have utility packages
  yarn add lodash-es ramda date-fns \
    clsx axios qs utility-types
  yarn add -D @types/lodash-es @types/ramda \
    @types/qs @types/node
}

function add_precommit() {
  echo Install git-hooks tools
  yarn add -D 'husky@>=7' lint-staged
}

function add_tests() {
  echo Install testing utilities
  yarn add -D vitest \
    @vitest/ui \
    @testing-library/react \
    @testing-library/jest-dom
}

function main() {
  add_precommit
  add_eslint
  add_styles
  add_jsx_if
  add_vite_plugins
  add_musthave_packages
  add_tests
}

main
