import AnimatedTextWords from '../AnimatedTextWords/AnimatedTextWords';
import EventCard from './event-card/EventCard';
import cloud from '../../images/clouds/5.svg';
import cloud2 from '../../images/clouds/3.svg';
import cloud3 from '../../images/clouds/1.svg';
import cloud4 from '../../images/clouds/2.svg';
import styled from 'styled-components';
import { IFutureEvent } from '../../types/data';
import Image from 'next/image';
import { CloudContainer } from '../CloudsContainer';
import dynamic from 'next/dynamic';
import { FlexCCC } from '../StyledMain';
import { m } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useSWR from 'swr';

const BeaverSleeps = dynamic(() => import('./BeaverSleeps'));

const Wrapper = styled(FlexCCC)((props) => ({
    width: '100%',
    gap: '6rem',
    zIndex: 100,
    maxWidth: '1500px',
    '& > h1': {
        textAlign: 'center',
        backgroundColor: props.theme.colors.secondaryDark,
        padding: '0.5rem 2rem',
        borderRadius: '2rem',
        fontSize: 'clamp(2.5rem, 2.0189rem + 2.2642vw, 4rem)',
    },
}));
const YellowBG = styled.span((props) => ({
    position: 'absolute',
    top: 0,
    width: '100vw',
    height: '100%',
    background: props.theme.colors.eventsGradient,
}));

const EventsContainer = styled(FlexCCC)((props) => ({
    width: '100%',
    height: '100%',
    rowGap: '5rem',
    columnGap: '2rem',
    '& > h2': {
        color: props.theme.colors.paragraph,
    },
    '@media only screen and (max-width: 30em)': {
        rowGap: '4rem',
    },
    '@media only screen and (min-width: 20em)': {
        flexFlow: 'row wrap',
    },
}));

const BeaverContainer = styled(FlexCCC)((props) => ({
    width: '80%',
    '@media only screen and (min-width: 50em)': {
        width: '40%',
    },
}));

interface IProps {
    futureEvents?: IFutureEvent[];
    layoutId?: string;
}

const fetcher = async () => {
    const data = {
        dbKey: process.env.NEXT_PUBLIC_NOTION_FUTURE_EVENTS_DB,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = '/api/fetch-notion';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    return result;
};
const FutureEvents = ({ layoutId }: IProps) => {
    const { data, error, isLoading } = useSWR('futureEvents', fetcher);
    const futureEvents: IFutureEvent[] = data?.futureEvents;
    const { ref, inView } = useInView({
        triggerOnce: true,
    });

    return (
        <>
            <Wrapper ref={ref}>
                {inView ? (
                    <>
                        <m.h1 layoutId={layoutId} transition={{ duration: 0.6, ease: 'easeOut' }}>
                            <AnimatedTextWords text='Предстоящие мероприятия' title={true} textAnimation='fromBottomLeft' />
                        </m.h1>
                        <EventsContainer>
                            {futureEvents && futureEvents?.length === 0 ? (
                                <h2
                                    style={{
                                        textAlign: 'center',
                                    }}>
                                    Планируем будущие мероприятия для ваших деток...
                                </h2>
                            ) : (
                                futureEvents &&
                                futureEvents.map((event, index) => (
                                    <EventCard
                                        title={event.properties.title.rich_text[0].plain_text}
                                        description={event.properties.description.rich_text[0].plain_text}
                                        age={event.properties.age.rich_text[0].plain_text}
                                        participants={event.properties.participants.number}
                                        total_spots={event.properties.total_spots.number}
                                        price={event.properties.price.rich_text[0].plain_text}
                                        start={event.properties.date.date.start}
                                        end={event.properties.date.date.end}
                                        page_id={event.page_id}
                                        key={index}
                                    />
                                ))
                            )}
                        </EventsContainer>
                        <BeaverContainer>
                            <BeaverSleeps />
                        </BeaverContainer>
                    </>
                ) : null}
            </Wrapper>
            <CloudContainer top={'2%'} left={0}>
                <Image src={cloud} alt='' />
            </CloudContainer>
            <CloudContainer top={'5%'} left={'20%'}>
                <Image src={cloud2} alt='' />
            </CloudContainer>
            <CloudContainer top={0} right={0}>
                <Image src={cloud3} alt='' />
            </CloudContainer>
            <CloudContainer top={'10%'} right={'10%'}>
                <Image src={cloud4} alt='' />
            </CloudContainer>
            <YellowBG />
        </>
    );
};

export default FutureEvents;
