import Document, { Html, Head, Main, NextScript } from 'next/document'

class NextDocument extends Document {
  render() {
    return (
      <Html lang="th">
        <Head />
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
          {this.props.__NEXT_DATA__.page === '/[slug]' && (
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            />
          )}
        </body>
      </Html>
    )
  }
}

export default NextDocument
