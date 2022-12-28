import { FC } from 'react';
import preloader from '../../images/beaver/time.svg';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const PreloaderContainer = styled(motion.div)({
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    gap: '2rem',
    ' & > img': {
        width: '50%',
    },
});

export const Preloader: FC = (): JSX.Element => {
    return (
        <PreloaderContainer>
            <motion.img src={preloader} alt='' animate={{ scale: [0.8, 1, 0.8] }} transition={{ duration: 1, repeat: Infinity }} />
            <p>Загружаем... Подождите, пожалуйста</p>
        </PreloaderContainer>
    );
};
