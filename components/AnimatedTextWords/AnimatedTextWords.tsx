import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import {
    textFromTop,
    textFromTopRight,
    textFromRight,
    textFromBottomRight,
    textFromBottom,
    textFromBottomLeft,
    textFromLeft,
    textFromTopLeft,
} from '../../utils/motion-animations';

interface IProps {
    title: boolean;
    text: string;
    textAnimation: 'fromTop' | 'fromTopRight' | 'fromRight' | 'fromBottomRight' | 'fromBottom' | 'fromBottomLeft' | 'fromLeft' | 'fromTopLeft';
    fontSize?: string;
}

const StyledContainer = styled(motion.div)({
    overflow: 'hidden',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    zIndex: 2,
});

const StyledTitle = styled(motion.span)({
    fontSize: 'clamp(2.5rem, 2.2179rem + 1.3675vw, 3.5rem)',
    fontFamily: 'var(--ff-heading)',
    zIndex: 2,
    marginRight: 10,
    '@media only screen and (min-width: 50em)': {
        marginRight: 16,
    },
});
const StyledText = styled(motion.span)({
    fontSize: 'clamp(1.2rem, 1.1154rem + 0.4103vw, 1.5rem);',
    fontFamily: 'var(--ff-body)',
    textTransform: 'lowercase',
    marginRight: 8,
    zIndex: 2,
    '@media only screen and (min-width: 50em)': {
        marginRight: 10,
    },
});

const AnimatedTextWords = ({ title, text, textAnimation }: IProps) => {
    const words = text.split(' ');

    const textAnimationInit =
        textAnimation === 'fromTop'
            ? textFromTop
            : textAnimation === 'fromTopRight'
            ? textFromTopRight
            : textAnimation === 'fromRight'
            ? textFromRight
            : textAnimation === 'fromBottomRight'
            ? textFromBottomRight
            : textAnimation === 'fromBottom'
            ? textFromBottom
            : textAnimation === 'fromBottomLeft'
            ? textFromBottomLeft
            : textAnimation === 'fromLeft'
            ? textFromLeft
            : textFromTopLeft;

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: {
                staggerChildren: title ? 0.2 : 0.12,
                delayChildren: 0.04 * i,
            },
        }),
    };

    return (
        <AnimatePresence>
            <StyledContainer variants={container} initial='hidden' whileInView='visible' viewport={{ margin: '-10% 0px -10% 0px', once: true }}>
                {words.map((word: string, index: number) =>
                    title ? (
                        <StyledTitle variants={textAnimationInit} key={index}>
                            {word}
                        </StyledTitle>
                    ) : (
                        <StyledText variants={textAnimationInit} key={index}>
                            {word}
                        </StyledText>
                    )
                )}
            </StyledContainer>
        </AnimatePresence>
    );
};

export default AnimatedTextWords;
