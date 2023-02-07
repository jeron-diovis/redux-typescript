const { ESLint } = require('eslint')

const eslint = new ESLint()

/**
 * @see https://stackoverflow.com/questions/37927772/how-to-silence-warnings-about-ignored-files-in-eslint
 */
async function removeIgnoredFiles(files) {
  const is_ignored = await Promise.all(
    files.map(file => eslint.isPathIgnored(file))
  )
  const filtered = files.filter((_, i) => !is_ignored[i])
  return filtered.join(' ')
}

module.exports = {
  '{src,mock}/**/*.{cjs,js,ts,jsx,tsx}': async files => [
    `eslint --cache --fix --max-warnings=0 ${await removeIgnoredFiles(files)}`,
  ],

  'src/**/*.{s,}css': ['stylelint --cache --fix --max-warnings=0'],
}
