import styled from 'styled-components';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { StyledMain } from '../../components/StyledMain';
import { m } from 'framer-motion';
import { IFutureEvent } from '../../types/data';
import { useAppDispatch, useAppSelector } from '../../services/hook';
import { onCloseModal } from '../../services/modalSlice';
import { resetDetails } from '../../services/futureEventSignUpData';
import { fetchNotion } from '../../utils/fetchNotion';

const FutureEvents = dynamic(() => import('../../components/future-events/FutureEvents'));
const Modal = dynamic(() => import('../../components/modal/modal'));
const FormPopUp = dynamic(() => import('../../components/submit-form/form-popup/FormPopUp'));
const PageAnimation = dynamic(() => import('../../components/page-animation/PageAnimation'));

const StyledSection = styled(m.section)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4rem 0.5rem',
    position: 'relative',
    gap: '4rem',
    width: '100%',
});

interface IProps {
    futureEvents: IFutureEvent[];
}
const Schedule: FC<IProps> = ({ futureEvents }) => {
    const { isModalOpen, submitSuccess, formFutureEvents } = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch();
    const handleCloseModal = () => {
        dispatch(onCloseModal());
        dispatch(resetDetails());
    };
    return (
        <>
            <Head>
                <title>Мероприятия</title>
                <meta name='description' content='Предстоящие мероприятия в Eager Beaver!' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <StyledMain>
                <StyledSection>
                    <FutureEvents futureEvents={futureEvents} />
                </StyledSection>
                <PageAnimation />
                {isModalOpen && formFutureEvents && (
                    <Modal onClose={handleCloseModal} showX={true}>
                        <FormPopUp futureEvents={true} />
                    </Modal>
                )}
            </StyledMain>
        </>
    );
};

export async function getStaticProps() {
    try {
        const futureEvents = await fetchNotion(process.env.NEXT_PUBLIC_NOTION_FUTURE_EVENTS_DB);
        return {
            props: {
                futureEvents,
            },
            revalidate: 60,
        };
    } catch (err) {
        console.log(err);
    }
}

export default Schedule;
