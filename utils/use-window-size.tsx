import { useEffect, useState } from 'react';

export const useWindowSize = () => {
    const hasWindow = typeof window !== 'undefined';

    const getWindowDimensions = () => {
        const width = hasWindow && window.innerWidth;
        const height = hasWindow && window.innerHeight;
        return {
            width,
            height,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const handleResize = () => {
        setWindowDimensions(getWindowDimensions())
    };

    useEffect(() => {
        if (hasWindow) {
            handleResize();

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow]);

    return windowDimensions
};
