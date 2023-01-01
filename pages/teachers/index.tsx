import styled from 'styled-components';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ITeacher } from '../../types/data';
import {  NextPage } from 'next';
import { StyledMain } from '../../components/StyledMain';
import { useAppDispatch, useAppSelector } from '../../services/hook';
import { onCloseModal } from '../../services/modalSlice';
import { fetchNotion } from '../../utils/fetchNotion';
import TeacherCard from '../../components/teacher-card/teacher-card';

// const TeacherCard = dynamic(() => import('../../components/teacher-card/teacher-card'));
const Modal = dynamic(() => import('../../components/modal/modal'));
const FormPopUp = dynamic(() => import('../../components/submit-form/form-popup/FormPopUp'));
const ActionButtons = dynamic(() => import('../../components/buttons/action-buttons-page-end/ActionButtons'));
const PageAnimation = dynamic(() => import('../../components/page-animation/PageAnimation'));

const StyledWrapper = styled(motion.section)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '2rem',
    padding: '2rem 0.5rem',
    position: 'relative',
    '@media only screen and (min-width: 60em)': {
        padding: '2rem',
        gap: '4rem',
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
    justifyItems: 'center',
    alignItems: 'flex-start',
    minHeight: '70vh',
    '@media only screen and (min-width: 60em)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
});

interface IProps {
    teachers: ITeacher[];
}

const Teachers: NextPage<IProps> = ({teachers}) => {
    
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

export async function getStaticProps() {

    try{
        const teachers = await fetchNotion(process.env.NEXT_PUBLIC_NOTION_TEACHER_DB);
        return {
            props: {
                teachers,
            },
        };
    } catch(err) {
        console.log(err);
    }
}

export default Teachers;
