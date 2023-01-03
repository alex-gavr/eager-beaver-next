import { DefaultTheme, ThemeProvider } from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { LazyMotion } from 'framer-motion';
import { Provider } from 'react-redux';
import { store } from '../services/store';

interface IProps {
    children: React.ReactNode;
    themeMode: DefaultTheme | ((theme: DefaultTheme) => DefaultTheme);
}

const Providers = ({ children, themeMode }: IProps) => {
    
    return (
        <ThemeProvider theme={themeMode}>
            <LazyMotion features={async () => (await import('./domAnimation')).default}>
                <Provider store={store}>
                    <SkeletonTheme baseColor='#cdf0b7' highlightColor='#f8ec9b'>
                        {children}
                    </SkeletonTheme>
                </Provider>
            </LazyMotion>
        </ThemeProvider>
    );
};

export default Providers;
