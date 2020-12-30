import React from 'react'

import { NextPage } from 'next'

import { SEO } from '../core/components/seo'

const Page: NextPage = props => {
  return (
    <React.Fragment>
      <SEO />
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <video
            src="https://media.tenor.com/videos/ee357227981a7accb37ac954f4b28eea/mp4"
            className="w-full h-auto"
            autoPlay
            loop
            muted
          ></video>
          <div className="pt-4 pb-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl pt-2">หน้านี้ไม่มีอยู่จริง</h1>
            <div className="pt-6 prose prose-blue max-w-3xl mx-auto">
              คุณหลุดมาอยู่ตรงนี้ได้อย่างไรนี่
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Page
