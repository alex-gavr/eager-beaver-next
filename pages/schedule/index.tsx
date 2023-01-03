import Head from 'next/head';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { StyledMain, StyledSection } from '../../components/StyledMain';
import { IFutureEvent } from '../../types/data';
import { fetchNotion } from '../../utils/fetchNotion';

const FutureEvents = dynamic(() => import('../../components/future-events/FutureEvents'));
const PageAnimation = dynamic(() => import('../../components/page-animation/PageAnimation'));

interface IProps {
    futureEvents: IFutureEvent[];
}
const Schedule: FC<IProps> = ({ futureEvents }) => {

    return (
        <>
            <Head>
                <title>Мероприятия</title>
                <meta name='description' content='Предстоящие мероприятия в Eager Beaver!' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <StyledMain>
                <StyledSection style={{width: '100vw'}}>
                    <FutureEvents futureEvents={futureEvents} />
                </StyledSection>
                <PageAnimation />
            </StyledMain>
        </>
    );
};

export async function getStaticProps() {
    try {
        const futureEvents = await fetchNotion(process.env.NEXT_PUBLIC_NOTION_FUTURE_EVENTS_DB);
        return {
            props: {
                futureEvents,
            },
            revalidate: 15,
        };
    } catch (err) {
        console.log(err);
    }
}

export default Schedule;
