import { useWindowSize } from '../../../utils/use-window-size';
import { FC, useRef } from 'react';
import { ImageWithSkeleton } from '../../image-with-skeleton/img-with-skeleton';
import { AnimatePresence, motion } from 'framer-motion';
import Carousel from 'react-multi-carousel-18';
import 'react-multi-carousel-18/lib/styles.css';
import { IEventsData } from './thematic-events-data';
import { usePreventVerticalScroll } from '../../../utils/usePreventVerticalScroll';
import { LeftArrow, RightArrow } from '../../custom-arrows/CustomArrows';
import styled from 'styled-components';
import { IDeviceType } from '../../../types/data';

const EvenColumns = styled(motion.div)({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '3rem',
    justifyItems: 'center',
    alignItems: 'center',
    minHeight: '25rem',
    borderRadius: '2rem',
    '@media only screen and (min-width: 1050px)': {
        gridTemplateColumns: '1fr 1fr',
        columnGap: '1rem',
    },
});
const ImageContainer = styled.div({
    borderRadius: '2rem',
    width: 'clamp(18.75rem, 13.6783rem + 24.5902vw, 37.5rem)',
    height: 'clamp(18.75rem, 13.6783rem + 24.5902vw, 37.5rem)',
    overflow: 'hidden',
    position: 'relative',
    willChange: 'transform',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px -5px 10px rgba(50, 50, 93, 0.25), 0px 5px 10px rgba(50, 50, 93, 0.25)',
    pointerEvents: 'none',
    userSelect: 'none',
    '& > img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
});

const TextContainer = styled(motion.div)<any>((props) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    textTransform: 'lowercase',
    order: props.order,
    '& > p': {
        textAlign: 'center',
        letterSpacing: '0.06rem',
        color: props.theme.colors.paragraph
    },
}));
const SubHeading = styled(motion.h2)((props) => ({
    backgroundColor: props.theme.colors.primaryDark,
    padding: '0.5rem 1rem',
    borderRadius: '1.5rem',
    color: props.theme.colors.title,
    textTransform: 'uppercase',
    letterSpacing: '0.07rem',
    textAlign: 'center',
}));

const CarouselContainer = styled(motion.div)<any>(({order}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    order: order,
    // That's dots in Carousel
    '& > ul': {
        width: '40%',
        flexFlow: 'row wrap',
        left: '50% !important',
        bottom: '2% !important',
        transform: 'translateX(-50%)',
        '@media only screen and (min-width:1050px)': {
            width: '100%',
            bottom: '2% !important',
            left: '0 !important',
            transform: 'none',
        }
    },
}));

const StyledCarousel = styled(Carousel)({
    width: '100%',
    height: '100%',
    position: 'relative',
    paddingTop: '1rem',
    paddingBottom: '4rem',
    // Carousel item
    '& > ul > li': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    '@media only screen and (min-width:1050px)': {
        paddingBottom: '5rem'
    }
});

interface IProps extends IDeviceType, Omit<IEventsData, 'id'> {
    alt: string;
}

export const TwoColumns: FC<IProps> = ({ images, alt, imageSide, subHeading, paragraph, isMobileOnly, isTablet, isDesktop }) => {
    const { width } = useWindowSize();
    const ref = useRef(null);
    const slider = usePreventVerticalScroll(ref);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 800 },
            items: 1,
            slidesToSlide: 1,
        },
        mobile: {
            breakpoint: { max: 800, min: 0 },
            items: 1,
            slidesToSlide: 1,
        },
    };

    const rndInt = Math.floor(Math.random() * 2) + 1;

    return (
        <AnimatePresence mode='wait'>
            <EvenColumns
                whileInView={{ x: 0, opacity: 1 }}
                initial={{
                    x: rndInt === 1 ? -100 : 100,
                    opacity: 0,
                }}
                transition={{ duration: 1 }}
                viewport={{ margin: '-20% 0px -20% 0px' }}>
                <CarouselContainer ref={ref} order={ !isDesktop ? 2 : imageSide === 'left' ? 1 : 2 }>
                    <StyledCarousel
                        showDots={true}
                        responsive={responsive}
                        arrows={true}
                        ssr={true}
                        customLeftArrow={<LeftArrow alwaysBottom={true} />}
                        customRightArrow={<RightArrow alwaysBottom={true} />}
                        infinite={true}
                        renderDotsOutside={true}
                        customTransition='transform 400ms ease-in-out'
                        transitionDuration={1000}>
                        {images.map((image, index) => (
                            <ImageContainer key={index}>
                                <ImageWithSkeleton src={image.image} alt={alt} />
                            </ImageContainer>
                        ))}
                    </StyledCarousel>
                </CarouselContainer>
                <TextContainer order={ !isDesktop ? 1 : imageSide === 'left' ? 2 : 1 }>
                    <SubHeading>{subHeading}</SubHeading>
                    <motion.p>{paragraph}</motion.p>
                </TextContainer>
            </EvenColumns>
        </AnimatePresence>
    );
};
