import { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toggleHeight } from '../../utils/motion-animations';
import downArrow from '../../images/icons/downArrow.svg';
import styled from 'styled-components';
import Image from 'next/image';

interface Props {
    question: string;
    answer: string;
}

const WrapperContainer = styled(motion.div)((props) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '2rem',
    width: '100%',
    padding: '2rem',
    backgroundColor: props.theme.colors.background,
    boxShadow: '1px 1px 20px 10px rgba(0, 0, 0, 0.2)',
    ' & > p': {
        letterSpacing: '0.03rem',
    },
}));

const QuestionContainer = styled(motion.div)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    '& > h3': {
        textAlign: 'center',
        width: '90%',
        '@media only screen and (min-width:50em)': {
            textAlign: 'left',
            width: '100%',
        },
    },
});
const IconContainer = styled.div({
    marginLeft: '1rem',
    padding: '0.2rem',
    '@media only screen and (min-width:50em)': {
        padding: '1rem',
    },
});

export const FAQComponent: FC<Props> = ({ question, answer }): JSX.Element => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <WrapperContainer>
            <QuestionContainer onClick={handleToggle}>
                <h3>{question}</h3>
                <IconContainer>
                    <Image
                        src={downArrow}
                        alt=''
                        style={{
                            transform: open ? 'rotate(540deg)' : 'rotate(0deg)',
                            transition: 'transform 0.5s ease-in-out',
                        }}
                    />
                </IconContainer>
            </QuestionContainer>
            <AnimatePresence mode='wait' >
                {open && (
                    <motion.p
                        variants={toggleHeight}
                        initial={toggleHeight.hidden}
                        animate={toggleHeight.visible}
                        exit={toggleHeight.exit}>
                        {answer}
                    </motion.p>
                )}
            </AnimatePresence>
        </WrapperContainer>
    );
};
