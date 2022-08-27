import fetch from 'node-fetch'

import type { Asset } from '../@types/Asset'

export const getBlurImage = async (image: Asset) => {
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
