import Image from 'next/image';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { initError } from '../../services/errorSlice';
import { useAppDispatch } from '../../services/hook';

interface IProps {
    src: string;
    alt: string;
    visibleByDefault?: boolean;
    className?: string;
}

export const ImageWithSkeleton = ({ src, alt, visibleByDefault, className }: IProps) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    return (
        <>
            {isLoading && (
                <Skeleton
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                />
            )}
            <Image src={src}  alt={alt} className={className} onLoadingComplete={() => setIsLoading(false)} onError={() => dispatch(initError())} />
        </>
    );
};


