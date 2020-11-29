import React from 'react'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'

import { SEO } from '../core/components/seo'

import { BlogPost } from '../core/@types/BlogPost'

interface Props {
  blogPost: BlogPost
}

const Page: NextPage<Props> = props => {
  const { blogPost } = props

  return (
    <React.Fragment>
      <SEO title={blogPost.title} description={blogPost.subtitle} image={blogPost.banner.url} />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <Image src={blogPost.banner.url} width={blogPost.banner.width} height={blogPost.banner.height} priority />
          <div className="pt-4 pb-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl pt-2">{blogPost.title}</h1>
            <span className="text-gray-600">Written by {blogPost.author.name} on {blogPost.date}</span>
            <div className="pt-6 prose prose-blue max-w-3xl mx-auto" dangerouslySetInnerHTML={{
              __html: blogPost.content
            }}></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { getBlogPost } = await import('../core/services/getBlogPost')

  const { default: dayjs } = await import('dayjs')

  const { default: remark } = await import('remark')
  const { default: html } = await import('remark-html')

  const slug = context.params.slug as string

  const blogPost = await getBlogPost(slug)
  const parser = await remark().use(html).process(blogPost.content)

  return {
    props: {
      blogPost: {
        ...blogPost,
        date: dayjs(blogPost.date).format('DD MMM YYYY'),
        content: parser.toString(),
      },
    } 
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getBlogPosts } = await import('../core/services/getBlogPosts')

  const blogPosts = await getBlogPosts()

  return {
    paths: blogPosts.map(blogPost => ({
      params: {
        slug: blogPost.slug
      }
    })),
    fallback: false,
  }
}

export default Page
