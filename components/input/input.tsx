import React, { useCallback, useMemo, useRef } from 'react';
// import clsx from 'clsx';
import { useState } from 'react';
import * as Icons from '../icons';
// import './input.css';
import { TICons } from '../icons';
import styled from 'styled-components';

const StyledPlaceholder = styled.label((props) => ({
    display: 'block',
    position: 'absolute',
    cursor: 'inherit',
    top: '18px',
    textAlign: 'left',
    color: props.theme.colors.paragraph,
    transition: '0.3s',
    // '&:focus, &:active, &:hover': {
    //     top: 0,
    //     border: `2px solid ${props.theme.colors.textYellowDark}`,
    //     backgroundColor: 'white',
    //     padding: '0.2rem',
    //     transform: 'translateY(-20px)',
    //     color: props.theme.colors.textGreenDark,
    // },
}));
const InputContainer = styled.div((props) => ({
    width: 'fit-content',
    textAlign: 'left',
}));
const StyledInput = styled.input((props) => ({
    display: 'block',
    cursor: 'inherit',
    backgroundColor: 'transparent',
    border: 'none',
    width: '100%',
    color: props.theme.colors.title,
    marginTop: '16px',
    letterSpacing: '0.07rem',
    '&:focus-within': {
        outline: 'none',
    },
    '&:-webkit-autofill': {
        boxShadow: `0 0 0 30px ${props.theme.colors.primaryLight} inset !important`,
    },
    '&:-webkit-autofill:hover': {
        boxShadow: `0 0 0 30px ${props.theme.colors.primaryLight} inset !important`,
    },
    '&:-webkit-autofill:focus': {
        boxShadow: `0 0 0 30px r${props.theme.colors.primaryLight}ed inset !important`,
    },
}));
const InputInnerContainer = styled.div<any>((props) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    backgroundColor: props.theme.colors.background,
    border: `2px solid ${props.theme.colors.primaryDark}`,
    borderRadius: '1rem',
    transition: '0.3s',
    position: 'relative',
    boxShadow: '2px 2px 20px 5px rgba(0, 0, 0, 0.2)',
    fontFamily: 'var(--ff-heading)',
    minHeight: '64px',
    width: 'clamp(16.875rem, 12.8205rem + 19.6581vw, 31.25rem);',
    paddingInline: '1rem',
    '&:hover, &:focus-within, &active': {
        paddingInline: '1rem',
        boxShadow: `0 0 0 2px ${props.theme.colors.primaryDark} inset`,
    },
    '&:focus-within, &:hover': {
        [StyledPlaceholder]: {
            top: 0,
            border: `2px solid ${props.theme.colors.primaryDark}`,
            backgroundColor: props.theme.colors.background,
            padding: '0.2rem',
            transform: 'translateY(-20px)',
            color: props.theme.colors.secondaryDark,
        },
    },
    [StyledPlaceholder]: props.value && {
        top: 0,
        border: `2px solid ${props.theme.colors.primaryDark}`,
        backgroundColor: props.theme.colors.background,
        padding: '0.2rem',
        transform: 'translateY(-20px)',
        color: props.theme.colors.secondaryDark,
    },
}));

const ErrorMessage = styled.p((props) => ({
    marginLeft: '24px',
    marginTop: '5px',
    color: props.theme.colors.error,
}));

export interface TInputInterface extends Omit<React.HTMLProps<HTMLInputElement>, 'size'> {
    value: string;
    type?: 'text' | 'email' | 'password' | 'tel';
    placeholder?: string;
    success?: boolean;
    error?: boolean | null;
    disabled?: boolean;
    icon?: keyof TICons;
    errorText?: string;
    extraClass?: string;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onIconClick?(e: React.MouseEvent<HTMLDivElement>): void;
    onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
    onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
}

function useCombinedRefs<T = HTMLElement>(...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>): React.MutableRefObject<T | null> {
    const targetRef = React.useRef<T>(null);
    React.useEffect(() => {
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(targetRef.current);
            } else if (ref != null) {
                (ref as React.MutableRefObject<T | null>).current = targetRef.current;
            }
        });
    }, [refs]);
    return targetRef;
}

export const Input = React.forwardRef<HTMLInputElement, TInputInterface>(
    (
        { type, placeholder, onChange, icon, onIconClick, success, error, value, errorText, disabled, onBlur, onFocus, extraClass = '', name },
        forwardedRef
    ) => {
        const [focus, setFocus] = useState(false);
        const innerRef = useRef<HTMLInputElement | null>(null);
        const ref = useCombinedRefs<HTMLInputElement>(innerRef, forwardedRef);

        const handleInputFocus = useCallback(
            (e?: React.FocusEvent<HTMLInputElement>) => {
                setFocus(true);
                if (typeof onFocus === 'function') {
                    onFocus(e);
                }
            },
            [setFocus, onFocus]
        );

        const forceFocus = useCallback(() => {
            ref?.current?.focus();
        }, [ref]);

        const handleInputBlur = useCallback(
            (e?: React.FocusEvent<HTMLInputElement>) => {
                setFocus(false);
                if (typeof onBlur === 'function') {
                    onBlur(e);
                }
            },
            [setFocus, onBlur]
        );

        const onIconClickProxy = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                if (typeof onIconClick === 'function') {
                    onIconClick(e);
                } else {
                    forceFocus();
                }
            },
            [onIconClick, forceFocus]
        );

        const iconToRender = useMemo(() => {
            const Icon = icon && Icons[icon];
            const hasAction = typeof onIconClick === 'function';
            const dumbIcon = disabled && !hasAction;

            return Icon ? (
                <div onClick={onIconClickProxy}>
                    <Icon type={dumbIcon ? 'secondary' : 'primary'} />
                </div>
            ) : null;
        }, [icon, onIconClickProxy, disabled, onIconClick]);

        const onWrapperClick = useCallback(() => {
            forceFocus();
        }, [forceFocus]);

        const errorToRender = useMemo(() => error && errorText && <ErrorMessage>{errorText}</ErrorMessage>, [error, errorText]);

        return (
            <InputContainer>
                <InputInnerContainer onClick={onWrapperClick} value={value}>
                    <StyledPlaceholder htmlFor={type}>{placeholder}</StyledPlaceholder>
                    <StyledInput
                        minLength={2}
                        required
                        maxLength={15}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onChange={onChange}
                        type={type}
                        name={name}
                        ref={ref}
                        value={value}
                        disabled={disabled}
                    />
                    {iconToRender}
                </InputInnerContainer>
                {errorToRender}
            </InputContainer>
        );
    }
);

Input.displayName = 'Input';
