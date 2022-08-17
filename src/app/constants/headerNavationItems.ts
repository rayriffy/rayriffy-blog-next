interface HeaderNavationItem {
  key: string
  href: string
  name: string
  disabled?: boolean
  external?: boolean
}

export const headerNavationItems: HeaderNavationItem[] = [
  {
    key: 'home',
    href: '/',
    name: 'Home',
  },
  {
    key: 'category',
    href: '/category',
    name: 'Category',
    disabled: true,
  },
  {
    key: 'music',
    href: 'https://music.apple.com/jp/playlist/riffys-playlist/pl.u-gxblkLDC5PkYPXL',
    name: '♪',
    external: true,
  },
]
