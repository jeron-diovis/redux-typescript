const paths = '{src,mock,tests}/**'

module.exports = {
  [`${paths}/*.{c,}{j,t}s{x,}`]: `eslint --cache --fix --max-warnings=0 --no-error-on-unmatched-pattern --no-warn-ignored`,

  /**
   * @see https://www.npmjs.com/package/lint-staged#example-run-tsc-on-changes-to-typescript-files-but-do-not-pass-any-filename-arguments
   * Must use a function value here.
   * If you specify just a string command, without function ≠ each changed file will be passed as args to that command.
   * And TS doesn't allow to specify both `--project` option and filenames in one command, so it will crash.
   *
   * With function here, command will run without passing specific files to it.
   *
   * This will validate ALL TS files in project.
   * It takes more time, but makes sense, because change in one file can break typings for other unchanged files.
   */
  [`${paths}/*.ts{x,}`]: () => 'tsc -p tsconfig.json --noEmit',

  [`${paths}/*.{s,}css`]:
    'stylelint --cache --fix --max-warnings=0 --allow-empty-input',
}
