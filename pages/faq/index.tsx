import styled from 'styled-components';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { StyledMain, StyledSection } from '../../components/StyledMain';
import { IFaq } from '../../types/data';
import { fetchNotion } from '../../utils/fetchNotion';
import FAQComponent from '../../components/faq/faq-component';
import { useAppSelector } from '../../services/hook';
import Loader from '../../components/Loader';
import {m} from 'framer-motion';


const ActionButtons = dynamic(() => import('../../components/buttons/action-buttons-page-end/ActionButtons'), {
    ssr: false
});
const PageAnimation = dynamic(() => import('../../components/page-animation/PageAnimation'));

const Wrapper = styled(StyledSection)({
    gap: '4rem',
    width: '95%',
    '@media only screen and (min-width: 60em)': {
        width: '80%',
    },
});

const StyledHeading = styled(m.h1)((props) => ({
    color: props.theme.colors.title,
    zIndex: 2,
    fontSize: 'clamp(2.4rem, 1.9487rem + 2.1880vw, 4rem)',
}));

const Accent = styled.span((props) => ({
    backgroundColor: props.theme.colors.primaryDark,
    color: props.theme.colors.black,
    padding: '0.5rem 1rem',
    borderRadius: '2rem',
}));

const YellowBackground = styled.span((props) => ({
    position: 'absolute',
    height: '300px',
    width: '100vw',
    borderRadius: '0 0 50% 50%',
    top: 0,
    backgroundColor: props.theme.colors.primaryLight,
}));

const Column = styled.div({
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '3rem',
    zIndex: 2,
    width: '100%',
});

interface IProps {
    faq: IFaq[];
}
const FAQ = ({ faq }: IProps) => {
    const { showLoader } = useAppSelector((state) => state.homeLoader);
    return (
        <>
            <Head>
                <title>Ответы на Вопросы</title>
                <meta name='description' content='Мы собрали здесь самые популярные вопросы и ответы на них ' />
            </Head>
            {showLoader && <Loader title='Вопрос / Ответ' layoutId='faq' />}
            <StyledMain>
                <Wrapper>
                    <StyledHeading layoutId='faq' transition={{ duration: 0.6, ease: 'easeOut' }}>
                        <Accent> Вопрос </Accent> / Ответ
                    </StyledHeading>
                    <Column>
                        {faq.map((question) => (
                            <FAQComponent
                                key={question.key.title[0].plain_text}
                                question={question.question.rich_text[0].plain_text}
                                answer={question.answer.rich_text[0].plain_text}
                            />
                        ))}
                    </Column>
                    <ActionButtons primaryButtonStyle='secondary' secondaryButtonStyle='emptyPrimary' showBackButton={true} />
                    <YellowBackground />
                </Wrapper>
                <PageAnimation />
            </StyledMain>
        </>
    );
};

export async function getStaticProps() {
    try {
        const faq = await fetchNotion(process.env.NEXT_PUBLIC_NOTION_FAQ_DB);
        return {
            props: {
                faq,
            },
        };
    } catch (err) {
        console.log(err);
    }
}
export default FAQ;
