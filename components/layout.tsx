import styled from 'styled-components';
import localFont from '@next/font/local';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../services/hook';
import { onCloseModal } from '../services/modalSlice';
import { Analytics } from '@vercel/analytics/react';
import type { NextRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import Header from './menus/header/header';


const Footer = dynamic(() => import('./menus/footer/footer'), {
    ssr: false,
});
const FixedSocialMedia = dynamic(() => import('./social-media-block/FixedSocialMedia'), {
    ssr: false,
});
const DayNightToggle = dynamic(() => import('./toggle'), {
    ssr: false,
});
const Modal = dynamic(() => import('./modal/modal'), {
    ssr: false,
});
const FormPopUp = dynamic(() => import('./submit-form/form-popup/FormPopUp'), {
    ssr: false,
    loading: () => (
        <div style={{ position: 'relative', width: '100%', height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Skeleton style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        </div>
    ),
});
const FormPopUpSubmitSuccess = dynamic(() => import('./submit-form/form-popup/FormPopUpSubmitSuccess'), {
    ssr: false,
});
const FormPopUpSubmitFail = dynamic(() => import('./submit-form/form-popup/FormSubmitFailPopUp'), {
    ssr: false,
});
const ImageLoadingError = dynamic(() => import('./ImageLoadingError'), {
    ssr: false,
});

const PolicyText = dynamic(() => import('./policy/PolicyText'), {
    ssr: false,
    loading: () => (
        <div style={{ position: 'relative', width: '100%', height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Skeleton style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        </div>
    ),
});
const YMetrika = dynamic(() => import('./YMetrika'));

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

const Wrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
});

interface IProps {
    children: React.ReactNode;
    toggleTheme: () => void;
    isDarkMode: boolean;
    router: NextRouter;
}

const Layout = ({ children, toggleTheme, isDarkMode, router }: IProps) => {
    const dispatch = useAppDispatch();
    const { isModalOpen, submitSuccess, formFromModal, formFutureEvents, showPolicy } = useAppSelector((state) => state.modal);
    const { error } = useAppSelector((state) => state.error);
    const handleCloseModal = () => {
        dispatch(onCloseModal());
    };
    return (
        <Wrapper className={`${KoskoBold.variable} ${KoskoRegular.variable}`}>
            {/* Vercel Analytics */}
            <Analytics />
            {/* Yandex Metrika Analytics */}
            <YMetrika />
            <Header />
            {router.pathname === '/reviews' || router.pathname === '/contact' ? null : <FixedSocialMedia />}
            {/* This div is makes animation show in footer, but not in header */}
            <AnimatePresence mode='wait' initial={false} onExitComplete={() => document.querySelector('body')?.scrollTo(0, 0)}>
                {children}
            </AnimatePresence>
            <Footer />
            {/* Theme Toggler */}
            <DayNightToggle onChange={toggleTheme} checked={isDarkMode} size={30} />
            {/* Modals */}
            <div id='modal'></div>
            {isModalOpen && (
                <Modal onClose={handleCloseModal} closeButton={formFromModal || formFutureEvents ? true : false}>
                    {submitSuccess && <FormPopUpSubmitSuccess />}
                    {submitSuccess === false && <FormPopUpSubmitFail />}
                    {formFromModal && <FormPopUp futureEvents={false} />}
                    {formFutureEvents && <FormPopUp futureEvents={true} />}
                    {showPolicy && <PolicyText />}
                </Modal>
            )}
            {/* Image Error Loading */}
            {error ? <ImageLoadingError /> : null}
        </Wrapper>
    );
};

export default Layout;
