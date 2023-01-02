import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import Image from 'next/image';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }
    render() {
        return (
            <Html lang='en'>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                    <noscript id='y-metrika'>
                        <div>
                            <Image unoptimized src='https://mc.yandex.ru/watch/91764388' style={{ position: 'absolute', left: '-9999px' }} alt='' />
                        </div>
                    </noscript>
                </body>
            </Html>
        );
    }
}
