import Image from 'next/image';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import beaverRocket from '../../images/beaver/BeaverRocket.svg';
import { IDeviceType } from '../../types/data';

interface IProps {
    width?: string;
    rotate?: string;
}

const StyledDiv = styled(motion.div)<IProps>(({ width, rotate }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 999,
    top: '110vh',
    right: '-2rem',
    width: width,
    '& > img': {
        width: '100%',
        height: '100%',
        rotate: rotate,
    },
}));

const FlyingBeaver = ({ isMobileOnly, isTablet }: Omit<IDeviceType, 'isDesktop'>) => {
    return (
        <AnimatePresence>
            <StyledDiv
                width={isMobileOnly ? '40%' : isTablet ? '20%' : '10rem'}
                rotate={isMobileOnly ? '55deg' : '40deg'}
                animate={{
                    x: isMobileOnly ? '-70vw' : '-100vw',
                    y: isMobileOnly ? '-150vh' : '-150vh',
                    transition: {
                        duration: 4.5,
                        delay: 1,
                        ease: 'easeIn',
                    },
                }}>
                <Image src={beaverRocket} alt='' loading='eager' />
            </StyledDiv>
        </AnimatePresence>
    );
};

export default FlyingBeaver;
