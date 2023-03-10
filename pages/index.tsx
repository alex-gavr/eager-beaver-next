import { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import Hero from '../components/home/Hero';
import { getSelectorsByUserAgent } from 'react-device-detect';
import { IDeviceType } from '../types/data';
import { StyledMain, StyledSection } from '../components/StyledMain';
import dynamic from 'next/dynamic';
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

const Home: NextPage<IDeviceType> = ({ isMobileOnly, isTablet, isDesktop }) => {
    const { showLoader } = useAppSelector((state) => state.homeLoader);

    return (
        <>
            {showLoader && <Loader isMobileOnly={isMobileOnly} title='Eager Beaver Language School' layoutId='eagerBeaverLanguageSchool' />}
            <StyledMain>
                <FlyingBeaver isMobileOnly={isMobileOnly} isTablet={isTablet} />
                <Hero isMobileOnly={isMobileOnly} />
                <TeachProcess />
                <Events isMobileOnly={isMobileOnly} isTablet={isTablet} isDesktop={isDesktop} />
                <StyledSection style={{ width: '100vw' }}>
                    <FutureEvents />
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
        return {
            props: {
                isMobileOnly,
                isTablet,
                isDesktop,
            },
        };
    } catch (err) {
        console.log(err);
    }
}
