import { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import Hero from '../components/home/Hero';
import { getSelectorsByUserAgent } from 'react-device-detect';
import { IDeviceType, IFutureEvent } from '../types/data';
import { StyledMain, StyledSection } from '../components/StyledMain';
import dynamic from 'next/dynamic';
import { fetchNotion } from '../utils/fetchNotion';
import Loader from '../components/Loader';
import { useAppSelector } from '../services/hook';

const TeachProcess = dynamic(() => import('../components/home/teach-process/teach-process'), {
    ssr: false,
});
const FutureEvents = dynamic(() => import('../components/future-events/FutureEvents'), {
    ssr: false,
});
const Events = dynamic(() => import('../components/home/thematic-events/events'));
const FreeClass = dynamic(() => import('../components/home/free-class/free-class'), {
    ssr: false,
});
const PageAnimation = dynamic(() => import('../components/page-animation/PageAnimation'));
const FlyingBeaver = dynamic(() => import('../components/flying-beaver/FlyingBeaver'));

interface IProps extends IDeviceType {
    futureEvents: IFutureEvent[];
}
const Home: NextPage<IProps> = ({ isMobileOnly, isTablet, isDesktop, futureEvents }) => {
    const { showLoader } = useAppSelector((state) => state.homeLoader);

    return (
        <>
            <Head>
                <title>Eager Beaver Language School</title>
                <meta name='description' content='Одной из основных целей языковой школы Eager Beaver является обучение языкам таким образом, чтобы ребенок был увлечен образовательным процессом. Поэтому помимо основного обучения мы регулярно проводим тематические праздники и мастер-классы. Проведение таких мероприятий для нас является неотъемлемой частью образования.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            {showLoader && <Loader isMobileOnly={isMobileOnly} title='Eager Beaver Language School' />}
            <StyledMain>
                <FlyingBeaver isMobileOnly={isMobileOnly} isTablet={isTablet} />
                <Hero isMobileOnly={isMobileOnly} />
                <TeachProcess />
                <Events isMobileOnly={isMobileOnly} isTablet={isTablet} isDesktop={isDesktop} />
                <StyledSection style={{ width: '100vw' }}>
                    <FutureEvents futureEvents={futureEvents} />
                </StyledSection>
                <FreeClass isMobileOnly={isMobileOnly} isTablet={isTablet} isDesktop={isDesktop} />
                <PageAnimation />
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
