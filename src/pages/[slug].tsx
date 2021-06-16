import React, { useState } from 'react'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Script from 'next/script'

import { SEO } from '../core/components/seo'
import { Preview } from '../core/components/preview'
import { Adsense } from '../core/components/adsense'

import { BlogPost } from '../core/@types/BlogPost'

interface Props {
  preview: boolean
  blogPost: BlogPost
}

const Page: NextPage<Props> = props => {
  const { blogPost, preview } = props

  const [isAdsenseMount, setIsAdsensMount] = useState(false)

  return (
    <React.Fragment>
      <SEO
        title={blogPost.title}
        description={blogPost.subtitle}
        image={blogPost.banner.url}
      />
      <div className="space-y-6">
        {preview && <Preview />}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <Image
              src={blogPost.banner.url}
              width={blogPost.banner.width}
              height={blogPost.banner.height}
              placeholder="blur"
              blurDataURL={blogPost.banner.placeholder}
              alt={blogPost.title}
              layout="responsive"
              priority
            />
            <div className="pt-4 pb-8 px-4 sm:px-6 lg:px-8">
              <div className="pt-2">
                <h1 className="text-4xl">{blogPost.title}</h1>
                <span className="text-gray-600">
                  Written by {blogPost.author.name} on {blogPost.date}
                </span>
                <div className="flex flex-wrap space-x-2 space-y-2 pt-3">
                  {blogPost.categoryCollection.items.map(category => (
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800"
                      key={`category-slug-${category.key}`}
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
              <section className="flex justify-center py-4">
                <div>
                  {isAdsenseMount && (
                    <Adsense
                      client="ca-pub-2837414306121160"
                      style={{
                        width: 300,
                        height: 250,
                        minHeight: '250px',
                      }}
                      slot="4010112179"
                      format="fluid"
                      layoutKey="-fb+5w+4e-db+86"
                      className="block"
                    />
                  )}
                </div>
              </section>
              <article
                className="pt-6 prose prose-blue max-w-3xl mx-auto"
                dangerouslySetInnerHTML={{
                  __html: blogPost.content,
                }}
              />
              <section className="flex justify-center py-4">
                <div>
                  {isAdsenseMount && (
                    <Adsense
                      client="ca-pub-2837414306121160"
                      style={{
                        width: 468,
                        height: 200,
                      }}
                      slot="5740521463"
                      format="auto"
                      responsive="true"
                      className="block"
                    />
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        strategy="afterInteractive"
        onLoad={() => setIsAdsensMount(true)}
      />
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  try {
    const { getBlogPost } = await import('../core/services/getBlogPost')

    const { default: dayjs } = await import('dayjs')

    const { default: remark } = await import('remark')
    const { default: html } = await import('remark-html')
    const { iframeParser } = await import(
      '../core/services/remark/iframeParser'
    )
    const { imageLazyParser } = await import(
      '../core/services/remark/imageLazyParser'
    )

    const { params, preview = false } = context
    const slug = params.slug as string

    const blogPost = await getBlogPost(slug, preview)
    const parser = await remark()
      .use(html)
      .use(iframeParser)
      .use(imageLazyParser)
      .process(blogPost.content)

    return {
      props: {
        preview,
        blogPost: {
          ...blogPost,
          date: dayjs(blogPost.date).format('DD MMM YYYY'),
          content: parser.toString(),
        },
      },
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getBlogPosts } = await import('../core/services/getBlogPosts')

  const blogPosts = await getBlogPosts()

  return {
    paths: blogPosts.map(blogPost => ({
      params: {
        slug: blogPost.slug,
      },
    })),
    fallback: false,
  }
}

export default Page
