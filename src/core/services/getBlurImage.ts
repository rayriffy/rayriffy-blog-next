import wretch from 'wretch'
import { decode, encode } from 'blurhash'
import sharp from 'sharp'

import type { Asset } from '../@types/Asset'

interface BlurhashResponse {
  blurhashCode: string
  encoded: string
}

export const getBlurImage = async (image: Asset, attempt = 1): Promise<BlurhashResponse> => {
  /*
    If blurhash token is not defined, then do manually
  */
  try {
    // fetch an image
    const fetchedImage = await wretch(image.placeholder).get().arrayBuffer()

    // encode
    const {
      data,
      info: { width, height },
    } = await sharp(Buffer.from(fetchedImage))
      .raw()
      .ensureAlpha()
      .toBuffer({ resolveWithObject: true })
    const hash = encode(new Uint8ClampedArray(data), width, height, 4, 3)

    // decode
    const hashSize =
      width > height
        ? {
            width: 8,
            height: Math.round(8 * (Number(height) / Number(width))),
          }
        : {
            width: Math.round(8 * (Number(height) / Number(width))),
            height: 8,
          }

    const pixels = decode(hash, hashSize.width, hashSize.height)

    const resizedImageBuf = await sharp(Buffer.from(pixels), {
      raw: {
        channels: 4,
        width: hashSize.width,
        height: hashSize.height,
      },
    })
      .jpeg({
        overshootDeringing: true,
        quality: 40,
      })
      .toBuffer()

    return {
      blurhashCode: hash,
      encoded: `data:image/jpeg;base64,${resizedImageBuf.toString('base64')}`,
    }
  } catch (e) {
    if (attempt < 2) {
      console.log(`attempt #${attempt} failed! performing attempt #${attempt + 1} in 10 seconds`)
      await new Promise(r => setTimeout(r, 10000))

      return getBlurImage(image, attempt + 1)
    } else {
      console.log(e)
      throw 'blurhash-fail'
    }
  }
}
