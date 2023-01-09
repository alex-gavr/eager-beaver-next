import { FC, useEffect, useState } from 'react';
import hero from '../../images/hero/heroCropped.webp';
import heroMobile from '../../images/hero/mobileHero.webp';
import { AnimatePresence, m } from 'framer-motion';
import { toRight, toDown, popUp, list, toUp, opacity } from '../../utils/motion-animations';
import styled from 'styled-components';
import Image from 'next/image';
import ActionButtons from '../buttons/action-buttons-page-end/ActionButtons';
import Cookies from 'js-cookie';
import { FlexCCC } from '../StyledMain';
import { useAppSelector } from '../../services/hook';

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
        '@media only screen and (max-width: 500px)': {
            textAlign: 'center',
        },
    },
}));

const ParagraphContainer = styled(FlexCCC)({
    width: '100%',
    alignItems: 'flex-start',
    gap: '0.2rem',
    '& > p': {
        color: 'rgba(255, 255, 255, 0.9)',
        letterSpacing: '0.08rem',
        textShadow: '2px 2px 5px black',
        '@media only screen and (max-width: 500px)': {
            fontSize: '1.1rem',
            width: '90%',
        },
    },
});
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
            '@media only screen and (max-width: 500px)': {
                width: '90%',
            },
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

interface IProps {
    isMobileOnly: boolean;
}
const Hero: FC<IProps> = ({ isMobileOnly }): JSX.Element => {
    const { showLoader } = useAppSelector((state) => state.homeLoader);
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
                <m.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                    layoutId='heroImage'
                    transition={{ duration: 0.6, ease: 'easeOut' }}>
                    <Image priority fill style={{ objectFit: 'cover' }} src={isMobileOnly ? heroMobile : hero} alt='hero image' />
                </m.div>
                {!showLoader && (
                    <MainContent variants={list} animate='visible' initial='hidden'>
                        <Columns>
                            <m.p variants={opacity} style={{ textTransform: 'capitalize', color: 'rgba(255, 255, 255,0.7)'  }}>
                                {name && `с возвращением, ${name}`}
                            </m.p>
                            <m.h1 variants={toDown}>Eager Beaver Language School</m.h1>
                            <ParagraphContainer>
                                <m.p variants={toRight}>детская языковая школа инклюзивного вида обучения</m.p>
                                <m.p variants={toUp}>помогаем вашему ребенку полюбить иностранные языки с детства</m.p>
                            </ParagraphContainer>
                            <ButtonContainer variants={popUp}>
                                <ActionButtons primaryButtonStyle='emptySecondary' secondaryButtonStyle='primary' showBackButton={false} padding={'1rem'} />
                            </ButtonContainer>
                        </Columns>
                    </MainContent>
                )}
            </Wrapper>
        </AnimatePresence>
    );
};

export default Hero;
