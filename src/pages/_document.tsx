import { NextPage } from 'next'
import { Html, Head, Main, NextScript } from 'next/document'

const Document: NextPage = () => {
  return (
    <Html lang="th">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;600;700&family=Niramit:wght@400;700&display=swap"
          media="screen,print"
        />

        <script
          data-partytown-config
          dangerouslySetInnerHTML={{
            __html: `
              partytown = {
                lib: "/_next/static/~partytown/",
                forward: ["dataLayer.push"],
                debug: true
              };
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

  export default Document
