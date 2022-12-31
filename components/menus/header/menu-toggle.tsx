import React, { FC } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Toggle = styled.button((props) => ({
    outline: 'none',
    border: 'none',
    cursor: 'inherit',
    width: '100%',
    height: '100%',
    background: 'transparent',
    transform: 'translate(1px, 1px)',
    '& > svg ': {
        width: '30px',
        height: '30px',
    },
    '& > svg > path': {
        stroke: props.theme.colors.title,
    },
}));

const Path = (props: any) => <motion.path fill='transparent' strokeWidth='3' stroke='hsl(0, 0%, 18%)' strokeLinecap='round' {...props} />;

interface Props {
    toggle: () => void;
}

export const MenuToggle: FC<Props> = ({ toggle }) => (
    <Toggle onClick={toggle} type='button'>
        <svg width='23' height='23' viewBox='0 0 23 23'>
            <Path
                variants={{
                    closed: { d: 'M 2 2.5 L 20 2.5' },
                    open: { d: 'M 3 16.5 L 17 2.5' },
                }}
            />
            <Path
                d='M 2 9.423 L 20 9.423'
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
            />
            <Path
                variants={{
                    closed: { d: 'M 2 16.346 L 20 16.346' },
                    open: { d: 'M 3 2.5 L 17 16.346' },
                }}
            />
        </svg>
    </Toggle>
);
