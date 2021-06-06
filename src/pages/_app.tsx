import React from 'react'

import { NextPage } from 'next'
import { AppProps } from 'next/app'

import { AppLayout } from '../app/components/layout'

import '../styles/tailwind.css'

const App: NextPage<AppProps> = props => {
  const { Component, pageProps } = props

  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default App
