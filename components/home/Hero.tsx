import { FC, useEffect, useState } from 'react';
import hero from '../../images/hero/heroCropped.webp';
import heroMobile from '../../images/hero/mobileHero.webp';
import { AnimatePresence, m } from 'framer-motion';
import { list, toRight, toDown, toLeft, popUp } from '../../utils/motion-animations';
import styled from 'styled-components';
import Image from 'next/image';
import ActionButtons from '../buttons/action-buttons-page-end/ActionButtons';
import Cookies from 'js-cookie';
import { FlexCCC } from '../StyledMain';

const MainContent = styled(FlexCCC)({
    width: '100%',
    maxWidth: '1200px',
    marginLeft: '2rem',
});

const Columns = styled(FlexCCC)((props) => ({
    alignItems: 'flex-start',
    gap: '1rem',
    width: '95%',
    ' & > h1': {
        color: props.theme.colors.primaryDark,
        textShadow: '2px 2px 5px black',
    },
    ' & > p': {
        color: 'white',
        letterSpacing: '0.08rem',
        textShadow: '2px 2px 5px black',
    },
}));
const ButtonContainer = styled(FlexCCC)({
    gap: '2rem',
    marginTop: '2rem',
});

const Wrapper = styled.section({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    position: 'relative',
    minHeight: '90vh',
    width: '100%',
    '@media only screen and (max-width: 500px)': {
        gridTemplateColumns: '1fr',
        minHeight: '84vh',
        [MainContent]: {
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginLeft: '1rem',
        },
        [Columns]: {
            width: '80%',
            marginTop: '1rem',
        },
        [ButtonContainer]: {
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

const AdvantagesDiv = styled(FlexCCC)((props) => ({
    gap: '0.5rem',
    '@media only screen and (max-width: 500px)': {
        gap: '0.2rem'
    },
    '& > p': {
        fontSize: '0.8rem',
        '@media only screen and (max-width: 500px)': {
            fontSize: '0.6rem'
        },
        width: "100%",
        color: props.theme.colors.black,
        textAlign: 'left'
    },
}));

interface IProps {
    isMobileOnly: boolean;
}
const Hero: FC<IProps> = ({ isMobileOnly }): JSX.Element => {
    const [name, setName] = useState<string | undefined>('');

    useEffect(() => {
        const cookie = Cookies.get('name');
        if (cookie) {
            setName(cookie);
        }
    }, []);

    return (
        <AnimatePresence>
            <Wrapper>
                <Image priority fill style={{ objectFit: 'cover' }} src={isMobileOnly ? heroMobile : hero} alt='hero image' />
                <MainContent variants={list} animate='visible' initial='hidden'>
                    <Columns>
                        <m.p variants={toDown} style={{ textTransform: 'lowercase', color: 'white' }}>
                            {name && `Привет, ${name}`}
                        </m.p>
                        <m.h1 variants={toRight}>Eager Beaver Language School</m.h1>
                        <m.p variants={toLeft}>детская языковая школа инклюзивного вида обучения</m.p>
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
