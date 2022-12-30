import logo from '../../../images/logo.svg';
import { motion } from 'framer-motion';
import { FC, useEffect } from 'react';
import { useScrollBlock } from '../../../utils/blockScroll';
import { list, toDown, beaver, headerSidebar } from '../../../utils/motion-animations';
import Link from 'next/link';
import { ILink } from '../../../types/data';
import styled from 'styled-components';
import Image from 'next/image';

const Nav = styled.nav({
    padding: '2rem 0.8rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5rem',
    zIndex: 900,
});
const Background = styled(motion.div)((props) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    height: '100vh',
    width: '100%',
    background: props.theme.colors.mobileMenu,
    zIndex: 9,
}));
const MobileNavigationContainer = styled(motion.div)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '70vh',
});
const MobileNavigation = styled(motion.div)((props) => ({
    height: 'auto',
    width: '70%',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3rem',
    '& > li': {
        backgroundColor: props.theme.colors.secondaryDark,
        borderRadius: '2rem',
        width: 'auto',
        textAlign: 'center',
        display: 'inline-block',
        padding: '1rem',
    },
    '& > li > a': {
        display: 'block',
        width: '100%',
        height: '100%',
    },
}));

const LogoContainer = styled(motion.div)({
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    rotate: '140deg',
    translate: '-40% -20%',
    '& > img': {
        width: '90%',
        height: 'auto',
    },
});

interface IProps {
    header: ILink[];
    isOpen: boolean;
    toggle: () => void;
}

const MobileMenu: FC<IProps> = ({ header, isOpen, toggle }): JSX.Element => {
    const [blockScroll, allowScroll] = useScrollBlock();

    useEffect(() => {
        if (isOpen) {
            blockScroll();
            document.querySelector('body')?.scrollTo(0, 0);
        } else {
            allowScroll();
        }
    });

    return (
        <>
            {isOpen && (
                <Nav>
                    <Background variants={headerSidebar} animate='open' initial='closed'>
                        <MobileNavigationContainer>
                            <MobileNavigation variants={list} initial='hidden' animate='visible'>
                                {header.map((link: any) => (
                                    <motion.li variants={toDown} onClick={toggle} key={link.id}>
                                        <Link href={link.to}>{link.name}</Link>
                                    </motion.li>
                                ))}
                            </MobileNavigation>
                        </MobileNavigationContainer>
                        <LogoContainer variants={beaver} initial='hidden' animate='visible'>
                            <Image src={logo} alt='' loading='eager' />
                        </LogoContainer>
                    </Background>
                </Nav>
            )}
        </>
    );
};
export default MobileMenu;
