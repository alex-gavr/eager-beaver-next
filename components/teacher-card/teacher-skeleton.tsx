import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useWindowSize } from '../../utils/use-window-size';
import styles from './teacher-skeleton.module.css';

export const TeacherSkeleton: FC = (): JSX.Element => {
    const { width } = useWindowSize();
    return (
        <>
            {Array(2)
                .fill(0)
                .map((skelton, index) => (
                    <div className={styles.cardSkeleton} key={index}>
                        <Skeleton circle className={styles.circle} />
                        <Skeleton className={styles.title} />
                        <Skeleton count={width < 500 ? 6 : 4} className={styles.line} />
                    </div>
                ))}
        </>
    );
};
