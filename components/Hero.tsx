import { FC } from 'react';
import hero from '../images/hero/heroCropped.webp';
import heroMobile from '../images/hero/mobileHero.webp';
// import ActionButtons from '../buttons/action-buttons-page-end/ActionButtons';
import { AnimatePresence, motion } from 'framer-motion';
import { list, toRight, toDown, toLeft, popUp } from '../utils/motion-animations';
import styled from 'styled-components';
import { useWindowSize } from '../utils/use-window-size';
import Image from 'next/image';
import Link from 'next/link';
import ActionButtons from './buttons/action-buttons-page-end/ActionButtons';


const MainContent = styled(motion.div)({
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '2rem',
});

const Columns = styled(motion.div)((props) =>({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '1rem',
    width: '95%',
    ' & > h1': {
        lineHeight: 1.2,
        color: props.theme.colors.textYellowDark,
        textShadow: '2px 2px 5px black',
    },
    ' & > p': {
        fontSize: 'var(--fs-body)',
        color: 'white',
        letterSpacing: '0.08rem',
        textShadow: '2px 2px 5px black',
    },
}));
const ButtonContainer = styled(motion.div)({
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    marginTop: '2rem',
});

const Wrapper = styled(motion.section)({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    position: 'relative',
    width: '100vw',
    minHeight: '100vh',
    '@media only screen and (max-width: 500px)': {
        gridTemplateColumns: '1fr',
        height: '100vh',
        [MainContent as any]: {
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginLeft: '1rem',
        },
        [Columns as any]: {
            width: '80%',
            marginTop: '1rem',
        },
        [ButtonContainer as any]: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            marginTop: 0,
            marginLeft: '1rem',
            marginRight: '1rem',
            marginBottom: '1rem',
        },
    },
});
const BackgroundImage = styled(Image)({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
});

interface IProps  {
    device: any;
}
const Hero: FC<IProps> = ({device}): JSX.Element => {
    const { width } = useWindowSize();
    const name = 'Alexander';

    return (
        <AnimatePresence>
            <Wrapper>
                {device === 'desktop' && <BackgroundImage src={hero} alt='' priority />}
                {device === 'mobile' && <BackgroundImage src={heroMobile} alt='' priority />}
                <MainContent variants={list} animate='visible' initial='hidden'>
                    <Columns>
                        <motion.p variants={toDown} style={{ textTransform: 'lowercase', color: 'white' }}>
                            {name && `Привет, ${name}`}
                        </motion.p>
                        <motion.h1 variants={toRight}>Eager Beaver Language School</motion.h1>
                        
                        <motion.p variants={toLeft}>
                            детская языковая школа инклюзивного вида обучения <br /> сделай свой первый шаг к изучению английского языка
                        </motion.p>
                        <ButtonContainer variants={popUp}>
                            <ActionButtons primaryButtonStyle='emptySecondary' secondaryButtonStyle='primary' showBackButton={false} padding={'1rem'} />
                        </ButtonContainer>
                    </Columns>
                </MainContent>
            </Wrapper>
            
        </AnimatePresence>
    );
};

export default Hero;


