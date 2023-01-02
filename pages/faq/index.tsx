import styled from 'styled-components';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { m } from 'framer-motion';
import { StyledMain } from '../../components/StyledMain';
import { IFaq } from '../../types/data';
import { useAppDispatch, useAppSelector } from '../../services/hook';
import { onCloseModal } from '../../services/modalSlice';
import { fetchNotion } from '../../utils/fetchNotion';
import FAQComponent from '../../components/faq/faq-component';

// const FAQComponent = dynamic(() => import('../../components/faq/faq-component'));
const Modal = dynamic(() => import('../../components/modal/modal'));
const FormPopUp = dynamic(() => import('../../components/submit-form/form-popup/FormPopUp'));
const ActionButtons = dynamic(() => import('../../components/buttons/action-buttons-page-end/ActionButtons'));
const PageAnimation = dynamic(() => import('../../components/page-animation/PageAnimation'));

const Wrapper = styled(m.section)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '95%',
    padding: '2rem 0',
    gap: '3rem',
    position: 'relative',
    '@media only screen and (min-width: 50em)': {
        padding: '2rem',
        width: '80%',
    },
});

const StyledHeading = styled.h1((props) => ({
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
    const dispatch = useAppDispatch();
    const { isModalOpen, formFromModal } = useAppSelector((state) => state.modal);

    const handleCloseModal = () => {
        dispatch(onCloseModal());
    };

    return (
        <>
            <Head>
                <title>Ответы на Вопросы</title>
                <meta name='description' content='Мы собрали здесь самые популярные вопросы и ответы на них ' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <StyledMain>
                <Wrapper>
                    <StyledHeading>
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
                {isModalOpen && formFromModal && (
                    <Modal onClose={handleCloseModal} showX={true}>
                        <FormPopUp futureEvents={false} />
                    </Modal>
                )}
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
