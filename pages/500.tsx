import { StyledMain } from "../components/StyledMain"
import styled from "styled-components";
import Image from "next/image";
import { Button } from "../components/buttons/button";
import PageAnimation from "../components/page-animation/PageAnimation";
import { useRouter } from "next/router";
import beaver from '../images/beaver/scared.svg';


const Wrapper = styled.section((props) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: '2rem',
    marginBottom: '2rem',
    position: 'relative',
    '& > img': {
        width: '30%',
        height: '100%',
        '@media only screen and (max-width: 500px)': {
            width: '90%',
            height: '100%',
        },
        '@media only screen and (max-width: 800px) and (min-width: 501px)': {
            width: '60%',
            height: '100%',
        }
    },
    '& > h1': {
        color: props.theme.colors.title,
        textAlign: 'center',
    }
}));

const StyledImage = styled(Image)({
    width: '80%',
    '@media only screen and (min-width:50em)': {
        width: '40%'
    }
});

const ButtonContainer = styled.div({
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: '2rem',
    '@media only screen and (min-width: 50em)': {
        flexFlow: 'row nowrap'
    }
})

const Custom500 = () => {
    const router = useRouter();
    return(
        <StyledMain>
        <Wrapper>
            <h1>Произошла ошибка на сервере</h1>
            <StyledImage src={beaver} alt='' />
            <ButtonContainer>
                <Button typeHTML='button' type='primary' onClick={() => router.reload()}>Попробовать Снова</Button>
                <Button typeHTML='button' type='emptySecondary' onClick={() => router.back()} textColor={'black'}>Назад</Button>
            </ButtonContainer>
            <PageAnimation />
        </Wrapper>
        </StyledMain>
    )
}
export default Custom500;