import React from 'react'

import Link from 'next/link'

import { Footer } from './footer'
import { Logo } from './logo'

import { headerNavationItems } from '../constants/headerNavationItems'

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
          <div className="flex justify-center space-x-6 pt-4 text-gray-900 hover:text-gray-700 uppercase text-sm select-none">
            {headerNavationItems.map(item =>
              item.disabled ? (
                <span
                  className="cursor-not-allowed"
                  key={`navbar-header-${item.key}`}
                >
                  {item.name}
                </span>
              ) : item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={`navbar-header-${item.key}`}
                >
                  {item.name}
                </a>
              ) : (
                <Link href={item.href} key={`navbar-header-${item.key}`}>
                  <a>{item.name}</a>
                </Link>
              )
            )}
          </div>
        </header>
        <main>{children}</main>
        <Footer />
      </div>
    </React.Fragment>
  )
}
