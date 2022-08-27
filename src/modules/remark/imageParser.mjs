import { stringify } from 'querystring'
import { selectAll } from 'unist-util-select'
import { encode } from 'html-entities'

/**
 * Check if asset comes from contentful cdn
 * @param {string} url
 * @returns boolean
 */
const isContentfulImage = url => url.includes('images.ctfassets.net')

/**
 * Generate URL params for Image API
 * @param {string} url
 * @param {'jpg' | 'png' | 'webp' | 'avif'} type
 * @param {number} size
 * @returns
 */
const getContentfulURL = (url, type, size) => {
  const builtOption = Object.fromEntries([
    ['q', 80],
    ['fm', type],
    ...(size === undefined ? [] : [['w', size]]),
  ])
  const params = stringify(builtOption)

  return `${url.startsWith('//') ? 'https:' : ''}${url}?${params}`
}

/**
 *
 * @param {string} url
 * @param {'jpg' | 'png' | 'webp' | 'avif'} type
 * @returns
 */
const generateSourceSet = (url, type) =>
  [640, 750, 828, 1080, 1200]
    .map(size =>
      [encode(getContentfulURL(url, type, size)), `${size}w`].join(' ')
    )
    .join(', ')

/** @type {import('@astrojs/markdown-remark').RemarkPlugin} */
export const imageParser = () => {
  return async markdownAST => {
    // transform
    const nodes = selectAll('[type=image]', markdownAST)

    await Promise.all(
      nodes.map(async node => {
        const baseHtml = `<img src="${encode(
          getContentfulURL(node.url, 'jpg')
        )}" alt="${encode(node.alt)}" loading="lazy" />`

        node.type = 'html'
        node.children = undefined

        if (isContentfulImage(node.url)) {
          const html = `
            <picture>
              <source type="image/avif" srcset="${generateSourceSet(
                node.url,
                'avif'
              )}"></srouce>
              <source type="image/webp" srcset="${generateSourceSet(
                node.url,
                'webp'
              )}"></srouce>
              <source type="image/jpeg" srcset="${generateSourceSet(
                node.url,
                'jpg'
              )}"></srouce>
              ${baseHtml}
            </picture>
          `

          node.value = html
        } else {
          node.value = baseHtml
        }
      })
    )
  }
}
