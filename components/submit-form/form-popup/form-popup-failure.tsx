import { FC } from 'react';
import Cookies from 'js-cookie';
import { StyledPopUp } from './form-popup';

const FormSubmitFailPopUp: FC = () => {
    const name = Cookies.get('name');

    return (
        <StyledPopUp>
            <h1>Произошла ошибка{name ? `, ${name}` : null} 😭</h1>
            <p>Попробуйте, пожалуйста, снова!</p>
        </StyledPopUp>
    );
};
export default FormSubmitFailPopUp;