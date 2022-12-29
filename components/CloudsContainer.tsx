import { motion } from 'framer-motion';
import styled from 'styled-components';
interface ICloudContainerProps {
    top?: string | number | undefined;
    left?: string | number | undefined;
    right?: string | number | undefined;
    bottom?: string | number | undefined;
}

export const CloudContainer = styled(motion.div)<ICloudContainerProps>(({ top, left, right, bottom }) => ({
    display: 'none',
    zIndex: '99',
    position: 'absolute',
    top: top && top,
    left: left && left,
    bottom: bottom && bottom,
    right: right && right,
    height: '200px',
    width: '200px',
    '& > img': {
        width: '100%',
        height: '100%',
    },
    '@media only screen and (min-width: 50em)': {
        display: 'block',
    },
}));
