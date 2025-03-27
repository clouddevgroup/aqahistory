import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Add your CSS link tags here if needed */}
          <link rel="stylesheet" href="/css/styles.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Add your script tags here */}
          <script src="/js/main.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;