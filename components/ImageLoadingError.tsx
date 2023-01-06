import Button from './buttons/button';
import styled from 'styled-components';
import { FlexCCC } from './StyledMain';
import { useAppDispatch } from '../services/hook';
import { resetError } from '../services/errorSlice';
import { useRouter } from 'next/router';

const StyledDiv = styled(FlexCCC)((props) => ({
    backgroundColor: props.theme.colors.error,
    flexFlow: 'row nowrap',
    position: 'fixed',
    bottom: '2%',
    right: '2%',
    gap: '1rem',
    padding: '1rem',
    zIndex: 989,
    '& > p': {
        color: props.theme.colors.white,
    },
    '@media only screen and (max-width: 500px)': {
        gap: '0.7rem',
    },
}));

const ImageLoadingError = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const handleClick = () => {
        dispatch(resetError());
        router.reload();
    };

    return (
        <StyledDiv
            initial={{
                opacity: 0,
                y: '100vw',
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 1.5,
                ease: 'easeInOut',
            }}>
            <p>Произошла ошибка загрузки</p>
            <Button typeHTML='button' type='primary' onClick={handleClick} padding={'1rem'}>
                Повторить
            </Button>
        </StyledDiv>
    );
};

export default ImageLoadingError;
