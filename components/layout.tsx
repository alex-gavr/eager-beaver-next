import styled from 'styled-components';
import Header from './menus/header/header';
import localFont from '@next/font/local';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../services/hook';
import { onCloseModal } from '../services/modalSlice';
import { Analytics } from '@vercel/analytics/react';
import type { NextRouter } from 'next/router';

const Footer = dynamic(() => import('./menus/footer/footer'));
const FixedSocialMedia = dynamic(() => import('./social-media-block/FixedSocialMedia'));
const DayNightToggle = dynamic(() => import('./toggle'));
const Modal = dynamic(() => import('./modal/modal'));
const FormPopUp = dynamic(() => import('./submit-form/form-popup/FormPopUp'));
const FormPopUpSubmitSuccess = dynamic(() => import('./submit-form/form-popup/FormPopUpSubmitSuccess'));
const FormPopUpSubmitFail = dynamic(() => import('./submit-form/form-popup/FormSubmitFailPopUp'));
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
const AnimationHelperDiv = styled.div({
    position: 'relative',
    width: '100%',
});

interface IProps {
    children: React.ReactNode;
    toggleTheme: () => void;
    isDarkMode: boolean;
    router: NextRouter;
}

const Layout = ({ children, toggleTheme, isDarkMode, router }: IProps) => {
    const dispatch = useAppDispatch();
    const { isModalOpen, submitSuccess, formFromModal, formFutureEvents } = useAppSelector((state) => state.modal);
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
            <AnimationHelperDiv>
                <AnimatePresence mode='wait' initial={false} onExitComplete={() => document.querySelector('body')?.scrollTo(0, 0)}>
                    {children}
                </AnimatePresence>
                <Footer />
            </AnimationHelperDiv>
            {/* Theme Toggler */}
            <DayNightToggle onChange={toggleTheme} checked={isDarkMode} size={30} />
            {/* Modals */}
            <div id='modal'></div>
            {isModalOpen && (
                <Modal onClose={handleCloseModal} showX={false}>
                    {submitSuccess && <FormPopUpSubmitSuccess />}
                    {submitSuccess === false && <FormPopUpSubmitFail />}
                </Modal>
            )}
            {isModalOpen && (
                <Modal onClose={handleCloseModal} showX={true}>
                    {formFromModal ? <FormPopUp futureEvents={false} /> : formFutureEvents ? <FormPopUp futureEvents={true} /> : null}
                </Modal>
            )}
        </Wrapper>
    );
};

export default Layout;
