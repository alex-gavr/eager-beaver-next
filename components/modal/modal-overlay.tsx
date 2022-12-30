import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';



interface Props {
    children: ReactNode;
    onClose: () => void;
}

export const ModalOverlay: FC<Props> = ({ children, onClose }): JSX.Element => {
    return (
        <StyledModalOverlay onClick={onClose}>
            {children}
        </StyledModalOverlay>
    );
};
