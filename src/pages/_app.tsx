import React from 'react'

import { NextPage } from 'next'
import { AppProps } from 'next/app'

import { AppLayout } from '../app/components/layout'
import { SEO } from '../core/components/seo'

import '../styles/tailwind.css'

const App: NextPage<AppProps> = props => {
  const { Component, pageProps } = props

  return (
    <React.Fragment>
      <SEO />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </React.Fragment>
  )
}

export default App
