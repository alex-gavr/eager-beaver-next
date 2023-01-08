import { TwoColumns } from './two-columns';
import { FC } from 'react';
import { eventsData } from './thematic-events-data';
import { AnimatePresence, m } from 'framer-motion';
import { list, toUp } from '../../../utils/motion-animations';
import AnimatedTextWords from '../../AnimatedTextWords/AnimatedTextWords';
import styled from 'styled-components';
import { IDeviceType } from '../../../types/data';
import { FlexCCC } from '../../StyledMain';
import { useInView } from 'react-intersection-observer';

const Wrapper = styled(FlexCCC)({
    gap: '3rem',
    minHeight: '80vh',
    position: 'relative',
    padding: '0 1rem',
    maxWidth: '1500px',
    marginBottom: '2rem',
    '@media only screen and (min-width: 50em)': {
        padding: '2rem',
    },
});
const WelcomeTextContainer = styled(FlexCCC)((props) => ({
    maxWidth: '95%',
    gap: '1rem',
    '& > p': {
        textAlign: 'center',
        padding: '0 1rem',
    },
}));

const Events: FC<IDeviceType> = ({ isMobileOnly, isTablet, isDesktop }): JSX.Element => {
    const { ref, inView } = useInView({
        triggerOnce: true,
    });
    
    return (
        <AnimatePresence>
            <Wrapper ref={ref}>
                {inView ? (
                    <>
                        <WelcomeTextContainer variants={list} whileInView='visible' initial='hidden'>
                            <h1>
                                <AnimatedTextWords title={true} text='Тематические мероприятия' textAnimation='fromTopRight' />
                            </h1>
                            <m.p variants={toUp} whileInView='visible' initial='hidden' viewport={{ once: true, margin: '-20% 0px -20% 0px' }}>
                                Одной из основных целей языковой школы Eager Beaver является обучение языкам таким образом, чтобы ребенок был увлечен образовательным
                                процессом. Поэтому помимо основного обучения мы регулярно проводим тематические праздники и мастер-классы, что является для нас
                                неотъемлемой частью образования.
                            </m.p>
                        </WelcomeTextContainer>
                        {eventsData.map((event) => (
                            <TwoColumns
                                key={event.id}
                                images={event.images}
                                alt={event.subHeading}
                                imageSide={event.imageSide}
                                subHeading={event.subHeading}
                                paragraph={event.paragraph}
                                isDesktop={isDesktop}
                                isTablet={isTablet}
                                isMobileOnly={isMobileOnly}
                            />
                        ))}
                    </>
                ) : null}
            </Wrapper>
        </AnimatePresence>
    );
};
export default Events;
