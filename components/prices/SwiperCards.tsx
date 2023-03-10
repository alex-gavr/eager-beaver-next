import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-cards';
import Image from 'next/image';
import styled from 'styled-components';
import { SlideButtons } from '../custom-arrows/leftAndRightButtons';
import { FlexCCC } from '../StyledMain';

const StyledSwiper = styled(Swiper)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'clamp(12.5rem, 4.8077rem + 61.5385vw, 62.5rem)',
    height: 'auto',
    marginLeft: '0 !important',
    marginRight: '0 !important',
});

const StyledSwiperSlide = styled(SwiperSlide)({
    padding: '1rem',
    overflow: 'inherit !important',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div:last-child': {
        display: 'none',
    }
});

const StyledCard = styled(FlexCCC)((props) =>({
    padding: '1rem 0.2rem',
    gap: '2rem',
    borderRadius: '2rem',
    boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.25), -5px -5px 20px rgba(0, 0, 0, 0.15)',
    backgroundColor: props.theme.colors.componentBackground,
    width: 270,
    height: 'auto',
    '@media only screen and (min-width: 50em)': {
        width: 350,
        padding: '1rem'
    }
}))
const NameContainer = styled(FlexCCC)((props) =>({
    backgroundColor: props.color === 'yellow' ? props.theme.colors.primaryDark : props.theme.colors.secondaryDark,
    width: '90%',
    padding: '1rem',
    borderRadius: '1rem',
    '@media only screen and (min-width: 50em)': {
        width: '100%',
    }
}));
const FlexContainer = styled(FlexCCC)((props) => ({
    gap: '0.4rem',
    '& > h2': {
        color: props.theme.colors.title,
        opacity: 0.7,
        textAlign: 'center',
        lineHeight: '1.2'
    },
    '& > p': {
        fontSize: props.theme.fontSize.subHeading,
        color: props.color === 'yellow' ? props.theme.colors.secondaryDark: props.theme.colors.primaryDark,
    },
    '@media only screen and (min-width: 50em)': {
        gap: '0.7rem'
    }
}));

const StyledDescription = styled(FlexCCC)({
    gap: '1rem',
    width: '90%'
});

const ContainerForBulletPoint = styled(FlexCCC)(props =>({
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    gap: '1rem',
    '& > img': {
        width: '20px',
        height: '20px',
    },
    '& > li': {
        color: props.theme.colors.paragraph
    }
}))

const SwiperCards = ({ pricesAdjustedArray }: any) => {
    return (
        <StyledSwiper effect={'cards'} modules={[EffectCards]}>
            {pricesAdjustedArray &&
                pricesAdjustedArray.map((price: any) => {
                    const color = price.mainArray.cardColor.rich_text[0].plain_text
                    return (
                        <StyledSwiperSlide key={price.mainArray.key.title[0].plain_text}>
                            <StyledCard>
                                <NameContainer color={color}>
                                    <FlexContainer color={color}>
                                        <h2>{price.mainArray.name.rich_text[0].plain_text}</h2>
                                        <p>{price.mainArray.price.rich_text[0].plain_text}</p>
                                    </FlexContainer>
                                </NameContainer>
                                <StyledDescription as='ul'>
                                    {price.features.map((point: any, index: number) => {
                                        const text = point.map((i: any) => i.text).join('');
                                        return (
                                            <ContainerForBulletPoint key={index}>
                                                <Image src={'/checkMark.svg'} width={50} height={50} alt='check mark' priority />
                                                <li>{text}</li>
                                            </ContainerForBulletPoint>
                                        );
                                    })}
                                </StyledDescription>
                            </StyledCard>
                        </StyledSwiperSlide>
                    );
                })}
                <SlideButtons />
        </StyledSwiper>
    );
};

export default SwiperCards;
