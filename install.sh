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
  yarn add -D vite-split-config \
    vite-plugin-checker \
    vite-plugin-importus \
    vite-plugin-mock-dev-server \
    vite-plugin-chunk-split \
    vite-plugin-svgr \
    vite-plugin-time-reporter \
    rollup-plugin-visualizer \
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

function main() {
  add_eslint
  add_styles
  add_jsx_if
  add_vite_plugins
  add_musthave_packages
  add_precommit
}

main
