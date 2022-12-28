import SubmitForm from './submit-form';
import styled from 'styled-components';

const StyledDiv = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
});

const StyledTitle = styled.h2({
    textAlign: 'center',
    fontSize: `clamp(1rem, 0.6296rem + 1.8519vw, 2.25rem)`,
});
const StyledSpanAccent = styled.span({
    color: 'var(--clr-accent-600)',
    backgroundColor: 'var(--clr-primary-400)',
    padding: '1rem',
    borderRadius: '2rem',
    marginLeft: '5px',
});

export const ModalSubmit = () => {
    return (
        <StyledDiv>
            <StyledTitle>
                Пробное Занятие
                <StyledSpanAccent>Бесплатно</StyledSpanAccent>
            </StyledTitle>
            {/* <SubmitForm flexDirection='column' /> */}
        </StyledDiv>
    );
};
