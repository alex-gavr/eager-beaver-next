import { FC } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Image from 'next/image';

const PreloaderSmallContainer = styled(motion.div)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
});

export const PreloaderSmall: FC = (): JSX.Element => {
    return (
        <PreloaderSmallContainer animate={{ scale: [0.8, 1, 0.8] }} transition={{ duration: 1, repeat: Infinity }}>
            <Image src={'/time.svg'} alt='' width={40} height={40} />
        </PreloaderSmallContainer>
    );
};
