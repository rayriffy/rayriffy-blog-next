import getReadingTime from 'reading-time'

/**
 *
 * @param {import('mdast').Root} value
 * @param {boolean} includeImageAlt
 * @returns
 */
const one = (value, includeImageAlt = false) =>
  (node(value) &&
    (('value' in value && value.value) ||
      (includeImageAlt && 'alt' in value && value.alt) ||
      ('children' in value && all(value.children, includeImageAlt)))) ||
  (Array.isArray(value) && all(value, includeImageAlt)) ||
  ''

/**
 * @param {import('mdast').Root} value
 * @param {boolean} includeImageAlt
 * @returns {string}
 */
const all = (values, includeImageAlt) => {
  /** @type {Array<string>} */
  const result = []
  let index = -1

  while (++index < values.length) {
    result[index] = one(values[index], includeImageAlt)
  }

  return result.join('')
}

/**
 *
 * @param {import('mdast').Root} value
 * @returns
 */
const node = value => Boolean(value && typeof value === 'object')

/** @type {import('@astrojs/markdown-remark').RemarkPlugin} */
export const readingTime = () => {
  return async (markdownAST, { data }) => {
    const textContent = one(markdownAST)

    const readingTime = getReadingTime(textContent, {
      wordsPerMinute: 150,
    })
    data.astro.frontmatter.minutesRead = readingTime.text
  }
}
