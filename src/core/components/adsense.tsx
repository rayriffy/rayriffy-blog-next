import React, { useEffect } from 'react'

interface Props extends React.InsHTMLAttributes<HTMLModElement> {
  client: string
  slot: string
  format?: string
  layout?: string
  layoutKey?: string
  responsive?: 'true' | 'false'
}

export const Adsense: React.FC<Props> = props => {
  const {
    client,
    slot,
    className,
    format = 'auto',
    layout,
    layoutKey,
    responsive = 'false',
    ...rest
  } = props

  useEffect(() => {
    // @ts-ignore
    if (window) (window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [])

  return (
    <ins
      className={`${className} adsbygoogle`}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
      data-full-width-responsive={responsive}
      {...rest}
    />
  )
}
