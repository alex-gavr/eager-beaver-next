import { motion } from 'framer-motion';
import ActionButtons from '../../components/buttons/action-buttons-page-end/ActionButtons';
import PageAnimation from '../../components/page-animation/PageAnimation';
import styled from 'styled-components';
import { StyledMain } from '../../components/StyledMain';
import { IFaq } from '../../types/data';
import { FAQComponent } from '../../components/faq/faq-component';
import { GetServerSidePropsContext } from 'next';
import { getSelectorsByUserAgent } from 'react-device-detect';

const Wrapper = styled(motion.section)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
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
    color: props.theme.colors.black,
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
    // const dispatch = useAppDispatch();
    // const { faq, loading, error } = useAppSelector((state) => state.faq);

    // useEffect(() => {
    //     dispatch(fetchFaq());
    // }, []);

    return (
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
        </StyledMain>
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
            Authorization: `Bearer ${process.env.NOTION_KEY}`,
        },
        body: JSON.stringify({
            filter: {
                property: 'key',
                rich_text: {
                    is_not_empty: true,
                },
            },
        }),
    };
    try {
        const result = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_FAQ_DB}/query`, options);
        const faq = await result.json().then((data) => data.results.map((data: any) => data.properties));
        return {
            props: {
                faq,
                isMobileOnly,
            },
        };
    } catch (err) {
        console.log(err);
    }
}
export default FAQ;
