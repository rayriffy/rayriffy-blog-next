import { decode, encode } from 'blurhash'
import fetch from 'node-fetch'
import sharp from 'sharp'

import type { Asset } from '../@types/Asset'

interface BlurhashResponse {
  blurhashCode: string
  encoded: string
}

export const getBlurImage = async (image: Asset): Promise<BlurhashResponse> => {
  /*
    If blurhash token is not defined, then do manually
  */
  if (process.env.BLURHASH_TOKEN === undefined) {
    try {
      // fetch an image
      const fetchedImage = await fetch(image.placeholder).then(o =>
        o.arrayBuffer()
      )

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
      throw 'blurhash-fail'
    }
  } else {
    const res = await fetch('https://api.rayriffy.com/api/blurhash', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: process.env.BLURHASH_TOKEN ?? '',
      },
      body: JSON.stringify({
        url: image.placeholder,
      }),
    }).then(o => o.json())

    if (res.status === 'success') {
      return res.data
    } else {
      throw 'blurhash-fail'
    }
  }
}
