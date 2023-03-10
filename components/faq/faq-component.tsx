import { FC, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { toggleHeight } from '../../utils/motion-animations';
import styled from 'styled-components';
import Image from 'next/image';
import { FlexCCC } from '../StyledMain';

interface Props {
    question: string;
    answer: string;
}

const WrapperContainer = styled(FlexCCC)((props) => ({
    borderRadius: '2rem',
    width: '100%',
    padding: '2rem',
    backgroundColor: props.theme.colors.componentBackground,
    boxShadow: '1px 1px 20px 10px rgba(0, 0, 0, 0.2)',
    ' & > p': {
        letterSpacing: '0.03rem',
        color: props.theme.colors.paragraph,
        textTransform: 'lowercase',
    },
}));

const QuestionContainer = styled(FlexCCC)((props) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    '& > h3': {
        textAlign: 'center',
        width: '90%',
        color: props.theme.colors.title,
        '@media only screen and (min-width:50em)': {
            textAlign: 'left',
            width: '100%',
        },
    },
}));
const IconContainer = styled.div({
    marginLeft: '1rem',
    padding: '0.2rem',
    '@media only screen and (min-width:50em)': {
        padding: '1rem',
    },
});

const FAQComponent: FC<Props> = ({ question, answer }): JSX.Element => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <WrapperContainer onClick={handleToggle}>
            <QuestionContainer>
                <h3>{question}</h3>
                <IconContainer>
                    <Image
                        src={'/downArrow.svg'}
                        width={30}
                        height={20}
                        alt=''
                        style={{
                            transform: open ? 'rotate(540deg)' : 'rotate(0deg)',
                            transition: 'transform 0.5s ease-in-out',
                        }}
                    />
                </IconContainer>
            </QuestionContainer>
            <AnimatePresence mode='wait'>
                {open && (
                    <m.p variants={toggleHeight} initial={toggleHeight.hidden} animate={toggleHeight.visible} exit={toggleHeight.exit}>
                        {answer}
                    </m.p>
                )}
            </AnimatePresence>
        </WrapperContainer>
    );
};
export default FAQComponent;
