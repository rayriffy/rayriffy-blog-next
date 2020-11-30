import React from 'react'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { BlogPost } from '../core/@types/BlogPost'
import { Pagination } from '../core/components/panigation'
import { Preview } from '../core/components/preview'

interface Props {
  preview: boolean
  featuredBlogPost: BlogPost | null
  blogPosts: BlogPost[]
  panigate: {
    current: number
    pages: number
  }
}

const Page: NextPage<Props> = props => {
  const { featuredBlogPost, blogPosts, panigate, preview } = props

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:px-6 lg:px-8">
      {preview && <Preview />}
      {featuredBlogPost !== null && (
        <div className="max-w-4xl mx-auto">
          <Link href={`/${featuredBlogPost.slug}`}>
            <a>
              <div className="rounded-none sm:rounded-lg overflow-hidden relative">
                <div className="absolute top-0 bottom-0 left-0 right-0 p-6 md:p-8 bg-black-overlay z-10 flex items-end">
                  <div className="space-y-0.5 md:space-y-2 text-white">
                    <span className="uppercase text-mediu md:text-lg">
                      Featured
                    </span>
                    <h1 className="text-2xl md:text-4xl">
                      {featuredBlogPost.title}
                    </h1>
                    <p className="text-lg md:text-xl">
                      {featuredBlogPost.subtitle}
                    </p>
                  </div>
                </div>
                <div className="next-image-wrapper">
                  <Image
                    src={featuredBlogPost.banner.url}
                    width={featuredBlogPost.banner.width}
                    height={featuredBlogPost.banner.height}
                    alt={featuredBlogPost.title}
                    layout="responsive"
                    priority
                  />
                </div>
              </div>
            </a>
          </Link>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
        {blogPosts.map((blogPost, i) => (
          <Link href={`/${blogPost.slug}`}>
            <a>
              <div
                className="rounded-none sm:rounded-lg overflow-hidden shadow-lg"
                key={`blog-${blogPost.slug}`}
              >
                <Image
                  alt={blogPost.title}
                  priority={i < 2}
                  layout="responsive"
                  {...(blogPost.banner === null
                    ? {
                        src: '/default.jpg',
                        width: 1200,
                        height: 630,
                      }
                    : {
                        src: blogPost.banner.url,
                        ...blogPost.banner,
                      })}
                />

                <div className="px-4 py-4 sm:px-6">
                  <h1 className="text-2xl text-gray-900">{blogPost.title}</h1>
                  <span className="text-gray-600">
                    Written by {blogPost.author.name} on{' '}
                  </span>
                  <p className="text-gray-600 py-2">{blogPost.subtitle}</p>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <div className="pt-6">
        <Pagination current={panigate.current} max={panigate.pages} />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { getBlogPosts } = await import('../core/services/getBlogPosts')
  const { getFeaturedBlogPost } = await import(
    '../core/services/getFeaturedBlogPost'
  )

  const { default: dayjs } = await import('dayjs')
  const { chunk, get } = await import('lodash')

  const { params, preview = false } = context
  const targetPage = Number(get(params, 'page[1]', '1'))

  const [featuredBlogPost, blogPosts] = await Promise.all([
    getFeaturedBlogPost(),
    getBlogPosts(preview),
  ])
  const blogChunks = chunk(blogPosts, 6)
  const blogChunk = get(blogChunks, targetPage - 1)

  return {
    props: {
      preview,
      featuredBlogPost: targetPage === 1 ? featuredBlogPost : null,
      blogPosts: blogChunk.map(blogPost => ({
        ...blogPost,
        date: dayjs(blogPost.date).format('DD MMM YYYY'),
        content: '',
      })),
      panigate: {
        current: targetPage,
        pages: blogChunks.length,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getBlogPosts } = await import('../core/services/getBlogPosts')

  const { chunk } = await import('lodash')

  const blogPosts = await getBlogPosts()
  const blogChunks = chunk(blogPosts, 6)

  return {
    paths: blogChunks.map((_, i) => {
      const page = i + 1

      return {
        params: {
          page: page === 1 ? [] : ['pages', page.toString()],
        },
      }
    }),
    fallback: false,
  }
}

export default Page
