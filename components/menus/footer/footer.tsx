import { AnimatePresence, m } from 'framer-motion';
import { footer } from '../links';
import { list, opacity, popUp, toDown, toUp } from '../../../utils/motion-animations';
import beaverRocket from '../../../images/beaver/BeaverRocket.svg';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import SocialMediaIcons from '../../social-media-block/SocialMediaIcons';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useAppDispatch } from '../../../services/hook';
import { useInView } from 'react-intersection-observer';
import { footerVisibilityStatus } from '../../../services/navigationVisibilitySlice';
import { FlexCCC } from '../../StyledMain';

const SchoolLocationMap = dynamic(() => import('../../map/map'), {
    ssr: false,
    loading: () => (
        <div style={{ placeSelf: 'center', width: 300, height: 300 }}>
            <Skeleton width={300} height={300} />
        </div>
    ),
});

const StyledFooter = styled(FlexCCC)({
    width: '100vw',
    backgroundColor: '#1d1e25',
    position: 'relative',
});
const SocialMediaContainer = styled(FlexCCC)((props) => ({
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
const IconsContainer = styled(FlexCCC)({
    flexFlow: 'row nowrap',
    gap: '1.2rem',
});
const FooterMainPart = styled(FlexCCC)({
    width: '100%',
    maxWidth: '1300px',
    justifyContent: 'space-evenly',
    gap: '2rem',
    padding: '1rem',
    '@media only screen and (min-width: 900px)': {
        padding: '1rem 2rem',
        flexFlow: 'row wrap',
    },
});
const BeaverOnARocket = styled(Image)({
    width: 200,
    height: 200,
    placeSelf: 'center',
    transform: 'scaleX(-1)',
    rotate: ' -10deg',
    order: 1,
    '@media only screen and (min-width: 50em)': {
        width: 120,
        height: 120,
        position: 'absolute',
        top: '1rem',
        left: '3rem',
    },
});
const Address = styled.p((props) => ({
    color: props.theme.colors.white,
    order: 2,
    '@media only screen and (min-width: 50em)': {
        order: 1,
    },
}));
const Phone = styled.p((props) => ({
    color: props.theme.colors.white,
    letterSpacing: '0.1rem',
    order: 3,
    '@media only screen and (min-width: 50em)': {
        order: 2,
    },
}));

const MapAndAddressContainer = styled(FlexCCC)({
    width: '98%',
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
const AddressContainer = styled(FlexCCC)((props) => ({
    alignItems: 'flex-start',
    textTransform: 'lowercase',
    letterSpacing: '0.05rem',
    gap: '1rem',
}));
const LinksList = styled(m.ul)((props) => ({
    display: 'grid',
    gridTemplateRows: 'repeat(5, 1fr)',
    gridAutoFlow: 'column',
    justifyItems: 'flex-start',
    alignItems: 'flex-start',
    gap: '1rem',
    '& > li': {
        fontSize: props.theme.fontSize.footer,
        '&:hover': {
            color: props.theme.colors.title,
            backgroundColor: props.theme.colors.secondaryDark,
            borderRadius: '2rem',
        },
    },
    '@media only screen and (max-width: 320px)': {
        gridTemplateColumns: '1fr',
        gridAutoFlow: 'row',
    },
    '@media only screen and (max-width: 400px)': {
        gap: '0.5rem 0rem',
        placeSelf: 'flex-start',
    },
    '@media only screen and (min-width: 560px) and (max-width: 900px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
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
}));
const CreditsContainer = styled(FlexCCC)((props) => ({
    padding: '1rem',
    gap: '1rem',
    width: '100vw',
    backgroundColor: props.theme.colors.secondaryDark,
    '& p': {
        letterSpacing: '0.1rem',
        textTransform: 'capitalize',
        fontSize: '0.6rem',
        color: props.theme.colors.black,
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
    const dispatch = useAppDispatch();

    const { ref, inView } = useInView({});

    useEffect(() => {
        dispatch(footerVisibilityStatus(inView));
        if (!showMap && inView) {
            setShowMap(true);
        }
    }, [inView]);

    return (
        <AnimatePresence>
            <StyledFooter ref={ref} as='footer'>
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
                                Мы находимся по адресу: <br /> г. Волгоград, БЦ &quot;Меркурий&quot;, ул. Калинина, д. 13, 8-й этаж, офис 807
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
                            <Skeleton width={300} height={300} />
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
