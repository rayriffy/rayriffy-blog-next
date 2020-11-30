import React, { useMemo } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

interface Props {
  title?: string
  description?: string
  image?: string
}

export const SEO: React.FC<Props> = props => {
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
      <title>{transformedTitle}</title>
      <meta name="title" content={transformedTitle} />
      <meta name="description" content={description} />

      <link rel="icon" href="/icon.png" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={router.asPath} />
      <meta property="og:title" content={transformedTitle} />
      <meta property="og:description" content={description} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={router.asPath} />
      <meta property="twitter:title" content={transformedTitle} />
      <meta property="twitter:description" content={description} />

      <meta property="og:image" content={image} />
      <meta property="twitter:image" content={image} />

      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;600;700&family=Niramit:wght@400;700&display=swap"
      />

      {children}
    </Head>
  )
}
