import styled from 'styled-components';
import Image from 'next/image';
import { FC, useLayoutEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useWindowSize } from '../../utils/use-window-size';
import downArrow from '../../images/icons/downArrow.svg';
import { AnimatePresence, m } from 'framer-motion';

const StyledCard = styled(m.div)((props) => ({
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    width: '100%',
    '& p': {
        textTransform: 'lowercase',
    },
    '& h2': {
        color: props.theme.colors.title,
    },
}));
const ContainerForImgAndDashes = styled.div({
    position: 'relative',
});

const ImageContainer = styled.div((props) => ({
    borderRadius: '50%',
    width: 'clamp(8.5rem, 8.8362rem + 17.2414vw, 15rem)',
    height: 'clamp(8.5rem, 8.8362rem + 17.2414vw, 15rem)',
    backgroundColor: props.theme.colors.background,
    overflow: 'hidden',
    zIndex: 2,
    position: 'relative',
    boxShadow: '1px 5px 15px 10px rgba(0, 0, 0, 0.25)',
    '& > img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
}));
const ParentsInfoContainer = styled.div((props) => ({
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.2rem',
    color: props.theme.colors.secondaryDark,
}));
const ParentName = styled.p((props) => ({
    fontSize: props.theme.fontSize.button,
}));

const ShowFullIconContainer = styled.span({
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.5rem',
});
const Dashed = styled.span`
    position: absolute;
    width: clamp(8.5rem, 8.8362rem + 17.2414vw, 15rem);
    height: clamp(8.5rem, 8.8362rem + 17.2414vw, 15rem);
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='200' ry='200' stroke='%2364A36FFF' stroke-width='4' stroke-dasharray='17' stroke-dashoffset='6' stroke-linecap='butt'/%3e%3c/svg%3e");
    border-radius: 200px;
    transform: translateY(-15px);
`;
const StyledReviewCard = styled(m.div)`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    letter-spacing: 0.08rem;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='44' ry='44' stroke='%2364A36FFF' stroke-width='4' stroke-dasharray='15%2c 26' stroke-dashoffset='16' stroke-linecap='round'/%3e%3c/svg%3e");
    border-radius: 44px;
`;
interface IStyledReviewText {
    $showFullText: boolean;
}
const StyledReviewText = styled(m.p)<IStyledReviewText>`
    display: -webkit-box;
    -webkit-line-clamp: ${(props) => (props.$showFullText ? 'initial' : '4')};
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: ${(props) => props.theme.colors.paragraph};
`;

interface IProps {
    image: string;
    name: string;
    parent: string;
    relationToChild: string;
    review: string;
}

export const ReviewCard: FC<IProps> = ({ image, name, parent, relationToChild, review }) => {
    const { width } = useWindowSize();
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    const [showFullText, setShowFullText] = useState(false);

    const handleImageLoaded = () => {
        setIsImgLoaded(true);
    };

    const toggleClassName = () => {
        setShowFullText(!showFullText);
    };

    const [isOverflowY, setIsOverflowY] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        const p = ref.current;
        if (p) {
            const hasOverflowY = p.scrollHeight > p.clientHeight;
            // RHS of assignment could be current.scrollHeight > current.clientWidth
            setIsOverflowY(hasOverflowY);
        }
    }, [ref, isImgLoaded]);

    return (
        <AnimatePresence mode='wait' initial={false}>
            <StyledCard>
                <ContainerForImgAndDashes>
                    {isImgLoaded && <Dashed />}
                    <ImageContainer>
                        {!isImgLoaded && <Skeleton circle style={{ zIndex: '20', position: 'absolute', top: '0', height: '100%' }} />}
                        <Image src={image} alt='' onLoadingComplete={handleImageLoaded} width={500} height={500} />
                    </ImageContainer>
                </ContainerForImgAndDashes>
                <h2>{isImgLoaded ? name : <Skeleton height={25} width={width < 500 ? 100 : 200} />}</h2>
                <StyledReviewCard onClick={toggleClassName}>
                    <ParentsInfoContainer>
                        <ParentName> {isImgLoaded ? parent : <Skeleton height={15} width={width < 500 ? 100 : 200} />}</ParentName>
                        <p>{isImgLoaded ? `${relationToChild}:` : <Skeleton height={15} width={width < 500 ? 100 : 200} />}</p>
                    </ParentsInfoContainer>
                    <StyledReviewText ref={ref} $showFullText={showFullText}>
                        {isImgLoaded ? review : <Skeleton height={15} width={width < 500 ? 300 : width < 1000 ? 350 : width < 1200 ? 450 : 550} count={4} />}
                    </StyledReviewText>
                    {isImgLoaded && isOverflowY && (
                        <ShowFullIconContainer style={showFullText ? { rotate: '180deg' } : {}}>
                            <Image src={downArrow} alt='' />
                        </ShowFullIconContainer>
                    )}
                </StyledReviewCard>
            </StyledCard>
        </AnimatePresence>
    );
};
