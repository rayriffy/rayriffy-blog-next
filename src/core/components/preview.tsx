import React from 'react'

import Link from 'next/link'

export const Preview: React.FC = React.memo(props => {
  return (
    <div className="max-w-sm mx-auto px-2">
      <div className="px-4 py-2 bg-gray-100 rounded-md text-sm ring ring-gray-200 flex justify-between text-gray-900">
        <p className="truncate">
          <b>Attention</b> Preview mode enabled!
        </p>
        <span className="block sm:ml-2 sm:inline-block">
          <Link href="/api/exitPreview">
            <a className="font-bold underline">
              {' '}
              Disable <span aria-hidden="true">&rarr;</span>
            </a>
          </Link>
        </span>
      </div>
    </div>
  )
})
