import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Hero from '../components/home/Hero';
import { getSelectorsByUserAgent } from 'react-device-detect';
// import TeachProcess from '../components/home/teach-process/teach-process';
// import Events from '../components/home/thematic-events/events';
// import FreeClass from '../components/home/free-class/free-class';
import { IDeviceType } from '../types/data';
import { StyledMain } from '../components/StyledMain';
import dynamic from 'next/dynamic';
import { useAppDispatch, useAppSelector } from '../services/hook';
import { onCloseModal } from '../services/modalSlice';
// import Modal from '../components/modal/modal';
import { resetSubmitSuccess } from '../services/telegramSlice';
// import FormPopUpSubmitSuccess from '../components/submit-form/form-popup/FormPopUpSubmitSuccess';
// import FormPopUp from '../components/submit-form/form-popup/FormPopUp';
// import FormPopUpSubmitFail from '../components/submit-form/form-popup/FormSubmitFailPopUp';
import PageAnimation from '../components/page-animation/PageAnimation';

const TeachProcess = dynamic(() => import('../components/home/teach-process/teach-process'));
const Events = dynamic(() => import('../components/home/thematic-events/events'));
const FreeClass = dynamic(() => import('../components/home/free-class/free-class'));
const Modal = dynamic(() => import('../components/modal/modal'));
const FormPopUpSubmitSuccess = dynamic(() => import('../components/submit-form/form-popup/FormPopUpSubmitSuccess'));
const FormPopUp = dynamic(() => import('../components/submit-form/form-popup/FormPopUp'));
const FormPopUpSubmitFail = dynamic(() => import('../components/submit-form/form-popup/FormSubmitFailPopUp'));

// const PageAnimation = dynamic(() => import('../components/page-animation/PageAnimation'), {
//     ssr: false,
// });

export default function Home({ isMobileOnly, isTablet, isDesktop }: IDeviceType) {
    const dispatch = useAppDispatch();
    const { isModalOpen, submitSuccess, formFromModal } = useAppSelector((state) => state.modal);

    // Close Modal
    const handleCloseModal = () => {
        dispatch(onCloseModal());
    };
    return (
        <>
            <Head>
                <title>Eager Beaver Language School</title>
                <meta
                    name='description'
                    content='Одной из основных целей языковой школы Eager Beaver является обучение языкам таким образом, чтобы ребенок был увлечен образовательным процессом. Поэтому помимо основного обучения мы регулярно проводим тематические праздники и мастер-классы. Проведение таких мероприятий для нас является неотъемлемой частью образования.'
                />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <StyledMain>
                <Hero isMobileOnly={isMobileOnly} />
                <TeachProcess />
                <Events isMobileOnly={isMobileOnly} isTablet={isTablet} isDesktop={isDesktop} />
                <FreeClass isMobileOnly={isMobileOnly} isTablet={isTablet} isDesktop={isDesktop} />
                <PageAnimation />
                {isModalOpen && submitSuccess && (
                    <Modal onClose={handleCloseModal} showX={false}>
                        <FormPopUpSubmitSuccess />
                    </Modal>
                )}
                {submitSuccess === false && isModalOpen && (
                    <Modal onClose={handleCloseModal} showX={false}>
                        <FormPopUpSubmitFail />
                    </Modal>
                )}
                {isModalOpen && formFromModal && (
                    <Modal onClose={handleCloseModal} showX={true}>
                        <FormPopUp futureEvents={false} />
                    </Modal>
                )}
            </StyledMain>
        </>
    );
}
export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
    const userAgent = req.headers['user-agent'] || '';
    const { isMobileOnly, isTablet, isDesktop } = getSelectorsByUserAgent(userAgent);

    return {
        props: { isMobileOnly, isTablet, isDesktop },
    };
}
