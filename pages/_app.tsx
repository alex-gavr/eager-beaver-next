import type { AppProps } from 'next/app';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import GlobalStyle from '../components/GlobalStyles';
import localFont from '@next/font/local';
import styled from 'styled-components';
import Header from '../components/menus/header/header';
import Footer from '../components/menus/footer/footer';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Provider } from 'react-redux';
import { store } from '../services/store';

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
        primaryLight: 'rgb(248, 236, 155)',
        primaryMedium: 'rgb(255, 225, 31)',
        primaryDark: 'rgb(255, 194, 10)',
        secondaryLight: 'rgb(205, 240, 183)',
        secondaryDark: 'rgb(101, 164, 111)',
        error: 'rgb(204, 0, 0)',
        white: 'rgb(255, 255, 255)',
        black: 'rgb(0, 0, 0)',
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

const Main = styled.main({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
});
const Wrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <ThemeProvider theme={light}>
                <Provider store={store}>
                    <SkeletonTheme baseColor='#cdf0b7' highlightColor='#f8ec9b'>
                        <Wrapper className={`${KoskoBold.variable} ${KoskoRegular.variable}`}>
                            <GlobalStyle />
                            <Header />
                            <Main>
                                <Component {...pageProps} />
                            </Main>
                            <Footer />
                        </Wrapper>
                    </SkeletonTheme>
                </Provider>
            </ThemeProvider>
        </>
    );
}
