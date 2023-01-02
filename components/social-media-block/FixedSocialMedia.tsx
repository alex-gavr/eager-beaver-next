import styled from 'styled-components';
import { useAppSelector } from '../../services/hook';
import SocialMediaIcons from './SocialMediaIcons';
import { AnimatePresence, m } from 'framer-motion';
import Image from 'next/image';
import whatsapp from '../../images/icons/social-media/whatsapp.svg';
import { useWindowSize } from '../../utils/use-window-size';

const StyledDiv = styled(m.div)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    zIndex: 800,
});

const StyledDivDesktop = styled(StyledDiv)({
    gap: '2rem',
    top: '50%',
    transform: 'translateY(-50%)',
});
const StyledDivMobile = styled(StyledDiv)({
    bottom: 10,
    zIndex: 800,
});

const FixedSocialMedia = () => {
    const { width } = useWindowSize();
    const { footerVisible, headerVisible } = useAppSelector((state) => state.navigationVisibility);
    return (
        <AnimatePresence>
            {width > 700 ? (
                <StyledDivDesktop
                    initial={{ right: '-10%', opacity: 0 }}
                    animate={footerVisible || headerVisible ? { right: '-10%', opacity: 0 } : { right: '2%', opacity: 1 }}
                    transition={{ ease: 'easeInOut', duration: 1 }}>
                    <SocialMediaIcons />
                </StyledDivDesktop>
            ) : (
                <StyledDivMobile
                    initial={{ right: '-15%' }}
                    animate={headerVisible ? { right: '-15%' } : { right: '4%' }}
                    transition={{ ease: 'easeInOut', duration: 1 }}>
                    <a href='https://wa.me/79093809657' aria-label='WhatsApp' target='_blank' rel='noopener noreferrer'>
                        <Image src={whatsapp} alt='' />
                    </a>
                </StyledDivMobile>
            )}
        </AnimatePresence>
    );
};

export default FixedSocialMedia;
