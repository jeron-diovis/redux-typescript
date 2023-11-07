#!/bin/sh

function add_eslint() {
  echo Install eslint
  yarn add -D eslint \
    eslint-config-react-app \
    prettier \
    eslint-plugin-prettier \
    eslint-config-prettier
}

function add_styles() {
  echo Install stylelint and CSS preprocessor
  # stylelint@15 is incompatible with vite-plugin-checker
  # stylelint-config-standard-scss@8+ requires stylelint@15
  yarn add -D sass \
    stylelint@^14.0 \
    stylelint-config-css-modules \
    stylelint-config-standard-scss@^7.0.0 \
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
    rollup-plugin-node-polyfills \
    vite-plugin-node-polyfills
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
