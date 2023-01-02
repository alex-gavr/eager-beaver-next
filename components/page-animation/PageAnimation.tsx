import { m, useIsPresent } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';

const StyledAnimationDiv = styled(m.div)({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'linear-gradient(45deg, #96fbc4 0%, #f9f586 100%)',
    zIndex: 999,
});

const PageAnimation = () => {
    const isPresent = useIsPresent();
    const [number, setNumber] = useState<number | null>(null);

    if (number === null) {
        setNumber(Math.floor(Math.random() * 2) + 1);
    }

    return (
        <StyledAnimationDiv
            initial={number === 1 ? { scaleX: 1 } : { scaleX: 1 }}
            animate={
                number === 1
                    ? { scaleX: 0, transition: { duration: 1, ease: 'circOut' } }
                    : { scaleX: 0, transition: { duration: 1, ease: 'circOut' } }
            }
            exit={
                number === 1
                    ? { scaleX: 1, transition: { duration: 1, ease: 'circOut' } }
                    : { scaleX: 1, transition: { duration: 1, ease: 'circOut' } }
            }
            style={
                number === 1
                    ? { originX: isPresent ? 0 : 1 }
                    : { originX: isPresent ? 1 : 0 }
            }
        />
    );
};

export default PageAnimation;
