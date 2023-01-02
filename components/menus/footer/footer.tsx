import { AnimatePresence, m } from 'framer-motion';
import { footer } from '../links';
import { list, opacity, popUp, toDown, toUp } from '../../../utils/motion-animations';
import beaverRocket from '../../../images/beaver/BeaverRocket.svg';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import SocialMediaIcons from '../../social-media-block/SocialMediaIcons';
import { Button } from '../../buttons/button';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useAppDispatch } from '../../../services/hook';
import { useInView } from 'react-intersection-observer';
import { footerVisibilityStatus } from '../../../services/navigationVisibilitySlice';

const SchoolLocationMap = dynamic(() => import('../../map/map'), {
    ssr: false,
    loading: () => (
        <div style={{ placeSelf: 'center', width: 300, height: 300 }}>
            <Skeleton width={300} height={300} />
        </div>
    ),
});

const StyledFooter = styled.footer({
    width: '100vw',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d1e25',
    position: 'relative',
});
const SocialMediaContainer = styled(m.div)((props) => ({
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    gap: '1rem',
    '@media only screen and (min-width: 500px)': {
        flexFlow: 'row nowrap',
        placeSelf: 'flex-end',
    },
    '& > p': {
        color: props.theme.colors.secondaryLight,
    },
}));
const IconsContainer = styled(m.div)({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.2rem',
});
const FooterMainPart = styled(m.div)({
    width: '100%',
    maxWidth: '1300px',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: '2rem',
    padding: '1rem',
    '@media only screen and (min-width: 900px)': {
        padding: '1rem 2rem',
        flexFlow: 'row wrap',
    },
});
const BeaverOnARocket = styled(Image)({
    width: '200px',
    height: '200px',
    placeSelf: 'center',
    transform: 'scaleX(-1)',
    rotate: ' -10deg',
    order: 1,
    '@media only screen and (min-width: 50em)': {
        width: '120px',
        height: '120px',
        position: 'absolute',
        top: '1rem',
        left: '3rem',
    },
});
const Address = styled.p({
    order: 2,
    '@media only screen and (min-width: 50em)': {
        order: 1,
    },
});
const Phone = styled.p({
    order: 3,
    '@media only screen and (min-width: 50em)': {
        order: 2,
    },
});

const MapAndAddressContainer = styled(m.div)({
    width: '98%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: 'white',
    textTransform: 'lowercase',
    letterSpacing: '0.05rem',
    gap: '1rem',
    paddingBottom: '2rem',
    borderBottom: '3px solid rgb(248, 236, 155)',
    '@media only screen and (max-width: 50em)': {
        alignItems: 'center',
    },
    '@media only screen and (min-width: 900px)': {
        width: '50%',
        borderRight: '3px solid rgb(248, 236, 155)',
        borderBottom: 'none',
        paddingRight: '2rem',
        paddingBottom: 0,
    },
    '@media only screen and (min-width: 1200px)': {
        flexDirection: 'row',
    },
});
const AddressContainer = styled(m.div)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    textTransform: 'lowercase',
    letterSpacing: '0.05rem',
    gap: '1rem',
});
const LinksList = styled(m.ul)((props) => ({
    display: 'grid',
    gridTemplateRows: 'repeat(5, 1fr)',
    gridAutoFlow: 'column',
    justifyItems: 'flex-start',
    alignItems: 'flex-start',
    gap: '2.5rem 2rem',
    '& > li': {
        fontSize: props.theme.fontSize.footer,
    },
    '@media only screen and (max-width: 320px)': {
        gridTemplateColumns: '1fr',
        gridAutoFlow: 'row',
    },
    '@media only screen and (max-width: 400px)': {
        gap: '2.2rem 0rem',
        placeSelf: 'flex-start',
    },
    '@media only screen and (min-width: 560px) and (max-width: 900px)': {
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridAutoFlow: 'column',
    },
    '@media only screen and (min-width: 900px)': {
        width: 'fit-content',
    },
}));
const StyledLink = styled(Link)((props) => ({
    padding: '1rem',
    color: 'white',
    fontSize: props.theme.fontSize.footer,
    letterSpacing: '0.2rem',
    '&:hover': {
        color: props.theme.colors.title,
        backgroundColor: props.theme.colors.secondaryDark,
        borderRadius: '2rem',
    },
}));
const CreditsContainer = styled(m.div)((props) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    gap: '1rem',
    width: '100vw',
    backgroundColor: props.theme.colors.secondaryDark,
    '& p': {
        letterSpacing: '0.1rem',
        textTransform: 'capitalize',
        fontSize: '0.6rem',
        '@media only screen and (min-width: 560px) and (max-width: 900px)': {
            fontSize: '0.7rem',
        },
        '@media only screen and (min-width: 900px)': {
            fontSize: '0.8rem',
        },
    },
}));
const CreditsContainerOmitLera = styled(m.div)((props) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.5rem',
    '@media only screen and (min-width: 900px)': {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        justifyItems: 'center',
    },
}));

