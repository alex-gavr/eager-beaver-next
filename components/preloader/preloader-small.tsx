import { FC } from 'react';
import preloader from '../../images/beaver/time.svg';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const PreloaderSmallContainer = styled(motion.div)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    ' & > img': {
        width: 80,
        height: 40,
    },
});

export const PreloaderSmall: FC = (): JSX.Element => {
    return (
        <PreloaderSmallContainer>
            <motion.img src={preloader} alt='' animate={{ scale: [0.8, 1, 0.8] }} transition={{ duration: 1, repeat: Infinity }} />
        </PreloaderSmallContainer>
    );
};
