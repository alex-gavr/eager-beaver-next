import { motion } from 'framer-motion';
import MobileMenu from './mobile-menu';
import { MenuToggle } from './menu-toggle';
import styled from 'styled-components';
import { header } from '../links';
import { Logo } from '../../logo/logo';
import { list, mobileHeaderAni } from '../../../utils/motion-animations';
import { useEffect, useState } from 'react';
import Link from 'next/link';
// import { useInView } from 'react-intersection-observer';
// import { headerVisibilityStatus } from '../../../services/navigationVisibilitySlice';


const Wrapper = styled.div({
    marginBlock: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-between',
});
const Navigation = styled.nav({
    '@media only screen and (max-width:1000px)': {
        display: 'none',
    }
})

const DesktopNavigation = styled(motion.ul)((props) => ({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem 1rem',
    '& > li': {
        color: props.theme.colors.paragraph,
        fontSize: props.theme.fontSize.header,
        fontFamily: 'var(--ff-heading)'
    },
    '& > li > a': {
        display: 'block',
        width: '100%',
        height: '100%',
    },
}));
const NavigationButton = styled(Link)((props) => ({
    padding: '1rem',
    letterSpacing: '0.03rem',
    '&:hover': {
        color: props.theme.colors.title,
        backgroundColor: props.theme.colors.secondaryDark,
        borderRadius: '2rem',
    }
}));

const IconContainer = styled(motion.div)((props) => ({
    backgroundColor: props.theme.colors.primaryLight,
    borderRadius: '50%',
    padding: '1.4rem 1.3rem 1.2rem 1.4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    '@media only screen and (min-width: 1000px)': {
        display: 'none',
    }
}));

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    // const { ref, inView } = useInView({});

    // useEffect(() => {
    //     dispatch(headerVisibilityStatus(inView))
    
    // }, [inView])

    return (
        <header>
            <Wrapper>
                {/* Logo */}
                <Logo />
                {/* NAVIGATION DESKTOP */}
                <Navigation>
                    <DesktopNavigation variants={list} initial='hidden' animate='visible'>
                        {header.map((link) => (
                            <motion.li variants={mobileHeaderAni} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 500 }} key={link.id}>
                                <NavigationButton href={link.to} >
                                    {link.name}
                                </NavigationButton>
                            </motion.li>
                        ))}
                    </DesktopNavigation>
                </Navigation>
                {/* Mobile Nav */}
                <MobileMenu header={header} isOpen={isOpen} toggle={handleToggle} />
                <IconContainer initial={false} animate={isOpen ? 'open' : 'closed'} onClick={handleToggle}>
                    <MenuToggle toggle={handleToggle} />
                </IconContainer>
            </Wrapper>
        </header>
    );
};

export default Header;
