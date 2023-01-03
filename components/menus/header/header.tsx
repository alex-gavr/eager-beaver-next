import { m } from 'framer-motion';
import MobileMenu from './mobile-menu';
import { MenuToggle } from './menu-toggle';
import styled from 'styled-components';
import { header } from '../links';
import { Logo } from '../../logo/logo';
import { list, mobileHeaderAni } from '../../../utils/motion-animations';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { useAppDispatch } from '../../../services/hook';
import { headerVisibilityStatus } from '../../../services/navigationVisibilitySlice';
import { FlexCCC } from '../../StyledMain';

const Wrapper = styled(FlexCCC)({
    marginBlock: '2rem',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
});
const Navigation = styled.nav({
    '@media only screen and (max-width:1000px)': {
        display: 'none',
    },
});

const DesktopNavigation = styled(m.ul)((props) => ({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem 1rem',
    '& > li': {
        color: props.theme.colors.paragraph,
        fontSize: props.theme.fontSize.header,
        fontFamily: 'var(--ff-heading)',
    }
}));
const NavigationButton = styled(Link)((props) => ({
    padding: '1rem',
    letterSpacing: '0.03rem',
    '&:hover': {
        color: props.theme.colors.title,
        backgroundColor: props.theme.colors.secondaryDark,
        borderRadius: '2rem',
    },
}));

const IconContainer = styled(FlexCCC)((props) => ({
    backgroundColor: props.theme.colors.primaryLight,
    borderRadius: '50%',
    padding: '1.4rem 1.3rem 1.2rem 1.4rem',
    zIndex: 999,
    '@media only screen and (min-width: 1000px)': {
        display: 'none',
    },
}));

const Header = () => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const { ref, inView } = useInView({});

    useEffect(() => {
        dispatch(headerVisibilityStatus(inView));
    }, [inView]);

    return (
        <header ref={ref}>
            <Wrapper>
                {/* Logo */}
                <Logo />
                {/* NAVIGATION DESKTOP */}
                <Navigation>
                    <DesktopNavigation variants={list} initial='hidden' animate='visible'>
                        {header.map((link) => (
                            <m.li
                                variants={mobileHeaderAni}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: 'spring', stiffness: 500 }}
                                key={link.id}>
                                <NavigationButton href={link.to}>{link.name}</NavigationButton>
                            </m.li>
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
