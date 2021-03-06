import Document, { Html, Head, Main, NextScript } from 'next/document'

class NextDocument extends Document {
  render() {
    return (
      <Html lang="th">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;600;700&family=Niramit:wght@400;700&display=swap"
            media="screen,print"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-J24WPTD619"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-J24WPTD619');
              `,
            }}
          />
        </body>
      </Html>
    )
  }
}

export default NextDocument
