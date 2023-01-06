import { m } from 'framer-motion';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const PrimaryButton = styled(m.button)((props) => ({
    border: '2px solid transparent',
    borderRadius: '1.85rem',
    color: props.theme.colors.black,
    backgroundColor: props.theme.colors.primaryDark,
    boxShadow: '0px 0.7em 1em rgba(0,0,0,0.25)',
    padding: '1em 2em',
    textDecoration: 'none',
    letterSpacing: '0.11rem',
    fontSize: props.theme.fontSize.button,
    textTransform: 'lowercase',
    fontFamily: 'var(--ff-heading)',
    '&:hover, &:focus-visible': {
        backgroundColor: props.theme.colors.secondaryLight,
        transition: 'all 0.3s ease-in-out',
    },
    '&:disabled': {
        pointerEvents: 'none',
    },
}));

const SecondaryButton = styled(PrimaryButton)((props) => ({
    backgroundColor: props.theme.colors.secondaryDark,
    '&:hover, &:focus-visible': {
        backgroundColor: props.theme.colors.primaryDark,
    },
}));

const EmptyPrimaryButton = styled(PrimaryButton)((props) => ({
    color: props.theme.colors.paragraph,
    backgroundColor: 'transparent',
    backdropFilter: 'blur(4px) saturate(220%)',
    border: `2px solid ${props.theme.colors.primaryMedium}`,
}));
const EmptySecondaryButton = styled(SecondaryButton)((props) => ({
    color: props.theme.colors.paragraph,
    backgroundColor: 'transparent',
    backdropFilter: 'blur(4px) saturate(220%)',
    border: `2px solid ${props.theme.colors.secondaryLight}`,
}));

export interface ICustomButton {
    typeHTML: 'button' | 'submit' | 'reset';
    type: 'primary' | 'secondary' | 'emptySecondary' | 'emptyPrimary';
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    textColor?: string;
    padding?: string;
    fontFamily?: string;
    fontSize?: string;
    animate?: boolean;
    isInputFocused?: boolean;
    width?: number | string;
    height?: number | string;
    placeSelf?: string;
}

const animation = {
    rotate: [0, 5, 0, -5, 0, 5, 0, -5, 0],
};
const transition = {
    duration: 0.5,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatDelay: 5,
};

const Button: FC<ICustomButton> = ({
    typeHTML,
    type,
    children,
    onClick,
    disabled,
    textColor,
    padding,
    fontFamily,
    fontSize,
    animate,
    isInputFocused,
    width,
    height,
    placeSelf,
}) => {
    return (
        <>
            {type === 'primary' && (
                <PrimaryButton
                    style={{
                        color: textColor,
                        padding: padding,
                        fontFamily: fontFamily,
                        fontSize: fontSize,
                        width: width,
                        height: height,
                        placeSelf: placeSelf,
                        borderColor: isInputFocused ? 'rgb(101, 164, 111)' : undefined,
                    }}
                    type={typeHTML}
                    onClick={onClick}
                    animate={animate ? animation : {}}
                    transition={animate ? transition : {}}
                    whileTap={{ scale: 0.8 }}
                    disabled={disabled}>
                    {children}
                </PrimaryButton>
            )}
            {type === 'secondary' && (
                <SecondaryButton
                    style={{
                        color: textColor,
                        padding: padding,
                        fontFamily: fontFamily,
                        fontSize: fontSize,
                        width: width,
                        height: height,
                        placeSelf: placeSelf,
                        borderColor: isInputFocused ? 'rgb(101, 164, 111)' : undefined,
                    }}
                    type={typeHTML}
                    onClick={onClick}
                    animate={animate ? animation : {}}
                    transition={animate ? transition : {}}
                    whileTap={{ scale: 0.8 }}
                    disabled={disabled}>
                    {children}
                </SecondaryButton>
            )}
            {type === 'emptyPrimary' && (
                <EmptyPrimaryButton
                    style={{
                        color: textColor,
                        padding: padding,
                        fontFamily: fontFamily,
                        fontSize: fontSize,
                        width: width,
                        height: height,
                        placeSelf: placeSelf,
                        borderColor: isInputFocused ? 'rgb(101, 164, 111)' : undefined,
                    }}
                    type={typeHTML}
                    onClick={onClick}
                    animate={animate ? animation : {}}
                    transition={animate ? transition : {}}
                    whileTap={{ scale: 0.8 }}
                    disabled={disabled}>
                    {children}
                </EmptyPrimaryButton>
            )}
            {type === 'emptySecondary' && (
                <EmptySecondaryButton
                    style={{
                        color: textColor,
                        padding: padding,
                        fontFamily: fontFamily,
                        fontSize: fontSize,
                        width: width,
                        height: height,
                        placeSelf: placeSelf,
                        borderColor: isInputFocused ? 'rgb(101, 164, 111)' : undefined,
                    }}
                    type={typeHTML}
                    onClick={onClick}
                    animate={animate ? animation : {}}
                    transition={animate ? transition : {}}
                    whileTap={{ scale: 0.8 }}
                    disabled={disabled}>
                    {children}
                </EmptySecondaryButton>
            )}
        </>
    );
};

export default Button;