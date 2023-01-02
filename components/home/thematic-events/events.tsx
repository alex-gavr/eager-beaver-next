import { TwoColumns } from './two-columns';
import { FC } from 'react';
import { eventsData } from './thematic-events-data';
import { AnimatePresence, m } from 'framer-motion';
import { list, toUp } from '../../../utils/motion-animations';
import AnimatedTextWords from '../../AnimatedTextWords/AnimatedTextWords';
import styled from 'styled-components';
import { IDeviceType } from '../../../types/data';

const Wrapper = styled.section({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
const WelcomeTextContainer = styled(m.div)((props) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '95%',
    gap: '1rem',
    '& > h1': {
        color: props.theme.colors.title
    },
    '& > p': {
        color: props.theme.colors.paragraph,
        textAlign: 'center',
        letterSpacing: '0.06rem',
        padding: '0 1rem',
        textTransform: 'lowercase',
    },
}));

const Events: FC<IDeviceType> = ({ isMobileOnly, isTablet, isDesktop }): JSX.Element => {
    return (
        <AnimatePresence>
            <Wrapper>
                <WelcomeTextContainer variants={list} whileInView='visible' initial='hidden'>
                    <h1>
                        <AnimatedTextWords title={true} text='Тематические мероприятия' textAnimation='fromTopRight' />
                    </h1>
                    <m.p variants={toUp} whileInView='visible' initial='hidden' viewport={{ once: true, margin: '-20% 0px -20% 0px' }}>
                        Одной из основных целей языковой школы Eager Beaver является обучение языкам таким образом, чтобы ребенок был увлечен образовательным процессом.
                        Поэтому помимо основного обучения мы регулярно проводим тематические праздники и мастер-классы. Проведение таких мероприятий для нас является
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
            </Wrapper>
        </AnimatePresence>
    );
};
export default Events;
