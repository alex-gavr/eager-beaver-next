import cloud from '../../images/clouds/1.svg';
import cloud2 from '../../images/clouds/2.svg';
import cloud3 from '../../images/clouds/3.svg';
import { FC } from 'react';
import { SocialIcon } from 'react-social-icons';
import styled from 'styled-components';
import SchoolLocationMap from '../../components/map/map';
import { CloudContainer } from '../../components/CloudsContainer';
import Image from 'next/image';
import { StyledMain } from '../../components/StyledMain';
import PageAnimation from '../../components/page-animation/PageAnimation';

// EMOTION STYLES
const StyledFlexDiv = styled.div({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: '2rem',
});

const ContactDetails = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    gap: '1rem',
    position: 'relative',
    order: 1,
});
const Wrapper = styled.section((props) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem 0.5rem',
    gap: '5rem',
    minHeight: '550px',
    position: 'relative',
    '@media only screen and (min-width: 50em)': {
        padding: '2rem',
    },
    [StyledFlexDiv as any]: {
        '@media only screen and (min-width: 50em)': {
            flexDirection: 'row',
        },
    },
    [ContactDetails as any]: {
        '@media only screen and (min-width: 50em)': {
            order: 2,
        },
    },
}));

const IconsContainer = styled.div({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.2rem',
    overflow: 'hidden',
    zIndex: 2,
});

const SubHeading = styled.h2(props => ({
    zIndex: 2,
    color: props.theme.colors.title
}));
const Paragraph = styled.p(props => ({
    zIndex: 2,
    color: props.theme.colors.paragraph
}));

const Contact: FC = (): JSX.Element => {
    return (
        <StyledMain>
            <Wrapper>
                <StyledFlexDiv>
                    <SchoolLocationMap style={{ order: 2, placeSelf: 'center' }} widthDesktop={550} heightDesktop={550} widthMobile={300} heightMobile={300} />
                    <ContactDetails>
                        <SubHeading>Контакты</SubHeading>
                        <Paragraph> Мы находимся по адресу: г. Волгоград Калинина 13, БЦ “Меркурий” </Paragraph>
                        <Paragraph>
                            Телефон для связи: <a href='tel:+7(909)380-96-57'>+7(909)380-96-57</a>
                        </Paragraph>
                        <SubHeading>Соцсети</SubHeading>
                        <IconsContainer>
                            <SocialIcon url='https://t.me/eagerbeavervlg' target='_blank' rel='noopener noreferrer' />
                            <SocialIcon url='https://instagram.com/eagerbeaver.vlg' target='_blank' rel='noopener noreferrer' />
                            <SocialIcon url='https://wa.me/79093809657' network='whatsapp' target='_blank' rel='noopener noreferrer' />
                            <SocialIcon url='https://vk.com/eagerbeavervlg' target='_blank' rel='noopener noreferrer' />
                        </IconsContainer>
                    </ContactDetails>
                    <CloudContainer top={0} left={0} animate={{x: -40}}>
                        <Image src={cloud} alt='' />
                    </CloudContainer>
                    <CloudContainer top={0} right={'10%'} height={150} width={150} animate={{y: -40}}>
                        <Image src={cloud2} alt='' />
                    </CloudContainer>
                    <CloudContainer bottom={'10%'} right={'5%'} height={100} width={100} animate={{y: 40}}>
                        <Image src={cloud3} alt='' />
                    </CloudContainer>
                </StyledFlexDiv>
            </Wrapper>
            <PageAnimation />
        </StyledMain>
    );
};
export default Contact;
