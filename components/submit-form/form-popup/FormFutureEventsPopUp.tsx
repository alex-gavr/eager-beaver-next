import React from 'react';
import SubmitForm from '../submit-form';
import styled from 'styled-components';

const StyledWrapper = styled.div((props) =>({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    gap: '1rem',
    '& > h2': {
        color: props.theme.colors.title,
        textAlign: 'center'
    }
}))

const PopUpForm = () => {
    return (
        <StyledWrapper>
            <h2>Позвольте связаться с Вами для подтверждения записи</h2>
            {/* <SubmitForm flexDirection='column' /> */}
        </StyledWrapper>
    );
};

export default PopUpForm;
