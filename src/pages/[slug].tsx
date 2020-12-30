import React from 'react'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { SEO } from '../core/components/seo'
import { Preview } from '../core/components/preview'

import { BlogPost } from '../core/@types/BlogPost'

interface Props {
  preview: boolean
  blogPost: BlogPost
}

const Page: NextPage<Props> = props => {
  const { blogPost, preview } = props

  const router = useRouter()

  console.log({ blogPost })

  if (router.isFallback) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <video
            src="https://media.tenor.com/videos/2a80e4b7a52833a14ed31b0bfa59e601/mp4"
            className="w-full h-auto"
            autoPlay
            loop
            muted
          ></video>
          <div className="pt-4 pb-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl pt-2">กำลังโหลด</h1>
            <div className="pt-6 prose prose-blue max-w-3xl mx-auto">
              กำลังดึงข้อมูล...กรุณารอสักครู่
            </div>
          </div>
        </div>
      </div>
    )
  } else {
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
                <article
                  className="pt-6 prose prose-blue max-w-3xl mx-auto"
                  dangerouslySetInnerHTML={{
                    __html: blogPost.content,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  try {
    const { getBlogPost } = await import('../core/services/getBlogPost')

    const { default: dayjs } = await import('dayjs')

    const { default: remark } = await import('remark')
    const { default: html } = await import('remark-html')
    const { remarkParser } = await import('../core/services/remarkParser')

    const { params, preview = false } = context
    const slug = params.slug as string

    const blogPost = await getBlogPost(slug, preview)
    const parser = await remark()
      .use(html)
      .use(remarkParser)
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
    fallback: true,
  }
}

export default Page
