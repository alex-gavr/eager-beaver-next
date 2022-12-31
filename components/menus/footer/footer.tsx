import { AnimatePresence, motion } from 'framer-motion';
import { footer } from '../links';
import { list, opacity, popUp, toDown, toUp } from '../../../utils/motion-animations';
import beaverRocket from '../../../images/beaver/BeaverRocket.svg';
import Link from 'next/link';
import styled from 'styled-components';
// import { useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import SocialMediaIcons from '../../social-media-block/SocialMediaIcons';

const SchoolLocationMap = dynamic(() => import('../../map/map'), {
    ssr: false,
});
// const SocialMediaIcons = dynamic(() => import('../../social-media-block/SocialMediaIcons'));

// import { useInView } from 'react-intersection-observer';
// import { useAppDispatch } from '../../../services/hook';
// import { footerVisibilityStatus } from '../../../services/navigationVisibilitySlice';

const StyledFooter = styled.footer({
    width: '100vw',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d1e25',
    position: 'relative',
});
const SocialMediaContainer = styled(motion.div)((props) => ({
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
const IconsContainer = styled(motion.div)({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.2rem',
    
});
const FooterMainPart = styled(motion.div)({
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
    }
});
const Address = styled.p({
    order: 2,
    '@media only screen and (min-width: 50em)': {
        order: 1
    }
});
const Phone = styled.p({
    order: 3,
    '@media only screen and (min-width: 50em)': {
        order: 2
    }
});

const MapAndAddressContainer = styled(motion.div)({
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
const AddressContainer = styled(motion.div)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    textTransform: 'lowercase',
    letterSpacing: '0.05rem',
    gap: '1rem',
});
const LinksList = styled(motion.ul)((props) => ({
    display: 'grid',
    gridTemplateRows: 'repeat(5, 1fr)',
    gridAutoFlow: 'column',
    justifyItems: 'flex-start',
    alignItems: 'flex-start',
    gap: '2.5rem 2rem',
    '& > li': {
        fontSize: props.theme.fontSize.footer
    },
    '@media only screen and (max-width: 320px)': {
        gridTemplateColumns: '1fr',
        gridAutoFlow: 'row',
    },
    '@media only screen and (max-width: 400px)': {
        gap: '2.2rem 0rem',
        placeSelf: 'flex-start'
    },
    '@media only screen and (min-width: 560px) and (max-width: 900px)': {
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridAutoFlow: 'column',
    },
    '@media only screen and (min-width: 900px)': {
        width: 'fit-content',
    },

}));
const StyledLink = styled(Link)((props) =>({
    padding: '1rem',
    color: 'white',
    fontSize: props.theme.fontSize.footer,
    letterSpacing: '0.2rem',
    '&:hover': {
        color: props.theme.colors.title,
        backgroundColor: props.theme.colors.secondaryDark,
        borderRadius: '2rem'
    }
}));
const CreditsContainer = styled(motion.div)((props) => ({
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
            fontSize: '0.7rem'
        },
        '@media only screen and (min-width: 900px)': {
            fontSize: '0.8rem'
        },
    }
}));
const CreditsContainerOmitLera = styled(motion.div)((props) => ({
    display: 'grid',
    gridTemplateColumns:'repeat(2, 1fr)',
    gap: '0.5rem',
    '@media only screen and (min-width: 900px)': {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        justifyItems: 'center',
    },
}));

const Footer = () => {
    // const dispatch = useAppDispatch();

    // const { ref, inView } = useInView({});

    // useEffect(() => {
    //     dispatch(footerVisibilityStatus(inView))

    // }, [inView])

    return (
        <AnimatePresence>
            <StyledFooter>
                <SocialMediaContainer variants={list} initial='hidden' whileInView='visible' viewport={{ once: true, margin: '-10% 0px -10% -0px' }}>
                    <motion.p variants={opacity}>присоединяйся к нам и здесь</motion.p>
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
                                <motion.a href='tel:+7(909)380-96-57' style={{ color: 'inherit' }}>
                                    +7(909)380-96-57
                                </motion.a>
                            </Phone>
                        </AddressContainer>
                        <SchoolLocationMap style={{ placeSelf: 'center' }} widthDesktop={300} heightDesktop={300} widthMobile={300} heightMobile={300} />
                    </MapAndAddressContainer>
                    <LinksList variants={list} initial='hidden' whileInView='visible' viewport={{ once: true, margin: '-5% 0px -5% -0px' }}>
                        {footer.map((link) => (
                            <motion.li variants={toDown} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} key={link.id}>
                                <StyledLink prefetch={false} href={link.to}>{link.name}</StyledLink>
                            </motion.li>
                        ))}
                    </LinksList>
                </FooterMainPart>
                <CreditsContainer
                    variants={list}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, margin: '-5% 0px -5% -0px' }}>
                    <motion.p variants={popUp}>Product Owner: Валерия Евстратова</motion.p>
                    <CreditsContainerOmitLera variants={list}>
                        <motion.p variants={popUp}>Design: Мария Рязанова</motion.p>
                        <motion.p variants={popUp}>Development: Александр Гавриленко</motion.p>
                        <motion.p variants={popUp}>Photography: Диана Удаева</motion.p>
                        <motion.p variants={popUp}>Illustrations: Елизавета Шведова</motion.p>
                    </CreditsContainerOmitLera>
                </CreditsContainer>
            </StyledFooter>
        </AnimatePresence>
    );
};
export default Footer;
