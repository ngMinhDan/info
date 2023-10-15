// pages/_document.tsx

import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Google Tag Manager code */}
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-NQ7YFJYHTY"
          ></Script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NQ7YFJYHTY');
            `}
          </script>
          {/* End of Google Tag Manager code */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
