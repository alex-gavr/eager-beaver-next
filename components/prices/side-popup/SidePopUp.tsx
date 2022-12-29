
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import ok from '../../../images/icons/OkHand.svg';
import { useState } from 'react';
import Image from 'next/image';

const ColumnDiv = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
});
const WrapperDiv = styled(motion.div)((props) =>({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    zIndex: '10',
    backgroundColor: props.theme.colors.secondaryLight,
    borderRadius: '2rem',
    padding: '1.5rem 1rem 1rem 1rem',
    gap: '1rem',
    boxShadow: '0px 2px 20px 10px rgba(0, 0, 0, 0.2)',
}));

const StyledOk = styled(Image)((props) =>({
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: '2rem',
    backgroundColor: props.theme.colors.secondaryDark,
    padding: '0.5rem',
}));

const initial = {
    opacity: 0,
    x: 100,
    transition: {
        duration: 1.5,
        type: 'spring',
    },
};
const animate = {
    opacity: 1,
    x: 0,
    transition: {
        duration: 1.5,
        delay: 1,
        type: 'spring',
    },
};
const exit = {
    opacity: 0,
    x: 100,
    transition: {
        duration: 1.5,
        type:'spring',
    }
}

const SidePopUp = () => {
    const [tutorialSeen, setTutorialSeen] = useState(false);
    return (
        <AnimatePresence mode='wait'>
            {!tutorialSeen && (
                <WrapperDiv initial={initial} animate={animate} exit={exit}>
                    <ColumnDiv>
                        <h2>Обучение</h2>
                        <video width='285' height='180' muted autoPlay playsInline loop>
                            <source src={'/tutorial.mp4'} type='video/mp4' />
                        </video>
                    </ColumnDiv>
                    <ColumnDiv onClick={() => setTutorialSeen(true)}>
                        <StyledOk src={ok} alt='' />
                    </ColumnDiv>
                </WrapperDiv>
            )}
        </AnimatePresence>
    );
};

export default SidePopUp;
