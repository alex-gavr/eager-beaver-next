import styled from 'styled-components';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { FC, useRef } from 'react';
import { motion } from 'framer-motion';
import { ReviewCard } from '../../components/review-card/review-card';
import 'react-multi-carousel-18/lib/styles.css';
import { usePreventVerticalScroll } from '../../utils/usePreventVerticalScroll';
import { LeftArrow, RightArrow } from '../../components/custom-arrows/CustomArrows';
import { getSelectorsByUserAgent } from 'react-device-detect';
import { GetServerSidePropsContext } from 'next';
import { IReviews, IDeviceType } from '../../types/data';
import { StyledMain } from '../../components/StyledMain';
import { useAppDispatch, useAppSelector } from '../../services/hook';
import { onCloseModal } from '../../services/modalSlice';

const Carousel = dynamic(() => import('react-multi-carousel-18'));
const Modal = dynamic(() => import('../../components/modal/modal'));
const FormPopUp = dynamic(() => import('../../components/submit-form/form-popup/FormPopUp'));
const ActionButtons = dynamic(() => import('../../components/buttons/action-buttons-page-end/ActionButtons'));
const PageAnimation = dynamic(() => import('../../components/page-animation/PageAnimation'));

// Preloader for reviews
const StyledSpan = styled.span({
    width: '90vw',
    height: '90vh',
});

const StyledWrapper = styled(motion.section)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 0.5rem',
    position: 'relative',
    gap: '3rem',
    minHeight: '80vh',
    '@media only screen and (min-width: 50em)': {
        padding: '2rem',
    },
});

const StyledHeading = styled.h1((props) => ({
    color: props.theme.colors.secondaryDark,
    zIndex: 2,
    width: '80%',
    textAlign: 'center',
}));
const YellowBackground = styled.span((props) => ({
    position: 'absolute',
    height: '100%',
    width: '100vw',
    backgroundColor: props.theme.colors.primaryLight,
    '@media only screen and (min-width: 50em)': {
        top: 0,
    },
}));

const Accent = styled.span((props) => ({
    backgroundColor: props.theme.colors.secondaryDark,
    padding: '0.1rem 1rem',
    borderRadius: '1.5rem',
    color: props.theme.colors.title,
    transition: 'all 0.5s ease-in-out',
}));
const CarouselContainer = styled(motion.div)((props) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    position: 'relative',
    padding: '1rem',
    // That's dots in Carousel
    '& > ul': {
        zIndex: 3,
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
        },
    },
}));
const StyledCarousel = styled(Carousel)({
    width: '100vw',
    zIndex: 1,
    marginBottom: '1rem',
    '& > ul > li': {
        padding: '1rem 1rem 3.5rem 1rem',
        userSelect: 'none',
        '@media only screen and (min-width: 80em)': {
            padding: '1rem 2rem 2rem 2rem',
        },
    },
});

interface IProps extends IDeviceType {
    reviews: IReviews[];
}
const Reviews: FC<IProps> = ({ reviews, isMobileOnly, isTablet, isDesktop }): JSX.Element => {
    const dispatch = useAppDispatch();
    const { isModalOpen, formFromModal } = useAppSelector((state) => state.modal);

    const handleCloseModal = () => {
        dispatch(onCloseModal());
    };

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

    return (
        <>
            <Head>
                <title>Отзывы</title>
                <meta name='description' content='Вот что думают о нас родители! Мы ценим каждый ваш отзыв, вы помогаете нам становится лучше.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <StyledMain>
                <StyledWrapper ref={ref}>
                    <StyledHeading>
                        Наши <Accent>ученики</Accent>
                    </StyledHeading>
                    <CarouselContainer>
                        <StyledCarousel
                            showDots={true}
                            responsive={responsive}
                            infinite={true}
                            arrows={true}
                            ssr={true}
                            customLeftArrow={<LeftArrow />}
                            customRightArrow={<RightArrow />}
                            centerMode={isDesktop ? true : false}
                            customTransition='transform 400ms ease-in-out'
                            transitionDuration={1000}
                            renderDotsOutside={true}>
                            {reviews &&
                                reviews.map((review) => (
                                    <ReviewCard
                                        key={review.key.title[0].plain_text}
                                        image={review.image.files[0].file.url}
                                        name={review.name.rich_text[0].plain_text}
                                        parent={review.parent.rich_text[0].plain_text}
                                        relationToChild={review.relationToChild.rich_text[0].plain_text}
                                        review={review.review.rich_text[0].plain_text}
                                    />
                                ))}
                        </StyledCarousel>
                    </CarouselContainer>
                    <ActionButtons primaryButtonStyle='secondary' secondaryButtonStyle='emptySecondary' showBackButton={true} />
                    <YellowBackground />
                </StyledWrapper>
                <PageAnimation />
                {isModalOpen && formFromModal && (
                    <Modal onClose={handleCloseModal} showX={true}>
                        <FormPopUp futureEvents={false} />
                    </Modal>
                )}
            </StyledMain>
        </>
    );
};

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
    const userAgent = req.headers['user-agent'] || '';
    const { isMobileOnly, isTablet, isDesktop } = getSelectorsByUserAgent(userAgent);

    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Notion-Version': '2022-06-28',
            'content-type': 'application/json',
            Authorization: `${process.env.NEXT_PUBLIC_NOTION_KEY}`,
        },
        body: JSON.stringify({
            filter: {
                property: 'key',
                rich_text: {
                    is_not_empty: true,
                },
            },
            sorts: [
                {
                    property: 'key',
                    direction: 'ascending',
                },
            ],
        }),
    };
    try {
        const result = await fetch(`https://api.notion.com/v1/databases/${process.env.NEXT_PUBLIC_NOTION_REVIEWS_DB}/query`, options);
        const reviews = await result.json().then((data) => data.results.map((data: any) => data.properties));
        return {
            props: {
                reviews,
                isMobileOnly,
                isTablet,
                isDesktop,
            },
        };
    } catch (err) {
        console.log(err);
    }
}
export default Reviews;
