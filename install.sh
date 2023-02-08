#!/bin/sh

function add_eslint() {
  echo Install eslint
  yarn add -D eslint \
    eslint-config-react-app \
    prettier \
    eslint-config-prettier \
    eslint-plugin-prettier
}

function add_vite_plugins() {
  echo Install Vite quality-of-life plugins
  yarn add -D vite-plugin-checker \
    vite-plugin-time-reporter \
    rollup-plugin-visualizer \
    vite-plugin-node
}

function add_musthave_packages() {
  echo Install must-have utility packages
  yarn add lodash lodash-es date-fns utility-types axios node-fetch
  yarn add -D @types/lodash @types/node @types/lodash-es
}

function add_precommit() {
  echo Install git-hook tools
  yarn add -D 'husky@>=7' lint-staged
}

function remove_react() {
  echo Remove react-related packages from default configuration
  yarn remove react react-dom @types/react @types/react-dom @vitejs/plugin-react
}

function main() {
  remove_react
  add_eslint
  add_vite_plugins
  add_musthave_packages
  add_precommit
}

main
