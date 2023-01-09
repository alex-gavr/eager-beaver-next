import Image from 'next/image';
import hero from '../images/hero/heroDesktop.webp';
import heroMobile from '../images/hero/mobileHero.webp';
import logo from '../images/logo.svg';
import { AnimatePresence, m } from 'framer-motion';
import styled from 'styled-components';
import { useAppDispatch } from '../services/hook';
import { resetHomeLoader } from '../services/homeLoaderSlice';
import { useRouter } from 'next/router';
import { toDown, toUp } from '../utils/motion-animations';

const Wrapper = styled(m.div)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgb(248, 236, 155)',
    zIndex: 1999,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    gap: '2rem',
});
const ImageContainer = styled(m.div)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: 'auto',
    overflow: 'hidden',
    boxShadow: '1px 0px 20px 2px rgba(0,0,0,0.2)',
    '@media only screen and (max-width: 500px)': {
        width: '50%',
    },
    '& > img': {
        width: '100%',
        height: '100%',
    },
});
const EagerBeaverContainer = styled(m.div)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
    overflow: 'hidden',
    position: 'absolute',
    top: '2%',
});
const Title = styled(m.h1)({
    fontSize: '1rem',
    textAlign: 'center',
    color: '#000',
    letterSpacing: '2px',
    position: 'absolute',
    bottom: '5%',
    width: '95%',
});
const TitlePages = styled(m.h1)({
    fontSize: '2rem',
    textAlign: 'center',
    color: '#000',
    letterSpacing: '2px',
    backgroundColor: 'rgb(101, 164, 111)',
    padding: '2rem',
    borderRadius: '0.5rem',
    marginInline: '1rem',
});

const container = {
    visible: {
        transition: {
            staggerChildren: 0.5,
        },
    },
};

const imageAni = {
    visible: (height = 500) => ({
        clipPath: `circle(${height * 2 + 200}px at 50% 50%)`,
        opacity: 1,
        transition: {
            opacity: {
                duration: 0.5,
            },
            duration: 1.5,
        },
    }),
    hidden: {
        clipPath: 'circle(20px at 50% 50%)',
        opacity: 0,
    },
};

interface IProps {
    isMobileOnly?: boolean;
    title: string;
    layoutId?: string;
}

const Loader = ({ isMobileOnly, title, layoutId }: IProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const handleDisableHomeAni = () => {
        dispatch(resetHomeLoader());
    };
    return (
        <AnimatePresence mode='wait'>
            <Wrapper variants={container} initial='hidden' animate='visible' exit='exit' onAnimationComplete={handleDisableHomeAni}>
                {router.pathname === '/' ? (
                    <ImageContainer variants={imageAni} layoutId='heroImage'>
                        <Image priority src={isMobileOnly ? heroMobile : hero} alt='hero' />
                    </ImageContainer>
                ) : (
                    <TitlePages variants={imageAni} layoutId={layoutId}>
                        {title}
                    </TitlePages>
                )}
                <EagerBeaverContainer variants={toDown}>
                    <Image src={logo} alt='heroBeaver' />
                </EagerBeaverContainer>
                <Title variants={toUp}>Eager Beaver Language School</Title>
            </Wrapper>
        </AnimatePresence>
    );
};

export default Loader;
