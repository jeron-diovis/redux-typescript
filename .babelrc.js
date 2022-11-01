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

/* Specifically for MUI, this optimization is not needed in production mode – imports will be tree-shaked automatically.
* But for dev mode, it's crucial – by default MUI imports EVERYTHING, where icons alone are 5+ MB – which dramatically slows down build process. */
function getMuiImportsTransforms() {
  return {
    "@mui/material": noFullImport("@mui/material/${member}"),
    "@mui/material/styles": noFullImport("@mui/material/styles/${member}"),
    "@mui/icons-material": noFullImport("@mui/icons-material/${member}"),
  }
}
