import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
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
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            (function (m, e, t, r, i, k, a) {
                                m[i] =
                                    m[i] ||
                                    function () {
                                        (m[i].a = m[i].a || []).push(arguments);
                                    };
                                m[i].l = 1 * new Date();
                                for (var j = 0; j < document.scripts.length; j++) {
                                    if (document.scripts[j].src === r) {
                                        return;
                                    }
                                }
                                (k = e.createElement(t)), (a = e.getElementsByTagName(t)[0]), (k.async = 1), (k.src = r), a.parentNode.insertBefore(k, a);
                            })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
                            ym(91764388, 'init', {
                                clickmap: true,
                                trackLinks: true,
                                accurateTrackBounce: true,
                                webvisor: true,
                            });`,
                        }}
                    />
                    <noscript>
                        <div>
                            <img src='https://mc.yandex.ru/watch/91764388' style={{ position: 'absolute', left: '-9999px' }} alt='' />
                        </div>
                    </noscript>
                </body>
            </Html>
        );
    }
}
