import styled from 'styled-components';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import cloud from '../../images/clouds/1.svg';
import cloud2 from '../../images/clouds/2.svg';
import cloud3 from '../../images/clouds/3.svg';
import { CloudContainer } from '../../components/CloudsContainer';
import { FlexCCC, StyledMain, StyledSection } from '../../components/StyledMain';
import { NextPage } from 'next';

const SchoolLocationMap = dynamic(() => import('../../components/map/map'));
const SocialMediaIcons = dynamic(() => import('../../components/social-media-block/SocialMediaIcons'));
const PageAnimation = dynamic(() => import('../../components/page-animation/PageAnimation'));

const Grid = styled.div({
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'center',
    justifyItems: 'center',
    gap: '2rem',
    '@media only screen and (min-width: 900px)': {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2rem',
    },
});

const ContactDetails = styled(FlexCCC)({
    alignItems: 'flex-start',
    width: '90%',
    gap: '1rem',
    position: 'relative',
    order: 1,
    '@media only screen and (min-width: 900px)': {
        order: 2,
    },
});

const IconsContainer = styled(FlexCCC)({
    flexFlow: 'row nowrap',
    gap: '1.2rem',
    overflow: 'hidden',
    zIndex: 2,
});

const Heading = styled.h1((props) => ({
    color: props.theme.colors.title,
}));
const SubHeading = styled.h2((props) => ({
    color: props.theme.colors.title,
}));

const Contact: NextPage = (): JSX.Element => {
    return (
        <>
            <Head>
                <title>Контакты</title>
                <meta name='description' content='Как связаться? Где находитесь? И как добраться? Ответы есть здесь!' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <StyledMain>
                <StyledSection>
                    <Grid>
                        <SchoolLocationMap style={{ order: 2 }} widthDesktop={550} heightDesktop={550} widthMobile={300} heightMobile={300} />
                        <ContactDetails>
                            <Heading>Контакты</Heading>
                            <p> г. Волгоград, БЦ &quot;Меркурий&quot;, ул. Калинина, д. 13, 8-й этаж, офис 807 </p>
                            <p>
                                Телефон для связи: <a href='tel:+7(909)380-96-57'>+7(909)380-96-57</a>
                            </p>
                            <SubHeading>Соцсети</SubHeading>
                            <IconsContainer>
                                <SocialMediaIcons />
                            </IconsContainer>
                        </ContactDetails>
                        <CloudContainer top={0} left={0} animate={{ x: -40 }}>
                            <Image src={cloud} alt='' />
                        </CloudContainer>
                        <CloudContainer top={0} right={'10%'} height={150} width={150} animate={{ y: -40 }}>
                            <Image src={cloud2} alt='' />
                        </CloudContainer>
                        <CloudContainer bottom={'10%'} right={'5%'} height={100} width={100} animate={{ y: 40 }}>
                            <Image src={cloud3} alt='' />
                        </CloudContainer>
                    </Grid>
                </StyledSection>
                <PageAnimation />
            </StyledMain>
        </>
    );
};
export default Contact;
