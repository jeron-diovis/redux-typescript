module.exports = {
  "plugins": [
    // https://github.com/storybookjs/paths.macro
    "macros",
    // https://www.npmjs.com/package/jsx-control-statements
    "jsx-control-statements",
    // https://www.npmjs.com/package/babel-plugin-transform-imports
    ["transform-imports", {
      ...getLodashImportsTransforms(),
      ...getMuiImportsTransforms(),

      "date-fns": noFullImport("date-fns/${member}"),
    }],
  ]
}

// ---

function noFullImport(transform) {
  return {
    "transform": transform,
    "preventFullImport": true,
  }
}

function getLodashImportsTransforms() {
  return {
    "lodash": noFullImport("lodash/${member}"),
    "lodash/fp": noFullImport("lodash/fp/${member}"),
  }
}

function getMuiImportsTransforms() {
  return {
    "@material-ui/icons": noFullImport("@material-ui/icons/esm/${member}"),
    "@material-ui/styles": noFullImport("@material-ui/styles/esm/${member}"),
    "@material-ui/core": noFullImport((importName) => {
      // @see https://github.com/mui-org/material-ui/issues/13394
      // If this issue will be fixed, replace transform with just `@material-ui/core/esm/${member}"
      if (importName === 'createMuiTheme') {
        return "@material-ui/core/styles/createMuiStrictModeTheme"
      } else {
        return `@material-ui/core/esm/${importName}`
      }
    }),
  }
}
