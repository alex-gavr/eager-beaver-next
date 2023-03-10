import { FC } from 'react';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { FlexCCC } from '../../StyledMain';

export const StyledPopUp = styled(FlexCCC)((props) =>({
    width: '100%',
    zIndex: 2,
    gap: '0.5rem',
    '& > h1': {
        backgroundColor: props.theme.colors.secondaryDark,
        fontSize: 'clamp(1.4rem, 1.0258rem + 1.8144vw, 2.2rem)',
        color: props.theme.colors.white,
        padding: '0.5rem 1rem',
        borderRadius: '2rem',
        marginInline: '1rem',
        textAlign: 'center',
    },
    '& > p': {
        fontSize: 'clamp(0.8rem, 0.3918rem + 1.9794vw, 1.5rem)',
        color: props.theme.colors.primaryDark,
        letterSpacing: '0.05rem',
        textAlign: 'center',
        padding: '0.5rem',
        marginInline: '1rem',
        borderRadius: '2rem',
    }
}))

const FormPopUpSubmitSuccess: FC = () => {
    const name = Cookies.get('name');

    return (
        <StyledPopUp>
            <h1>Благодарим за заявку{name ? `, ${name}` : null}!</h1>
            <p>В ближайшее время с вами свяжутся</p>
        </StyledPopUp>
    );
};
export default FormPopUpSubmitSuccess;
