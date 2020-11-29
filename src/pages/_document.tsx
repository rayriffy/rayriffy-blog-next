import Document, { Html, Head, Main, NextScript } from 'next/document'

class NextDocument extends Document {
  render() {
    return (
      <Html lang="th">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default NextDocument
