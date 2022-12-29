import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledCard = styled(motion.div)((props) => ({
    width: 320,
    maxWidth: 600,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    backgroundColor: props.theme.colors.componentBackground,
    padding: '0.5rem 1rem 1rem 1.5rem',
    borderRadius: '3rem',
    boxShadow: `1px 1px 10px 1px ${props.theme.colors.black}`,
    position: 'relative',
    '@media only screen and (min-width: 30em) and (max-width: 50em)': {
        width: 350,
    },
    '@media only screen and (min-width: 50em)': {
        width: 400,
        padding: '0.5rem 1rem 1rem 1rem',
    },
    '@media only screen and (max-width: 320px)': {
        width: '95%',
    },
}));
export const FlexColumnCenter = styled(motion.div)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

export const StyledDateNumber = styled(motion.span)((props) => ({
    backgroundColor: props.theme.colors.secondaryDark,
    color: props.theme.colors.title,
    width: 'clamp(6.25rem, 5.6486rem + 2.8302vw, 8.125rem)',
    height: 'clamp(6.25rem, 5.6486rem + 2.8302vw, 8.125rem)',
    borderRadius: '50%',
    fontSize: 'clamp(2.5rem, 1.3585rem + 3.0189vw, 4rem)',
    position: 'absolute',
    top: '-3rem',
    left: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media only screen and (min-width: 30em) and (max-width: 50em)': {
        top: '-3.5rem',
        left: '3rem',
    },
    '@media only screen and (min-width: 50em)': {
        top: '-4rem',
        left: '3rem',
    },
    '@media only screen and (max-width: 320px)': {
        top: '-3rem',
        left: '0rem',
    },
}));
export const MonthAndTimeContainer = styled(motion.div)((props) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    letterSpacing: '0.1rem',
    color: props.theme.colors.secondaryDark,
    marginLeft: 'clamp(4rem, 3.6792rem + 1.5094vw, 5rem)',
    fontSize: 'clamp(1.5rem, 1.3396rem + 0.7547vw, 2rem)',
}));

export const TitleAndAgeContainer = styled(motion.div)((props) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    '& > h2': {
        fontSize: 'clamp(1.8rem, 1.4792rem + 1.5094vw, 2.8rem)',
        textAlign: 'center',
        letterSpacing: '0.1rem',
        color: props.theme.colors.title,
        textShadow: '-1px 1px 1px rgba(0, 0, 0, 0.5)',
    },
    '& > p': {
        textAlign: 'center',
        fontSize: 'clamp(1rem, 0.8396rem + 0.7547vw, 1.5rem)',
        color: props.theme.colors.secondaryDark,
    },
}));
export const SpaceBetween = styled(motion.div)((props) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '2rem',
    width: '100%',
    '@media only screen and (min-width: 50em)': {
        gap: '3rem',
    },
}));
export const InnerContainer = styled(motion.div)((props) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '2rem',
    letterSpacing: '0.05rem',
    textTransform: 'lowercase',
    color: props.theme.colors.paragraph,
}));
export const InnerContainerDetails = styled(motion.div)((props) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
}));
export const TogglerContainer = styled(motion.div)((props) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingBlock: '1rem',
}));