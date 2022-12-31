import styled from 'styled-components';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { StyledMain } from '../../components/StyledMain';
import { motion } from 'framer-motion';
// import PageAnimation from '../../components/page-animation/PageAnimation';
import { GetServerSidePropsContext } from 'next';
import { getSelectorsByUserAgent } from 'react-device-detect';
import { IFutureEvent } from '../../types/data';
// import FutureEvents from '../../components/future-events/FutureEvents';
import { useAppDispatch, useAppSelector } from '../../services/hook';
// import Modal from '../../components/modal/modal';
// import FormPopUp from '../../components/submit-form/form-popup/FormPopUp';
import { onCloseModal } from '../../services/modalSlice';
import { resetDetails } from '../../services/futureEventSignUpData';

const FutureEvents = dynamic(() => import('../../components/future-events/FutureEvents'));
const Modal = dynamic(() => import('../../components/modal/modal'));
const FormPopUp = dynamic(() => import('../../components/submit-form/form-popup/FormPopUp'));
const PageAnimation = dynamic(() => import('../../components/page-animation/PageAnimation'));


const StyledSection = styled(motion.section)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4rem 0.5rem',
    fontFamily: 'var(--ff-primary-bold)',
    position: 'relative',
    gap: '4rem',
    minHeight: '80vh',
    width: '100%',
});

interface IProps {
    futureEvents: IFutureEvent[];
}
const Schedule: FC<IProps> = ({ futureEvents }): JSX.Element => {
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
            sorts: [
                {
                    property: 'key',
                    direction: 'ascending',
                },
            ],
        }),
    };
    try {
        const result = await fetch(`https://api.notion.com/v1/databases/${process.env.NEXT_PUBLIC_NOTION_FUTURE_EVENTS_DB}/query`, options);
        const futureEvents = await result.json().then((data) =>
            data.results.map((data: any) => {
                return {
                    page_id: data.id,
                    properties: data.properties,
                };
            })
        );
        return {
            props: {
                futureEvents,
                isMobileOnly,
            },
        };
    } catch (err) {
        console.log(err);
    }
}

export default Schedule;
