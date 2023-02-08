#!/bin/sh

function add_eslint() {
  echo Install eslint
  yarn add -D eslint \
    eslint-config-react-app \
    prettier \
    eslint-config-prettier \
    eslint-plugin-prettier
}

function add_styles() {
  echo Install stylelint and CSS preprocessor
  yarn add -D sass \
    stylelint \
    stylelint-config-css-modules \
    stylelint-config-standard-scss \
    typescript-plugin-css-modules
}

function add_jsx_if() {
  echo Install jsx-control-statements
  yarn add -D eslint-plugin-jsx-control-statements babel-plugin-jsx-control-statements @babel/plugin-transform-react-jsx
}

function add_vite_plugins() {
  echo Install Vite quality-of-life plugins
  yarn add -D vite-plugin-checker \
    vite-plugin-importus \
    vite-plugin-mock-dev-server \
    vite-plugin-react-click-to-component \
    vite-plugin-svgr \
    vite-plugin-time-reporter \
    rollup-plugin-visualizer \
    @esbuild-plugins/node-globals-polyfill \
    @esbuild-plugins/node-modules-polyfill
}

function add_musthave_packages() {
  echo Install must-have utility packages
  yarn add lodash clsx axios qs date-fns utility-types
  yarn add -D @types/lodash @types/qs @types/node lodash-es @types/lodash-es
}

function add_precommit() {
  yarn add -D 'husky@>=7' lint-staged
}

function main() {
  add_eslint
  add_styles
  add_jsx_if
  add_vite_plugins
  add_musthave_packages
  add_precommit
}

main
