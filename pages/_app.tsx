import type { AppProps } from 'next/app';
import { DefaultTheme } from 'styled-components';
import { useDarkMode } from '../utils/useDarkMode';
import Providers from '../components/Providers';
import Layout from '../components/layout';
import GlobalStyle from '../components/GlobalStyles';


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

const EagerBeaverApp = ({ Component, pageProps, router }: AppProps) => {
    const { theme, toggleTheme, componentMounted } = useDarkMode();
    const isDarkMode = theme === 'dark' ? true : false;
    const themeMode = theme === 'light' ? light : dark;

    if (!componentMounted) {
        return <div style={{ visibility: 'hidden', height: '100vh', width: '100vw' }} />;
    }

    return (
        <Providers themeMode={themeMode}>
            <GlobalStyle />
            <Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode} router={router}>
                <Component {...pageProps} key={router.pathname} />
            </Layout>
        </Providers>
    );
};

export default EagerBeaverApp;
