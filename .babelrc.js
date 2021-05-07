module.exports = {
  "plugins": [
    "jsx-control-statements",
    ["transform-imports", {
      ...getLodashImportsTransforms(),
      ...getMuiImportsTransforms(),
    }],
  ]
}

// ---

function getLodashImportsTransforms() {
  return {
    "lodash": {
      "transform": "lodash/${member}",
      "preventFullImport": true
    },
    "lodash/fp": {
      "transform": "lodash/fp/${member}",
      "preventFullImport": true
    }
  }
}

function getMuiImportsTransforms() {
  return {
    "@material-ui/icons": {
      "transform": "@material-ui/icons/esm/${member}",
      "preventFullImport": true
    },
    "@material-ui/styles": {
      "transform": "@material-ui/styles/esm/${member}",
      "preventFullImport": true
    },
    "@material-ui/core": {
      "transform": (importName) => {
        // @see https://github.com/mui-org/material-ui/issues/13394
        // If this issue will be fixed, replace transform with just `@material-ui/core/esm/${member}"
        if (importName === 'createMuiTheme') {
          return "@material-ui/core/styles/createMuiStrictModeTheme"
        } else {
          return `@material-ui/core/esm/${importName}`
        }
      },
      "preventFullImport": true
    }
  }
}
