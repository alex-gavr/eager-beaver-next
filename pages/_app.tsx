import type { AppProps } from 'next/app';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import GlobalStyle from '../components/GlobalStyles';
import localFont from '@next/font/local';
import styled from 'styled-components';
import Header from '../components/menus/header/header';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Provider } from 'react-redux';
import { store } from '../services/store';
import { AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../utils/useDarkMode';
import DayNightToggle from 'react-day-and-night-toggle';
import dynamic from 'next/dynamic';
import { Analytics } from '@vercel/analytics/react';
import { LazyMotion } from 'framer-motion';
import Script from 'next/script';

const Footer = dynamic(() => import('../components/menus/footer/footer'));
const FixedSocialMedia = dynamic(() => import('../components/social-media-block/FixedSocialMedia'));

const KoskoBold = localFont({
    src: '../fonts/KoskoBold.ttf',
    variable: '--ff-heading',
    display: 'swap',
});
const KoskoRegular = localFont({
    src: '../fonts/KoskoRegular.ttf',
    variable: '--ff-body',
    display: 'swap',
});

const light: DefaultTheme = {
    colors: {
        background: 'rgba(255, 255, 255, 1)',
        title: 'rgba(0, 0, 0, 1)',
        paragraph: 'rgba(0, 0, 0, 0.7)',
        primaryLight: 'rgb(248, 236, 155)',
        primaryMedium: 'rgb(255, 225, 31)',
        primaryDark: 'rgb(255, 194, 10)',
        secondaryLight: 'rgb(205, 240, 183)',
        secondaryDark: 'rgb(101, 164, 111)',
        error: 'rgb(204, 0, 0)',
        white: 'rgb(255, 255, 255)',
        black: 'rgb(0, 0, 0)',
        componentBackground: 'rgba(255,255,255)',
        eventsGradient: 'linear-gradient(180deg, #FFC009 0%, #EED07A 100%)',
        mobileMenu: 'radial-gradient(circle, rgba(248,236,155,1) 0%, rgba(255,225,121,1) 100%)',
        modalGradient: 'linear-gradient(60deg, #abecd6 0%, #fbed96 100%)',
    },
    fontSize: {
        body: 'clamp(1rem, 0.9295rem + 0.3419vw, 1.25rem)',
        header: '1rem',
        footer: 'clamp(0.6rem, 0.5436rem + 0.2735vw, 0.8rem)',
        button: 'clamp(1rem, 0.9295rem + 0.3419vw, 1.25rem)',
        subSubHeading: 'clamp(1rem, 0.7532rem + 1.1966vw, 1.875rem)',
        subHeading: 'clamp(1.5rem, 1.2179rem + 1.3675vw, 2.5rem)',
        heading: 'clamp(2.75rem, 2.6442rem + 0.5128vw, 3.125rem)',
    },
};

const dark: DefaultTheme = {
    colors: {
        background: 'rgba(0, 0, 0, 1)',
        title: 'rgba(255, 255, 255, 1)',
        paragraph: 'rgba(255, 255, 255, 0.7)',
        primaryLight: 'rgba(155, 155, 155, 0.1)',
        primaryMedium: 'rgb(255, 225, 31)',
        primaryDark: 'rgb(255, 194, 10)',
        secondaryLight: 'rgb(205, 240, 183)',
        secondaryDark: 'rgb(101, 164, 111)',
        error: 'rgb(204, 0, 0)',
        white: 'rgb(255, 255, 255)',
        black: 'rgb(0, 0, 0)',
        componentBackground: 'rgba(45,45,45)',
        eventsGradient: 'linear-gradient(to top, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to bottom, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%)',
        mobileMenu: 'linear-gradient(to top, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to bottom, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%)',
        modalGradient: 'linear-gradient(to top, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to bottom, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%)',
    },
    fontSize: {
        body: 'clamp(1rem, 0.9295rem + 0.3419vw, 1.25rem)',
        header: '1rem',
        footer: 'clamp(0.6rem, 0.5436rem + 0.2735vw, 0.8rem)',
        button: 'clamp(1rem, 0.9295rem + 0.3419vw, 1.25rem)',
        subSubHeading: 'clamp(1rem, 0.7532rem + 1.1966vw, 1.875rem)',
        subHeading: 'clamp(1.5rem, 1.2179rem + 1.3675vw, 2.5rem)',
        heading: 'clamp(2.75rem, 2.6442rem + 0.5128vw, 3.125rem)',
    },
};

const Wrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
});
const AnimationHelperDiv = styled.div({
    position: 'relative',
    width: '100%',
});

const StyledToggle = styled(DayNightToggle)({
    position: 'fixed',
    bottom: 10,
    left: 10,
    zIndex: 10,
});

const EagerBeaverApp = ({ Component, pageProps, router }: AppProps) => {
    const { theme, toggleTheme, componentMounted } = useDarkMode();

    const isDarkMode = theme === 'dark' ? true : false;

    const themeMode = theme === 'light' ? light : dark;

    if (!componentMounted) {
        return <div style={{ visibility: 'hidden', height: '100vh', width: '100vw' }} />;
    }

    return (
        <>
            <ThemeProvider theme={themeMode}>
                <LazyMotion features={async () => (await import('../components/domAnimation')).default}>
                    <Provider store={store}>
                        <SkeletonTheme baseColor='#cdf0b7' highlightColor='#f8ec9b'>
                            <Script
                                strategy='lazyOnload'
                                id='y-metrika'
                                dangerouslySetInnerHTML={{
                                    __html: `(function (m, e, t, r, i, k, a) {
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
                            <Wrapper className={`${KoskoBold.variable} ${KoskoRegular.variable}`}>
                                <GlobalStyle />
                                <Header />
                                <FixedSocialMedia />
                                {/* This div is makes animation show in footer, but not in header */}
                                <AnimationHelperDiv>
                                    <AnimatePresence mode='wait' initial={false} onExitComplete={() => document.querySelector('body')?.scrollTo(0, 0)}>
                                        <Component {...pageProps} key={router.pathname} />
                                    </AnimatePresence>
                                    <StyledToggle onChange={toggleTheme} checked={isDarkMode} size={30} />
                                    <Footer />
                                </AnimationHelperDiv>
                                <div id='modal'></div>
                            </Wrapper>
                            <Analytics />
                        </SkeletonTheme>
                    </Provider>
                </LazyMotion>
            </ThemeProvider>
        </>
    );
};

export default EagerBeaverApp;
