const { ESLint } = require('eslint')

const eslint = new ESLint()

/**
 * @see https://stackoverflow.com/questions/37927772/how-to-silence-warnings-about-ignored-files-in-eslint
 * @see https://github.com/lint-staged/lint-staged#eslint--7-1
 * With eslint it's impossible to silently run it over ignored files. They must be explicitly excluded from command's args.
 *
 * Warning can be suppressed with `--no-warn-ignored` option
 * @see https://eslint.org/docs/latest/use/command-line-interface#--no-warn-ignored
 * but that's only works with a new "flat config" mode, which requires migration.
 */
async function removeIgnoredFiles(files) {
  const is_ignored = await Promise.all(
    files.map(file => eslint.isPathIgnored(file))
  )
  const filtered = files.filter((_, i) => !is_ignored[i])
  return filtered.join(' ')
}

const paths = '{src,mock,tests}/**'

module.exports = {
  [`${paths}/*.{c,}{j,t}s{x,}`]: async files => [
    `eslint --cache --fix --max-warnings=0 --no-error-on-unmatched-pattern ${await removeIgnoredFiles(
      files
    )}`,
  ],

  [`${paths}/*.{s,}css`]: [
    'stylelint --cache --fix --max-warnings=0 --allow-empty-input',
  ],
}
