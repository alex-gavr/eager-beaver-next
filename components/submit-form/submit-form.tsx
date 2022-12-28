import React, { useEffect, useState } from 'react';
import { Button } from '../buttons/button';
import { Input, TInputInterface } from '../input/input';
import { useWindowSize } from '../../utils/use-window-size';
import { formatPhoneNumber } from '../../utils/format-phone-number';
import { submitFormDataToTelegram } from '../../services/telegramSlice';
import { useAppDispatch, useAppSelector } from '../../services/hook';
import Cookies from 'js-cookie';
import { resetSubmitIntention } from '../../services/buttonSlice';
import { PreloaderSmall } from '../preloader/preloader-small';
import { formSubmit } from '../../services/userSlice';
import styled from 'styled-components';
import { IDeviceType } from '../../types/data';

const StyledForm = styled.form({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    width: '90%',
    '@media only screen and (min-width: 50em)': {
        width: '100%'
    }
});
const ButtonContainer = styled.div({
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    '@media only screen and (min-width: 50em)': {
        flexDirection: 'row'
    }
});
const Disclaimer = styled.p({
    fontSize: '0.7rem',
    textAlign: 'center',
});
const SuccessMessage = styled.p({
    color: 'green'
})
const FailureMessage = styled.p((props) =>({
    color: props.theme.colors.error
}));

type FlexDirection = 'column' | 'inherit' | '-moz-initial' | 'initial' | 'revert' | 'unset' | 'column-reverse' | 'row' | 'row-reverse' | undefined;
interface IProps extends IDeviceType {
    flexDirection?: FlexDirection;
}

const SubmitForm = ({ flexDirection, isMobileOnly, isTablet, isDesktop }: IProps) => {
    const dispatch = useAppDispatch();
    const { submitSuccess, error, loading } = useAppSelector((state) => state.telegram);
    const name = Cookies.get('name');

    // const { width } = useWindowSize();

    const [values, setValues] = useState({
        name: '',
        tel: '',
    });

    const [isInputFocused, setIsInputFocused] = useState(false);

    // const [emailError, setEmailError] = useState<boolean | null>(null);
    const [phoneError, setPhoneError] = useState<boolean | null>(null);
    const [phonePlaceholderText, setPhonePlaceholderText] = useState('Телефон');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'tel') {
            setPhoneError(null);
            const formattedPhoneNumber = formatPhoneNumber(e.target.value);
            setValues({ ...values, [e.target.name]: formattedPhoneNumber });
            setPhonePlaceholderText('Телефон без +7');
        } else {
            setValues({ ...values, [e.target.name]: e.target.value });
        }
    };

    const handleValidatePhone = () => {
        if (!values.tel) {
            setPhoneError(null);
            return;
        }
        if (values.tel.length !== 15 || parseInt(values.tel.charAt(1)) !== 9) {
            setPhoneError(true);
        } else if (values.tel.length === 15 && parseInt(values.tel.charAt(1)) === 9) {
            setPhoneError(false);
        }
    };

    // PHONE VALIDATION AND PHONE PLACEHOLDER NAME TOGGLE
    const handlePhoneValidationAndPlaceholderNameChange = () => {
        setIsInputFocused(!isInputFocused);
        if (phonePlaceholderText === 'Телефон') {
            setPhonePlaceholderText('Телефон без +7');
        } else {
            setPhonePlaceholderText('Телефон');
            handleValidatePhone();
        }
    };

    const handleValidateAll = () => {
        setIsInputFocused(false);
        if (values.name && values.tel) {
            handleValidatePhone();
        }
    };

    const handleChangeFocusStatus = () => {
        setIsInputFocused(true);
    };

    interface Inputs extends TInputInterface {
        id: string;
    }

    const inputs: Inputs[] = [
        {
            id: '1',
            value: values.name,
            name: 'name',
            type: 'text',
            placeholder: 'Имя',
            error: false,
            errorText: 'Ошибка',
            size: isMobileOnly ? 'extraSmall' : isTablet ? 'small' : 'default',
            icon: 'ProfileIcon',
            onChange: handleChange,
            onFocus: handleChangeFocusStatus,
            onBlur: handleValidateAll,
        },
        {
            id: '2',
            value: values.tel,
            name: 'tel',
            type: 'tel',
            placeholder: phonePlaceholderText,
            error: phoneError,
            errorText: 'Пожалуйста, введите корректный телефон',
            size: isMobileOnly ? 'extraSmall' : isTablet ? 'small' : 'default',
            icon: 'InfoIcon',
            onChange: handleChange,
            onFocus: handlePhoneValidationAndPlaceholderNameChange,
            onBlur: handlePhoneValidationAndPlaceholderNameChange,
        },
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Cookies.set('name', values.name, { expires: 7, path: '/', secure: true, sameSite: 'Lax' });
        dispatch(resetSubmitIntention());
        dispatch(submitFormDataToTelegram(values));
        dispatch(formSubmit(values));
        setValues({
            name: '',
            tel: '',
        });
        setPhoneError(null);
    };

    return (
        <>
            <StyledForm onSubmit={(e) => handleSubmit(e)}>
                {inputs.map((input) => (
                    <Input
                        key={input.id}
                        value={input.value}
                        name={input.name}
                        type={input.type}
                        placeholder={input.placeholder}
                        icon={input.icon}
                        size={input.size}
                        error={input.error}
                        errorText={input.errorText}
                        onChange={input.onChange}
                        onFocus={input.onFocus}
                        onBlur={input.onBlur}
                    />
                ))}
                <ButtonContainer style={{ flexDirection: flexDirection }}>
                    <Button
                        typeHTML='submit'
                        type='primary'
                        disabled={!values.name || !values.tel || phoneError || phoneError === null ? true : false}
                        animate={true}
                        isInputFocused={isInputFocused}>
                        {loading ? <PreloaderSmall /> : 'Записаться'}
                    </Button>
                    <Disclaimer>Нажимая кнопку, вы даёте согласие на обработку своих персональных данных</Disclaimer>
                </ButtonContainer>
                {submitSuccess && <SuccessMessage> Спасибо! Скоро с Вами свяжутся, {name} </SuccessMessage>}
                {submitSuccess === false || (error && <FailureMessage> Произошла ошибка 😢 {name}, попробуйте, пожалуйста, снова</FailureMessage>)}
            </StyledForm>
        </>
    );
};
export default SubmitForm;
