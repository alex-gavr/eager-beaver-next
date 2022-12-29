import styled from 'styled-components';
import { motion } from 'framer-motion';
import ActionButtons from '../../components/buttons/action-buttons-page-end/ActionButtons';
// import PageAnimation from '../../components/page-animation/PageAnimation';
import { TeacherCard } from '../../components/teacher-card/teacher-card';
import { ITeacher } from '../../types/data';
import { getSelectorsByUserAgent } from 'react-device-detect';
import { GetServerSidePropsContext } from 'next';
import { StyledMain } from '../../components/StyledMain';
import dynamic from 'next/dynamic';

const PageAnimation = dynamic(() => import('../../components/page-animation/PageAnimation'), {
    ssr: false,
});

const StyledWrapper = styled(motion.section)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '4rem',
    padding: '2rem 0.5rem',
    position: 'relative',
    '@media only screen and (min-width: 60em)': {
        padding: '2rem',
    },
});

const StyledHeading = styled.h1({
    color: 'var(--clr-primary-700)',
    textAlign: 'center',
});

const Accent = styled.span((props) => ({
    backgroundColor: props.theme.colors.secondaryDark,
    borderRadius: '1rem',
    padding: '0.2rem 0.5rem',
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
    return (
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
        const result = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_TEACHER_DB}/query`, options);
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
