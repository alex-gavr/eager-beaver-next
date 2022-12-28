import { useSwiper } from 'swiper/react';
import downArrow from '../../images/icons/downArrow.svg';
import styled from 'styled-components';
import Image from 'next/image';


const Wrapper = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 40%;
        height: 100%;
        @media only screen and (max-width: 500px) {
            width: 80%;
        }
    `;

    const PointerContainer = styled.span`
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        padding: 0.3rem;
        width: 50px;
        height: 50px;
        background-color: rgba(0, 0, 0, 0.5);
        user-select: none;
    `;

export const SlideButtons = () => {
    const swiper = useSwiper();

    return (
        <Wrapper>
            <PointerContainer
                onClick={() => swiper.slidePrev()}>
                <Image src={downArrow} alt='' style={{rotate: '90deg'}} />
            </PointerContainer>
            <PointerContainer
                onClick={() => swiper.slideNext()}>
                <Image src={downArrow} alt='' style={{rotate: '-90deg'}} />
            </PointerContainer>
        </Wrapper>
    );
};
