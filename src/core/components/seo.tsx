import { FunctionComponent, PropsWithChildren, useMemo } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

interface Props {
  title?: string
  description?: string
  image?: string
}

export const SEO: FunctionComponent<PropsWithChildren<Props>> = props => {
  const {
    title,
    description = 'The Nerdy Blogger',
    image = 'https://blog.rayriffy.com/default.jpg',
    children,
  } = props

  const router = useRouter()

  const transformedTitle = useMemo(
    () => (title ? `Riffy Blog · ${title}` : 'Riffy Blog'),
    [title]
  )

  return (
    <Head>
      <title key="head-title">{transformedTitle}</title>
      <meta key="meta:title" name="title" content={transformedTitle} />
      <meta key="meta:description" name="description" content={description} />

      <link rel="icon" href="/icon.png" />

      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:url" property="og:url" content={router.asPath} />
      <meta key="og:title" property="og:title" content={transformedTitle} />
      <meta key="og:description" property="og:description" content={description} />

      <meta key="twitter:card" property="twitter:card" content="summary_large_image" />
      <meta key="twitter:url" property="twitter:url" content={router.asPath} />
      <meta key="twitter:title" property="twitter:title" content={transformedTitle} />
      <meta key="twitter:description" property="twitter:description" content={description} />

      <meta key="og:image" property="og:image" content={image} />
      <meta key="twitter:image" property="twitter:image" content={image} />

      {children}
    </Head>
  )
}