const Footer = () => {
    const [showMap, setShowMap] = useState(false);

    const handleShowMap = () => {
        setShowMap(!showMap);
    };
    const dispatch = useAppDispatch();

    const { ref, inView } = useInView({});

    useEffect(() => {
        dispatch(footerVisibilityStatus(inView));
    }, [inView]);

    return (
        <AnimatePresence>
            <StyledFooter ref={ref}>
                <SocialMediaContainer variants={list} initial='hidden' whileInView='visible' viewport={{ once: true, margin: '-10% 0px -10% -0px' }}>
                    <m.p variants={opacity}>присоединяйся к нам и здесь</m.p>
                    <IconsContainer variants={toUp}>
                        <SocialMediaIcons />
                    </IconsContainer>
                </SocialMediaContainer>
                <FooterMainPart>
                    <MapAndAddressContainer>
                        <AddressContainer>
                            <BeaverOnARocket src={beaverRocket} alt='' />
                            <Address>
                                Мы находимся по адресу: <br /> г. Волгоград ул. Калинина д. 13, БЦ “Меркурий”
                            </Address>
                            <Phone>
                                Телефон для связи:
                                <m.a href='tel:+7(909)380-96-57' style={{ color: 'inherit' }}>
                                    +7(909)380-96-57
                                </m.a>
                            </Phone>
                        </AddressContainer>
                        {showMap ? (
                            <SchoolLocationMap
                                style={{ placeSelf: 'center', width: 300, height: 300 }}
                                widthDesktop={300}
                                heightDesktop={300}
                                widthMobile={300}
                                heightMobile={300}
                            />
                        ) : (
                            <Button typeHTML='button' type='primary' onClick={handleShowMap} width={300} height={300} placeSelf='center'>
                                Показать на Карте
                            </Button>
                        )}
                    </MapAndAddressContainer>
                    <LinksList variants={list} initial='hidden' whileInView='visible' viewport={{ once: true, margin: '-5% 0px -5% -0px' }}>
                        {footer.map((link) => (
                            <m.li variants={toDown} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} key={link.id}>
                                <StyledLink href={link.to}>{link.name}</StyledLink>
                            </m.li>
                        ))}
                    </LinksList>
                </FooterMainPart>
                <CreditsContainer variants={list} initial='hidden' whileInView='visible' viewport={{ once: true, margin: '-5% 0px -5% -0px' }}>
                    <m.p variants={popUp}>Product Owner: Валерия Евстратова</m.p>
                    <CreditsContainerOmitLera variants={list}>
                        <m.p variants={popUp}>Design: Мария Рязанова</m.p>
                        <m.p variants={popUp}>Development: Александр Гавриленко</m.p>
                        <m.p variants={popUp}>Photography: Диана Удаева</m.p>
                        <m.p variants={popUp}>Illustrations: Елизавета Шведова</m.p>
                    </CreditsContainerOmitLera>
                </CreditsContainer>
            </StyledFooter>
        </AnimatePresence>
    );
};
export default Footer;
