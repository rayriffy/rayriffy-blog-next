import React from 'react'

import Link from 'next/link'

import { Footer } from './footer'
import { Logo } from './logo'

export const AppLayout: React.FC = props => {
  const { children } = props

  return (
    <React.Fragment>
      <div className="py-12 space-y-8">
        <header className="max-w-md mx-auto">
          <div className="flex justify-center">
            <Link href="/">
              <a aria-label="Logo">
                <Logo className="w-20" />
              </a>
            </Link>
          </div>
        </header>
        <main>
          {children}
        </main>
        <Footer />
      </div>
    </React.Fragment>
  )
}
