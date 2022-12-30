import React, { useState } from 'react';
import SubmitForm from '../submit-form';
import styled from 'styled-components';
import FormPopUpSubmitSuccess from './FormPopUpSubmitSuccess';
import FormPopUpSubmitFail from './FormSubmitFailPopUp';
import { Button } from '../../buttons/button';

const StyledWrapper = styled.div((props) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    gap: '1rem',
    '& > h2': {
        color: props.theme.colors.title,
        textAlign: 'center',
        '& > span': {
            color: props.theme.colors.secondaryDark,
            backgroundColor: props.theme.colors.primaryMedium,
            padding: '0.5rem 1rem',
            borderRadius: '2rem',
        },
    },
}));

interface IProps {
    futureEvents: boolean;
}

const FormPopUp = ({ futureEvents }: IProps) => {
    const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
    const [error, setError] = useState<boolean | null>(null);

    const handleAnotherTry = () => {
        setError(false);
    };
    return (
        <StyledWrapper>
            {submitSuccess ? (
                <FormPopUpSubmitSuccess />
            ) : error ? (
                <>
                    <FormPopUpSubmitFail />
                    <Button typeHTML='button' type='emptyPrimary' onClick={handleAnotherTry}>
                        попробовать еще раз
                    </Button>
                </>
            ) : (
                <>
                    {futureEvents ? (
                        <h2>Позвольте связаться с Вами для подтверждения записи</h2>
                    ) : (
                        <h2>
                            Пробное Занятие <span>Бесплатно</span>
                        </h2>
                    )}
                    <SubmitForm flexDirection='column' setSubmitSuccess={setSubmitSuccess} setError={setError} />
                </>
            )}
        </StyledWrapper>
    );
};

export default FormPopUp;
