import styled from 'styled-components';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { ITeacher } from '../../types/data';
import {  GetServerSidePropsContext, NextPage } from 'next';
import { StyledMain, StyledSection } from '../../components/StyledMain';
import { fetchNotion } from '../../utils/fetchNotion';
import TeacherCard from '../../components/teacher-card/teacher-card';
import Loader from '../../components/Loader';
import { useAppSelector } from '../../services/hook';
import {m} from 'framer-motion';

const ActionButtons = dynamic(() => import('../../components/buttons/action-buttons-page-end/ActionButtons'), {
    ssr: false
});
const PageAnimation = dynamic(() => import('../../components/page-animation/PageAnimation'));


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
    '@media only screen and (min-width: 60em)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
});

interface IProps {
    teachers: ITeacher[];
}

const Teachers: NextPage<IProps> = ({teachers}) => {
    const { showLoader } = useAppSelector((state) => state.homeLoader);

    return (
        <>
            <Head>
                <title>Преподаватели</title>
                <meta name='description' content='Наши прекрасные учителя знают как найти подход к каждому ученику и сделать обучение увлекательным путешествием. Поэтому результаты не заставят себя ждать!' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            {showLoader && <Loader title='Наши преподаватели' layoutId='ourTeachers' />}
            <StyledMain>
                <StyledSection>
                    <m.h1 style={{textAlign: 'center', lineHeight: '1.6'}} layoutId='ourTeachers' transition={{ duration: 0.6, ease: 'easeOut' }}>
                        Наши <Accent>преподаватели</Accent>
                    </m.h1>
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
                </StyledSection>
                <PageAnimation />
            </StyledMain>
        </>
    );
};

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
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
