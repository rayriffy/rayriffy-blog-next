import React from 'react'

import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { AppLayout } from '../app/components/layout'

import '../styles/tailwind.css'

const App: NextPage<AppProps> = props => {
  const { Component, pageProps } = props

  const { pathname } = useRouter()

  return (
    <AppLayout>
      <Component {...pageProps} />
      {pathname === '/[slug]' && (
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
      )}
    </AppLayout>
  )
}

export default App
