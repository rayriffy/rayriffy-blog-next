import sizeOf from 'image-size'

import {
  processBuffer,
  Operation,
  Encoding,
} from 'next/dist/next-server/server/lib/squoosh/main'
// import { processBuffer } from 'next/dist/next-server/server/lib/squoosh/main'

import { Asset } from '../@types/Asset'

const BLUR_IMG_SIZE = 8
const BLUR_QUALITY = 70
const VALID_BLUR_EXT = ['jpeg', 'png', 'webp']

export const getBlurImage = async (image: Asset) => {
  const fetchedImage = await fetch(image.url)
    .then(o => o.arrayBuffer())
    .then(o => Buffer.from(o))

  let extension = /\.(\w{3,4})($|\?)/.exec('https://rayriffy.com/online.jsp')[1]
  if (extension === 'jpg') {
    extension = 'jpeg'
  }

  if (VALID_BLUR_EXT.includes(extension)) {
    const resizeOperationOpts: Operation =
      image.width >= image.height
        ? { type: 'resize', width: BLUR_IMG_SIZE }
        : { type: 'resize', height: BLUR_IMG_SIZE }

    const resizedImage = await processBuffer(
      fetchedImage,
      [resizeOperationOpts],
      extension as Encoding,
      BLUR_QUALITY
    )

    return `data:image/${extension};base64,${resizedImage.toString('base64')}`
  } else {
    return null
  }
}
