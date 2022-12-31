import Head from 'next/head';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { IPrices } from '../../types/data';
import { GetServerSidePropsContext } from 'next';
// import SwiperCards from '../../components/prices/SwiperCards';
// import PageAnimation from '../../components/page-animation/PageAnimation';
import { StyledMain } from '../../components/StyledMain';
// import ActionButtons from '../../components/buttons/action-buttons-page-end/ActionButtons';
import { getSelectorsByUserAgent } from 'react-device-detect';
// import SidePopUp from '../../components/prices/side-popup/SidePopUp';
import { useAppDispatch, useAppSelector } from '../../services/hook';
import { onCloseModal } from '../../services/modalSlice';
// import Modal from '../../components/modal/modal';
// import FormPopUp from '../../components/submit-form/form-popup/FormPopUp';

const Modal = dynamic(() => import('../../components/modal/modal'));
const FormPopUp = dynamic(() => import('../../components/submit-form/form-popup/FormPopUp'));
const SidePopUp = dynamic(() => import('../../components/prices/side-popup/SidePopUp'));
const SwiperCards = dynamic(() => import('../../components/prices/SwiperCards'));
const ActionButtons = dynamic(() => import('../../components/buttons/action-buttons-page-end/ActionButtons'));
const PageAnimation = dynamic(() => import('../../components/page-animation/PageAnimation'));

const Wrapper = styled.section((props) => ({
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem 0.5rem',
    position: 'relative',
    minHeight: '70vh',
    '& > h1': {
        color: props.theme.colors.primaryDark,
        zIndex: 2,
    },
    '& > h2': {
        color: props.theme.colors.secondaryDark,
        marginBottom: '2rem',
        zIndex: 2,
        textAlign: 'center',
    },
    '@media only screen and (min-width:50em)': {
        padding: '2rem',
    },
}));
const SwiperContainer = styled.div({
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: '50vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3rem',
});
const YellowBG = styled.span((props) => ({
    position: 'absolute',
    height: '60%',
    width: '100vw',
    borderRadius: '40% 40% 0 0',
    bottom: 0,
    backgroundColor: props.theme.colors.primaryLight,
}));

export interface IFeature {
    text: string;
}

export interface IPricesAdjustedArray {
    mainArray: IPrices;
    features: IFeature[][];
}
[];

interface IProps {
    prices: IPrices[];
    isMobileOnly: boolean;
}
const Pricing = ({ prices, isMobileOnly }: IProps) => {
    const dispatch = useAppDispatch();
    const { isModalOpen, formFromModal } = useAppSelector((state) => state.modal);

    const handleCloseModal = () => {
        dispatch(onCloseModal());
    };

    const pricesAdjustedArray: IPricesAdjustedArray[] =
        prices &&
        prices.map((price: IPrices) => {
            const feature1 = price.feature1.rich_text.map((i) => {
                const text = i.plain_text;
                return {
                    text: text,
                };
            });
            const feature2 = price.feature2.rich_text.map((i) => {
                const text = i.plain_text;
                return {
                    text: text,
                };
            });
            const feature3 = price.feature3.rich_text.map((i) => {
                const text = i.plain_text;
                return {
                    text: text,
                };
            });
            return {
                mainArray: price,
                features: [feature1, feature2, feature3],
            };
        });

    return (
        <>
            <Head>
                <title>Тарифы</title>
                <meta name='description' content='Возможные варианты занятий с нами' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <StyledMain>
                <Wrapper>
                    <h1>Тарифы</h1>
                    <h2>выбирай подходящий и приходи учиться</h2>
                    <SwiperContainer>
                        <SwiperCards pricesAdjustedArray={pricesAdjustedArray} />
                    </SwiperContainer>
                    <ActionButtons primaryButtonStyle='secondary' secondaryButtonStyle='emptyPrimary' showBackButton={true} />
                    <YellowBG />
                </Wrapper>
                {!isMobileOnly && <SidePopUp />}
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
    const { isMobileOnly } = getSelectorsByUserAgent(userAgent);

    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Notion-Version': '2022-06-28',
            'content-type': 'application/json',
            Authorization: `${process.env.NEXT_PUBLIC_NOTION_KEY}`,
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
        const result = await fetch(`https://api.notion.com/v1/databases/${process.env.NEXT_PUBLIC_NOTION_PRICES_DB}/query`, options);
        const prices = await result.json().then((data) => data.results.map((data: any) => data.properties));
        return {
            props: {
                prices,
                isMobileOnly,
            },
        };
    } catch (err) {
        console.log(err);
    }
}

export default Pricing;
