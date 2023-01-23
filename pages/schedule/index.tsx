import Head from 'next/head';
import dynamic from 'next/dynamic';
import { StyledMain, StyledSection } from '../../components/StyledMain';
import Loader from '../../components/Loader';
import { useAppSelector } from '../../services/hook';

const FutureEvents = dynamic(() => import('../../components/future-events/FutureEvents'));
const PageAnimation = dynamic(() => import('../../components/page-animation/PageAnimation'));


const Schedule = () => {
    const { showLoader } = useAppSelector((state) => state.homeLoader);
    return (
        <>
            <Head>
                <title>Мероприятия</title>
                <meta name='description' content='Предстоящие мероприятия в Eager Beaver!' />
            </Head>
            {showLoader && <Loader title='Предстоящие мероприятия' layoutId='futureEvents' />}
            <StyledMain>
                <StyledSection style={{width: '100vw'}}>
                    <FutureEvents layoutId='futureEvents' />
                </StyledSection>
                <PageAnimation />
            </StyledMain>
        </>
    );
};


export default Schedule;
