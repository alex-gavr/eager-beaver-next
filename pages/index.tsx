import { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import Hero from '../components/home/Hero';
import { getSelectorsByUserAgent } from 'react-device-detect';
import { IDeviceType, IFutureEvent } from '../types/data';
import { StyledMain } from '../components/StyledMain';
import dynamic from 'next/dynamic';
import { useAppDispatch, useAppSelector } from '../services/hook';
import { onCloseModal } from '../services/modalSlice';
import { fetchNotion } from '../utils/fetchNotion';
import { StyledSection } from '../components/StyledSectionForFutureEvents';

const TeachProcess = dynamic(() => import('../components/home/teach-process/teach-process'));
const FutureEvents = dynamic(() => import('../components/future-events/FutureEvents'));
const Events = dynamic(() => import('../components/home/thematic-events/events'));
const FreeClass = dynamic(() => import('../components/home/free-class/free-class'));
const Modal = dynamic(() => import('../components/modal/modal'), {
    loading: () => (
        <div style={{ width: 300, height: 300, backgroundColor: 'grey' }}>
            <h1>Loading...</h1>
        </div>
    ),
});
const FormPopUpSubmitSuccess = dynamic(() => import('../components/submit-form/form-popup/FormPopUpSubmitSuccess'));
const FormPopUp = dynamic(() => import('../components/submit-form/form-popup/FormPopUp'));
const FormPopUpSubmitFail = dynamic(() => import('../components/submit-form/form-popup/FormSubmitFailPopUp'));
const PageAnimation = dynamic(() => import('../components/page-animation/PageAnimation'));
const FlyingBeaver = dynamic(() => import('../components/flying-beaver/FlyingBeaver'));

interface IProps extends IDeviceType {
    futureEvents: IFutureEvent[];
}
const Home: NextPage<IProps> = ({ isMobileOnly, isTablet, isDesktop, futureEvents }) => {
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
                <FlyingBeaver isMobileOnly={isMobileOnly} isTablet={isTablet} />
                <Hero isMobileOnly={isMobileOnly} />
                <TeachProcess />
                <Events isMobileOnly={isMobileOnly} isTablet={isTablet} isDesktop={isDesktop} />
                <StyledSection>
                    <FutureEvents futureEvents={futureEvents} />
                </StyledSection>
                <FreeClass isMobileOnly={isMobileOnly} isTablet={isTablet} isDesktop={isDesktop} />
                <PageAnimation />
                {isModalOpen && (
                    <Modal onClose={handleCloseModal} showX={false}>
                        {submitSuccess && <FormPopUpSubmitSuccess />}
                        {submitSuccess === false && <FormPopUpSubmitFail />}
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
};
export default Home;

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
    const userAgent = req.headers['user-agent'] || '';
    const { isMobileOnly, isTablet, isDesktop } = getSelectorsByUserAgent(userAgent);
    try {
        const futureEvents = await fetchNotion(process.env.NEXT_PUBLIC_NOTION_FUTURE_EVENTS_DB);
        return {
            props: {
                futureEvents,
                isMobileOnly,
                isTablet,
                isDesktop,
            },
        };
    } catch (err) {
        console.log(err);
    }
}
