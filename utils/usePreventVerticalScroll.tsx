import { RefObject, useCallback, useEffect, useRef } from 'react';

// @see https://github.com/akiran/react-slick/issues/1240#issuecomment-513235261
export function usePreventVerticalScroll<T extends HTMLElement>(ref: RefObject<T>, dragThreshold = 5) {
    const firstClientX = useRef<number>(0);
    const clientX = useRef<number>(0);

    const preventTouch = useCallback(
        (e: TouchEvent) => {
            clientX.current = e.touches[0].clientX - firstClientX.current;
            // Vertical scrolling does not work when you start swiping horizontally.
            if (Math.abs(clientX.current) > dragThreshold) {
                e.preventDefault();
                e.returnValue = false;
                return false;
            }

            return true;
        },
        [dragThreshold]
    );

    const touchStart = useCallback((e: TouchEvent) => {
        firstClientX.current = e.touches[0].clientX;
    }, []);

    useEffect(() => {
        const current = ref.current;
        if (current) {
            current.addEventListener('touchstart', touchStart);
            current.addEventListener('touchmove', preventTouch, { passive: false });
        }
        return () => {
            if (current) {
                current.removeEventListener('touchstart', touchStart);
                // Had to change this line to prevent a typing error. You may not have the issue:
                // current.removeEventListener('touchmove', preventTouch, { passive: false })
                current.removeEventListener('touchmove', preventTouch);
            }
        };
    }, [preventTouch, ref, touchStart]);
}
