import React from 'react';
import beaver from '../../../images/logo.svg';
import SubmitForm from '../../submit-form/submit-form';
import { AnimatePresence, motion } from 'framer-motion';
import { list, toUp, opacity } from '../../../utils/motion-animations';
import styled from 'styled-components';
import Image from 'next/image';
import { IDeviceType } from '../../../types/data';

const Wrapper = styled(motion.div)((props) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.5rem',
    gap: '2rem',
    position: 'relative',
    marginTop: '2rem',
    '@media only screen and (min-width: 50em)': {
        padding: '2rem',
    },
    '& > h1': {
        color: props.theme.colors.title,
        textAlign: 'center',
    },
}));

const Accent = styled(motion.span)((props) => ({
    backgroundColor: props.theme.colors.primaryDark,
    color: props.theme.colors.title,
    padding: '0.2rem 1rem',
    borderRadius: '3rem',
}));
const EvenColumns = styled(motion.div)((props) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '3rem',
    '@media only screen and (min-width: 50em)': {
        flexDirection: 'row',
        width: '90%',
    },
}));
const BeaverContainer = styled(motion.div)((props) => ({
    width: '50%',
    '@media only screen and (min-width: 50em)': {
        width: '40%',
    },
    '& > img': {
        width: '100%',
        height: '100%'
    },
}));

const FreeClass = ({isMobileOnly, isTablet, isDesktop}: IDeviceType) => {
    return (
        <AnimatePresence>
            <Wrapper variants={list} initial='hidden' whileInView='visible'>
                <motion.h1 variants={toUp} initial='hidden' whileInView='visible' viewport={{ once: true, margin: '-20% 0px -20% 0px' }}>
                    Получите пробное занятие <Accent> бесплатно </Accent>
                </motion.h1>
                <EvenColumns variants={opacity} initial='hidden' whileInView='visible' viewport={{ once: true, margin: '-20% 0px -20% 0px' }}>
                    <BeaverContainer>
                        <Image src={beaver} alt='hello' />
                    </BeaverContainer>
                    <SubmitForm isMobileOnly={isMobileOnly} isTablet={isTablet} isDesktop={isDesktop} />
                </EvenColumns>
            </Wrapper>
        </AnimatePresence>
    );
};

export default FreeClass;