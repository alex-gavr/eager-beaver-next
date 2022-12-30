import { motion } from 'framer-motion';
import styled from 'styled-components';
import sun from '../../images/icons/sun.svg';
import moon from '../../images/icons/moon.svg';
import Image from 'next/image';

const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
};

const ToggleContainer = styled.div<any>((props) => ({
    width: 100,
    height: 50,
    backgroundColor: props.currentTheme === 'light' ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)',
    backdropFilter: 'blur(20px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: props.currentTheme === 'light' ? 'flex-start' : 'flex-end',
    borderRadius: '50px',
    padding: '0.5rem',
    position: 'fixed',
    bottom: 20,
    left: 20,
    zIndex: 10,
    border: `1px solid ${props.theme.colors.paragraph}`,
    '& > img': props.currentTheme === 'light' ? {
        position: 'absolute',
        width: 40,
        height: 40,
        right: 7,
        '@media only screen and (max-width: 500px)': {
            width: 30,
            height: 30,
            right: 7,
        }
    } :{
        position: 'absolute',
        width: 30,
        height: 30,
        left: 12,
        '@media only screen and (max-width: 500px)': {
            width: 20,
            height: 20,
            left: 13,
        }
    },
    '@media only screen and (max-width: 500px)': {
        width: 80,
        height: 40,
        bottom: 10,
        left: 5,
    }
}));

const Toggle = styled(motion.div)((props) => ({
    width: 30,
    height: 30,
    backgroundColor: props.theme.colors.title,
    borderRadius: '40px',
    '@media only screen and (max-width: 500px)': {
        width: 22,
        height: 22,
    }
}));

interface IProps {
    toggleTheme: string | boolean | (() => void);
    theme: string | boolean | (() => void);
}
const ThemeToggler = ({ toggleTheme, theme }: IProps) => {
    return (
        <ToggleContainer currentTheme={theme} onClick={toggleTheme}>
            <Toggle layout transition={spring} />
            {theme === 'light' && <Image src={sun} alt='' />}
            {theme === 'dark' && <Image src={moon} alt='' />}
        </ToggleContainer>
    );
};

export default ThemeToggler;
