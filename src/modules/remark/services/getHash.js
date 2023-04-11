import { createHash } from 'crypto'

/**
 *
 * @param {(string | number | Buffer)[]} items
 * @returns string
 */
export const getHash = items => {
  const hash = createHash('sha256')
  for (let item of items) {
    if (typeof item === 'number') hash.update(String(item))
    else {
      hash.update(item)
    }
  }
  // See https://en.wikipedia.org/wiki/Base64#Filenames
  return hash.digest('base64').replace(/\//g, '-')
}
