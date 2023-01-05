import { useEffect, FC, KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { useAppSelector } from '../../services/hook';
import { CloseIcon } from '../icons';
import { PreloaderSmall } from '../preloader/preloader-small';
import styled from 'styled-components';
import { FlexCCC } from '../StyledMain';

interface IModalContainer {
    $closeButton: boolean;
}

const StyledModalOverlay = styled(FlexCCC)({
    backgroundColor: 'rgba(0, 0, 0, .6)',
    position: 'fixed',
    overflow: 'hidden',
    zIndex: 1000,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
});
const ModalContainer = styled(FlexCCC)<IModalContainer>((props) => ({
    width: '90%',
    maxWidth: '650px',
    backgroundColor: props.theme.colors.componentBackground,
    backgroundImage: props.$closeButton ? props.theme.colors.modalGradient : 'none',
    position: 'relative',
    borderRadius: '2rem',
    zIndex: 1001,
    overflow: 'hidden',
    padding: props.$closeButton ? '4rem 1rem 1rem 1rem' : '2rem 0.5rem',
}));

const IconContainer = styled.div({
    padding: '1.5rem',
    zIndex: 1001,
    position: 'absolute',
    top: 0,
    right: 0,
});

interface Props {
    children: React.ReactNode;
    closeButton: boolean;
    onClose: () => void;
}

const Modal: FC<Props> = ({ children, closeButton, onClose }): JSX.Element | null => {
    const { isModalOpen } = useAppSelector((state) => state.modal);

    // CLOSE IF ESCAPE KEY PRESSED
    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? onClose() : null);

        if (isModalOpen) {
            document.body.addEventListener('keydown', closeOnEscapeKey as () => void);
            return () => {
                document.body.removeEventListener('keydown', closeOnEscapeKey as () => void);
            };
        }
    }, [isModalOpen]);

    if (!isModalOpen) return null;

    return createPortal(
        <StyledModalOverlay onClick={onClose}>
            <ModalContainer
                $closeButton={closeButton}
                onClick={(e) => {
                    e.stopPropagation();
                }}>
                {closeButton && (
                    <IconContainer onClick={onClose}>
                        <CloseIcon type='primary' />
                    </IconContainer>
                )}
                {children ? children : <PreloaderSmall />}
            </ModalContainer>
        </StyledModalOverlay>,
        document.getElementById('modal') as HTMLElement
    );
};

export default Modal;
