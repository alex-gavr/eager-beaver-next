import React, { useEffect, useState } from 'react';
import { Button } from '../buttons/button';
import { Input, TInputInterface } from '../input/input';
import { formatPhoneNumber } from '../../utils/format-phone-number';
import { useAppDispatch, useAppSelector } from '../../services/hook';
import Cookies from 'js-cookie';
import { PreloaderSmall } from '../preloader/preloader-small';
import styled from 'styled-components';
import { onOpenModalFormSubmitSuccess } from '../../services/modalSlice';
import { v4 as uuid } from 'uuid';
import { initMemberCountChange } from '../../services/futureEventSignUpData';

const StyledForm = styled.form({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    width: '90%',
    '@media only screen and (min-width: 50em)': {
        width: '100%',
    },
});
const ButtonContainer = styled.div({
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    '@media only screen and (min-width: 50em)': {
        flexDirection: 'row',
    },
});
const Disclaimer = styled.p((props) => ({
    fontSize: '0.7rem',
    textAlign: 'center',
    color: props.theme.colors.paragraph,
}));

type FlexDirection = 'column' | 'inherit' | '-moz-initial' | 'initial' | 'revert' | 'unset' | 'column-reverse' | 'row' | 'row-reverse' | undefined;
interface IProps {
    flexDirection?: FlexDirection;
    setSubmitSuccess?: React.Dispatch<React.SetStateAction<boolean | null>>;
    setError?: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const SubmitForm = ({ flexDirection, setSubmitSuccess, setError }: IProps) => {
    const dispatch = useAppDispatch();
    const { isModalOpen } = useAppSelector((state) => state.modal);
    const { futureEventDetails } = useAppSelector((state) => state.futureEventDetails);
    const [loading, setLoading] = useState<boolean>(false);
    const name = Cookies.get('name');

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
            icon: 'InfoIcon',
            onChange: handleChange,
            onFocus: handlePhoneValidationAndPlaceholderNameChange,
            onBlur: handlePhoneValidationAndPlaceholderNameChange,
        },
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        Cookies.set('name', values.name, { expires: 7, path: '/', secure: true, sameSite: 'Lax' });

        // If user submits form for FutureEvent
        if (futureEventDetails) {
            const data = {
                name: values.name,
                tel: values.tel,
                event: futureEventDetails.title,
                age: futureEventDetails.age,
                date: futureEventDetails.dateFull,
            };
            setValues({
                name: '',
                tel: '',
            });
            setPhoneError(null);
            const JSONdata = JSON.stringify(data);
            const endpoint = '/api/form-submit';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSONdata,
            };
            const response = await fetch(endpoint, options);
            const result = await response.json();
            // Here Module is always open
            if (result.status === 500) {
                // ERROR
                if (setError) {
                    setError(true);
                }
            } else if (result.status === 200) {
                // SUCCESS
                if (setSubmitSuccess) {
                    setSubmitSuccess(true);
                }
                dispatch(initMemberCountChange());
            }
        }
        // If user submits for to contact them
        else {
            // Move data to another variable so we can clean setValues
            const id = uuid();
            const beaverCoins = 500;
            const email = 'we@donno.com';
            const data = {
                name: values.name,
                tel: values.tel,
                email: email,
                id: id,
                beaverCoins: beaverCoins,
            };
            setValues({
                name: '',
                tel: '',
            });
            setPhoneError(null);
            const JSONdata = JSON.stringify(data);
            const endpoint = '/api/form-submit';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSONdata,
            };
            const response = await fetch(endpoint, options);
            const result = await response.json();
            if (result.status === 500) {
                // ERROR
                if (isModalOpen && setError) {
                    setError(true);
                } else {
                    dispatch(onOpenModalFormSubmitSuccess(false));
                }
            } else if (result.status === 200) {
                // SUCCESS
                if (isModalOpen && setSubmitSuccess) {
                    setSubmitSuccess(true);
                } else {
                    dispatch(onOpenModalFormSubmitSuccess(true));
                }
            }
        }
        setLoading(false);
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
            </StyledForm>
        </>
    );
};
export default SubmitForm;
