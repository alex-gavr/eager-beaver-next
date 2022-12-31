import styled from 'styled-components';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
// import ActionButtons from '../../components/buttons/action-buttons-page-end/ActionButtons';
// import PageAnimation from '../../components/page-animation/PageAnimation';
// import TeacherCard  from '../../components/teacher-card/teacher-card';
import { ITeacher } from '../../types/data';
import { getSelectorsByUserAgent } from 'react-device-detect';
import { GetServerSidePropsContext } from 'next';
import { StyledMain } from '../../components/StyledMain';
// import Modal from '../../components/modal/modal';
// import FormPopUp from '../../components/submit-form/form-popup/FormPopUp';
import { useAppDispatch, useAppSelector } from '../../services/hook';
import { onCloseModal } from '../../services/modalSlice';

const TeacherCard = dynamic(() => import('../../components/teacher-card/teacher-card'));
const Modal = dynamic(() => import('../../components/modal/modal'));
const FormPopUp = dynamic(() => import('../../components/submit-form/form-popup/FormPopUp'));
const ActionButtons = dynamic(() => import('../../components/buttons/action-buttons-page-end/ActionButtons'));
const PageAnimation = dynamic(() => import('../../components/page-animation/PageAnimation'));

const StyledWrapper = styled(motion.section)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '4rem',
    padding: '2rem 0.5rem',
    position: 'relative',
    minHeight: '80vh',
    '@media only screen and (min-width: 60em)': {
        padding: '2rem',
    },
});

const StyledHeading = styled.h1((props) => ({
    color: props.theme.colors.title,
    textAlign: 'center',
}));

const Accent = styled.span((props) => ({
    backgroundColor: props.theme.colors.secondaryDark,
    borderRadius: '1rem',
    padding: '0.2rem 0.5rem',
    color: props.theme.colors.title,
}));

const StyledTeachersContainer = styled.div({
    display: 'grid',
    gap: '3rem 2rem',
    justifyContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    '@media only screen and (min-width: 60em)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
});

interface IProps {
    teachers: ITeacher[];
    isMobileOnly: boolean;
}

const Teachers = ({ teachers, isMobileOnly }: IProps) => {
    const dispatch = useAppDispatch();
    const { isModalOpen, formFromModal } = useAppSelector((state) => state.modal);

    const handleCloseModal = () => {
        dispatch(onCloseModal());
    };

    return (
        <>
            <Head>
                <title>Преподаватели</title>
                <meta
                    name='description'
                    content='Наши прекрасные учителя знают как найти подход к каждому ученику и сделать обучение увлекательным путешествием. Поэтому результаты не заставят себя ждать!'
                />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <StyledMain>
                <StyledWrapper>
                    <StyledHeading>
                        Наши <Accent>преподаватели</Accent>
                    </StyledHeading>
                    <StyledTeachersContainer>
                        {teachers &&
                            teachers.map((teacher) => (
                                <TeacherCard
                                    key={teacher.key.title[0].plain_text}
                                    image={teacher.image.files[0].file.url}
                                    alt={teacher.name.rich_text[0].plain_text}
                                    name={teacher.name.rich_text[0].plain_text}
                                    description={teacher.description.rich_text[0].plain_text}
                                    includePlay={true}
                                    isMobileOnly={isMobileOnly}
                                />
                            ))}
                    </StyledTeachersContainer>
                    <ActionButtons primaryButtonStyle='primary' secondaryButtonStyle='emptySecondary' showBackButton={true} />
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
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTION_KEY}`,
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
        const result = await fetch(`https://api.notion.com/v1/databases/${process.env.NEXT_PUBLIC_NOTION_TEACHER_DB}/query`, options);
        const teachers = await result.json().then((data) => data.results.map((data: any) => data.properties));
        return {
            props: {
                teachers,
                isMobileOnly,
            },
        };
    } catch (err) {
        console.log(err);
    }
}

export default Teachers;
