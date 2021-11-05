/**
 * See explanations in ./install-cra-deps.sh
 */

const { devDependencies: host_dependencies } = require('./package.json')
const { dependencies } = require('react-scripts/package.json')

const re_eslint = /(^eslint$)|(@typescript-eslint)|(eslint-(plugin|config))/

const cra_deps = Object.keys(dependencies)
  .filter(x => re_eslint.test(x))
  .filter(x => !(x in host_dependencies))

console.log(cra_deps.join(' '))
