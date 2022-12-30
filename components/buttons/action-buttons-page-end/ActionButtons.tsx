import { useRouter } from 'next/router'
import { Button, ICustomButton } from '../button';
import styled from 'styled-components';
import { useAppDispatch } from '../../../services/hook';
import { onOpenModalForm } from '../../../services/modalSlice';

const ButtonsContainer = styled.div({
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: '2rem',
    zIndex: 2,
    '@media only screen and (min-width: 500px)': {
        flexFlow: 'row nowrap',
    }
})

interface IProps {
    primaryButtonStyle: ICustomButton['type'];
    secondaryButtonStyle: ICustomButton['type'];
    showBackButton: boolean;
    fontSize?: string;
    padding?: string;
}

const ActionButtons = ({ primaryButtonStyle, secondaryButtonStyle, showBackButton, fontSize, padding }: IProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleGetFreeTrial = () => {
        dispatch(onOpenModalForm());
    };

    return (
        <ButtonsContainer>
            <Button type={primaryButtonStyle} typeHTML='button' disabled={false} fontSize={fontSize} padding={padding} onClick={handleGetFreeTrial}>
                Пробное занятие бесплатно
            </Button>
            {showBackButton && (
                <Button type={secondaryButtonStyle} typeHTML='button' disabled={false} onClick={() => router.back()}>
                    Назад
                </Button>
            )}
        </ButtonsContainer>
    );
};

export default ActionButtons;
