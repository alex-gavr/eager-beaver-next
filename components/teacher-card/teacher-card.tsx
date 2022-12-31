import play from '../../images/icons/play.svg';
import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useWindowSize } from '../../utils/use-window-size';
import Image from 'next/image';
import styled from 'styled-components';

const StyledContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '1rem',
    height: '100%',
    width: '100%',
    position:'relative',
});
const ImageAndSpanContainer = styled.div((props) =>({
    borderRadius: '50%',
    width: 'clamp(12.5rem, 8.8362rem + 17.2414vw, 25rem)',
    height: 'clamp(12.5rem, 8.8362rem + 17.2414vw, 25rem)',
    backgroundColor: props.theme.colors.background,
    position: 'relative',
    boxShadow: `8px -3px 1px ${props.theme.colors.secondaryDark}, -8px -5px 1px ${props.theme.colors.secondaryLight}`,
}));

const ImageContainer = styled.div((props) =>({
    borderRadius: '50%',
    width: 'clamp(12.5rem, 8.8362rem + 17.2414vw, 25rem)',
    height: 'clamp(12.5rem, 8.8362rem + 17.2414vw, 25rem)',
    backgroundColor: props.theme.colors.background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
}));
const TextContainer = styled.div((props) =>({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
    '& > h2': {
        textAlign: 'center',
        color: props.theme.colors.title,
    },
    '& > p': {
        textAlign: 'center',
        letterSpacing: '0.06rem',
        padding: '0 1rem',
        color: props.theme.colors.paragraph,
    }
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
})

interface Props {
    image: string;
    alt: string;
    name: string;
    description: string;
    includePlay: boolean;
    isMobileOnly: boolean;
}

const TeacherCard: FC<Props> = ({ image, alt, name, description, includePlay, isMobileOnly }) => {
    // const { width } = useWindowSize();
    const [isImgLoaded, setIsImgLoaded] = useState(false);

    const handleImageLoaded = () => {
        setIsImgLoaded(true);
    };

    return (
        <StyledContainer>
            <ImageAndSpanContainer>
                <ImageContainer>
                    {!isImgLoaded && <Skeleton circle style={{ zIndex: '20', position: 'absolute', top: '0', height: '100%' }} />}
                    <TeacherPhoto src={image} alt={alt} width={1000} height={1500} onLoadingComplete={handleImageLoaded} priority />
                </ImageContainer>
                {includePlay && isImgLoaded && <PlayIcon src={play} alt='' />}
            </ImageAndSpanContainer>
            <TextContainer>
                {!isImgLoaded && <Skeleton height={50} width={250} />}
                {isImgLoaded && <h2>{name}</h2>}
            </TextContainer>
            <TextContainer>
                {!isImgLoaded && <Skeleton height={15} width={isMobileOnly ? 300 : 500} count={isMobileOnly ? 6 : 4} />}
                {isImgLoaded && <p>{description}</p>}
            </TextContainer>
        </StyledContainer>
    );
};
export default TeacherCard;
