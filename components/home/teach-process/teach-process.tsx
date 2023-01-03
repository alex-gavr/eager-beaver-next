import cloud from '../../../images/clouds/5.svg';
import cloud2 from '../../../images/clouds/2.svg';
import { FC } from 'react';
import TeachingSteps from './teaching-steps/TeachingSteps';
import { AnimatePresence, m } from 'framer-motion';
import { list, opacity, toLeft, toRight } from '../../../utils/motion-animations';
import AnimatedTextWords from '../../AnimatedTextWords/AnimatedTextWords';
import styled from 'styled-components';
import Image from 'next/image';
import { CloudContainer } from '../../CloudsContainer';
import dynamic from 'next/dynamic';
import { FlexCCC, StyledSection } from '../../StyledMain';

const BeaverHiOptimized = dynamic(() => import('./BeaverHi'));


const EvenColumns = styled(m.div)({
    zIndex: 100,
    display: 'grid',
    gridTemplateColumns: '1fr',
    justifyContent: 'center',
    marginBottom: '5rem',
    width: '100%',
    maxWidth: '1100px',
    gap: '1rem',
    '@media only screen and (min-width: 70em)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        width: '100vw',
        gap: '2rem',
    },
});
const Background = styled.span((props) => ({
    position: 'absolute',
    height: '100%',
    width: '200vw',
    borderRadius: '50%',
    top: 0,
    backgroundColor: props.theme.colors.primaryLight,
}));

const TeachProcess: FC = (): JSX.Element => {
    return (
        <AnimatePresence>
            <StyledSection style={{marginTop: '3rem',}} variants={list} whileInView='visible' initial='hidden' viewport={{ once: true, margin: '-10% 0px -10% 0px' }}>
                <h1>
                    <AnimatedTextWords title={true} text='Как проходит обучение' textAnimation='fromBottomLeft' />
                </h1>
                <EvenColumns variants={opacity}>
                    <TeachingSteps />
                    <FlexCCC>
                        <BeaverHiOptimized />
                    </FlexCCC>
                </EvenColumns>
                <Background />
                <CloudContainer top={'10%'} left={0} variants={toRight} whileInView='visible' initial='hidden' viewport={{ once: true, margin: '-10% 0px -10% 0px' }}>
                    <Image src={cloud} alt='' />
                </CloudContainer>
                <CloudContainer
                    bottom={'1%'}
                    left={'30%'}
                    variants={toLeft}
                    whileInView='visible'
                    initial='hidden'
                    viewport={{ once: true, margin: '-10% 0px -10% 0px' }}>
                    <Image src={cloud2} alt='cloud2' />
                </CloudContainer>
            </StyledSection>
        </AnimatePresence>
    );
};

export default TeachProcess;
