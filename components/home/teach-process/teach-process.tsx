// import styles from './teach.module.css';
import cloud from '../../../images/clouds/4.svg';
import { FC } from 'react';
import { BeaverHi } from './BeaverHi';
import TeachingSteps from './teaching-steps/TeachingSteps';
import { AnimatePresence, motion } from 'framer-motion';
import { list, opacity, toLeft, toRight } from '../../../utils/motion-animations';
import AnimatedTextWords from '../../AnimatedTextWords/AnimatedTextWords';
import styled from 'styled-components';
import Image from 'next/image';
import { CloudContainer } from '../../CloudsContainer';

const StyledSection = styled(motion.section)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    padding: '1rem 0.5rem',
    position: 'relative',
    marginTop: '3rem',
    maxWidth: '1400px',
    minHeight: '100vh',
    '@media only screen and (min-width: 50em)': {
        padding: '2rem',
    },
});
const EvenColumns = styled(motion.div)({
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
            <StyledSection variants={list} whileInView='visible' initial='hidden' viewport={{ once: true, margin: '-10% 0px -10% 0px' }}>
                <AnimatedTextWords title={true} text='Как проходит обучение' textAnimation='fromBottomLeft' />
                <EvenColumns variants={opacity}>
                    <TeachingSteps />
                    <BeaverHi />
                </EvenColumns>
                <Background />
                <CloudContainer
                    top={'10%'}
                    left={0}
                    variants={toRight}
                    whileInView='visible'
                    initial='hidden'
                    viewport={{ once: true, margin: '-10% 0px -10% 0px' }}>
                    <Image src={cloud} alt='' />
                </CloudContainer>
                <CloudContainer
                    bottom={'1%'}
                    left={'30%'}
                    variants={toLeft}
                    whileInView='visible'
                    initial='hidden'
                    viewport={{ once: true, margin: '-10% 0px -10% 0px' }}>
                    <Image
                        src={cloud}
                        alt='cloud2'
                    />
                </CloudContainer>
            </StyledSection>
        </AnimatePresence>
    );
};

export default TeachProcess;
