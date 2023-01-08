import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Image from 'next/image';
import styled from 'styled-components';
import { FlexCCC } from '../StyledMain';
import { useAppDispatch } from '../../services/hook';
import { initError } from '../../services/errorSlice';

const StyledContainer = styled(FlexCCC)({
    justifyContent: 'flex-start',
    gap: '1rem',
    height: 'auto',
    width: '90%',
    maxWidth: 600,
    position: 'relative',
    overflow: 'hidden',
    '@media only screen and (max-width: 500px)': {
        width: '95%',
    },
    '@media only screen and (min-width: 501px) and (max-width: 960px)': {
        width: '80%',
    },
});
const ImageAndSpanContainer = styled.div((props) => ({
    marginTop: '1rem',
    borderRadius: '50%',
    width: 'clamp(12.5rem, 8.8362rem + 17.2414vw, 25rem)',
    height: 'clamp(12.5rem, 8.8362rem + 17.2414vw, 25rem)',
    backgroundColor: props.theme.colors.background,
    position: 'relative',
    boxShadow: `8px -3px 1px ${props.theme.colors.secondaryDark}, -8px -5px 1px ${props.theme.colors.secondaryLight}`,
}));

const ImageContainer = styled.div((props) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    width: 'clamp(12.5rem, 8.8362rem + 17.2414vw, 25rem)',
    height: 'clamp(12.5rem, 8.8362rem + 17.2414vw, 25rem)',
    backgroundColor: props.theme.colors.background,
    overflow: 'hidden',
    position: 'relative',
}));
const TextContainer = styled(FlexCCC)((props) => ({
    width: '100%',
    overflow: 'hidden',
    '& > h2': {
        textAlign: 'center',
        color: props.theme.colors.title,
    },
    '& > p': {
        textAlign: 'center',
    },
}));

const TeacherPhoto = styled(Image)({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});
const PlayIcon = styled(Image)({
    position: 'absolute',
    zIndex: 21,
    bottom: 0,
    right: 0,
    width: 'clamp(3.125rem, 2.3922rem + 3.4483vw, 5.625rem)',
    height: 'clamp(3.125rem, 2.3922rem + 3.4483vw, 5.625rem)',
});

interface Props {
    image: string;
    alt: string;
    name: string;
    description: string;
    includePlay: boolean;
}

const TeacherCard: FC<Props> = ({ image, alt, name, description, includePlay}) => {
    const dispatch = useAppDispatch();

    const [isImgLoaded, setIsImgLoaded] = useState(false);

    const handleImageLoaded = () => {
        setIsImgLoaded(true);
    };

    return (
        <StyledContainer>
            <ImageAndSpanContainer>
                <ImageContainer>
                    {!isImgLoaded && <Skeleton circle style={{ zIndex: '20', position: 'absolute', top: '0', height: '100%' }} />}
                    <TeacherPhoto src={image} alt={alt} width={1000} height={1500} onLoadingComplete={handleImageLoaded} priority onError={() => dispatch(initError())} />
                </ImageContainer>
                {includePlay && isImgLoaded && <PlayIcon src={'/play.svg'} width={50} height={50} alt='' priority />}
            </ImageAndSpanContainer>
            <TextContainer>
                <h2>{isImgLoaded ? name : <Skeleton height={40} width={200} />}</h2>
            </TextContainer>
            <TextContainer>
                <p>{isImgLoaded ? description : <Skeleton height={15} width={800} count={5} />}</p>
            </TextContainer>
        </StyledContainer>
    );
};
export default TeacherCard;
