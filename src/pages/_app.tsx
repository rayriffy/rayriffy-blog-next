import React from 'react'

import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Script from 'next/script'

import { AppLayout } from '../app/components/layout'

import '../styles/tailwind.css'

const App: NextPage<AppProps> = props => {
  const { Component, pageProps } = props

  return (
    <AppLayout>
      <Component {...pageProps} />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-J24WPTD619"
        strategy="worker"
      />
      <Script id="google-analytics" strategy="worker">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-J24WPTD619');
        `}
      </Script>
    </AppLayout>
  )
}

export default App
