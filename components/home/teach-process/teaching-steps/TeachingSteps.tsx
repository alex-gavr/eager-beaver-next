// import styles from './teaching-steps.module.css';
import { motion } from 'framer-motion';
import { Button } from '../../../buttons/button';
import { useEffect, useState } from 'react';
import { useWindowSize } from '../../../../utils/use-window-size';
import styled, { useTheme } from 'styled-components';
// import ym from 'react-yandex-metrika';

const Wrapper = styled.div({
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    width: '100%',
});

const StepsContainer = styled(motion.div)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
});
const TheStepContainer = styled(motion.div)((props) => ({
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    minWidth: '300px',
    height: 'fit-content',
    backgroundColor: props.theme.colors.textGreenLight,
    padding: '1rem',
    borderRadius: '2rem',
    gap: '0.5rem',
    boxShadow: '1px 1px 10px 5px rgba(0, 0, 0, 0.2)',
    ' & > p': {
        textTransform: 'lowercase',
    },
}));

const TheStepHead = styled.div((props) => ({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    '& > h2': {
        fontSize: props.theme.fontSize.subHeading,
        color: props.theme.colors.title,
        backgroundColor: props.theme.colors.textYellowMedium,
        padding: '0.2rem 1rem',
        borderRadius: '2rem',
        textTransform: 'uppercase',
        '@media only screen and (min-width: 50em)': {
            fontSize: props.theme.fontSize.subSubHeading,
            padding: '0rem 1rem',
        },
    },
    '& > p': {
        fontSize: '0.8rem',
        '@media only screen and (min-width: 50em)': {
            fontSize: '1rem',
        },
    },
}));

const TeachingSteps = () => {
    const theme = useTheme();
    const { width } = useWindowSize();
    const [step, setStep] = useState<number>(1);
    const [buttonText, setButtonText] = useState('так, и что дальше?');

    const handleClick = () => {
        if (step === 1) {
            setStep(2);
            setButtonText('Логично, продолжай');
            // ym('reachGoal','teachingStep2');
        } else if (step === 2) {
            setStep(3);
            setButtonText('Продолжай');
            // ym('reachGoal','teachingStep3');
        } else if (step === 3) {
            setStep(4);
            setButtonText('Ага, а дальше?');
            // ym('reachGoal','teachingStep4');
        } else if (step === 4) {
            setStep(5);
            setButtonText('Понятно, на это все?');
            // ym('reachGoal','teachingStep5');
        } else if (step === 5) {
            setButtonText('Ждем Вас ❤️');
            // ym('reachGoal','teachingChangeColor');
        }
    };

    interface ISteps {
        step: number;
        title: string;
        description: string;
    }

    const data: ISteps[] = [
        {
            step: 1,
            title: 'Запись на пробное занятие',
            description: 'необходимо записаться на пробное занятие онлайн или оффлайн на сайте, в любом удобном мессенджере или по телефону',
        },
        {
            step: 2,
            title: 'Знакомство с ребенком',
            description:
                'далее мы проводим первый пробный урок, на котором знакомимся с ребенком, узнаем друг друга поближе, определяем уровень владения языком, выявляем пробелы и обозначаем цели обучения',
        },
        {
            step: 3,
            title: 'Формат занятий',
            description: 'выбираем удобный формат занятий - в группе или индивидуально, онлайн или оффлайн',
        },
        {
            step: 4,
            title: 'программа обучения',
            description: 'прописываем программу обучения на ближайшее полугодие в соответствии с поставленными целями и уровнем владения языком',
        },
        {
            step: 5,
            title: 'путешествие начинается',
            description:
                'начинаем наше путешествие в невероятный мир изучения языка. Попутно знакомимся с его культурой с помощью наших мастер-классов, осваиваем грамматику, которая не давалась раньше, и много разговариваем, тренируя навыки произношения, в конце концов преодолевая разговорный барьер.',
        },
    ];

    const heightMobile = 190;
    const heightTablet = 170;
    const heightDesktop = 200;
    const transform = 65;

    const handleChangeStep = (step: number) => {
        setStep(step);
    };

    return (
        <Wrapper>
            <StepsContainer
                style={
                    width < 400
                        ? {
                              height:
                                  step === 1
                                      ? `${heightMobile}px`
                                      : step === 2
                                      ? `${heightMobile + transform * 1.2}px`
                                      : step === 3
                                      ? `${heightMobile + transform * 1.4}px`
                                      : step === 4
                                      ? `${heightMobile + transform * 2.7}px`
                                      : `${heightMobile + transform * 5.1}px`,
                          }
                        : width < 800
                        ? {
                              height:
                                  step === 1
                                      ? `${heightTablet}px`
                                      : step === 2
                                      ? `${heightTablet + transform * 1.2}px`
                                      : step === 3
                                      ? `${heightTablet + transform * 1.7}px`
                                      : step === 4
                                      ? `${heightTablet + transform * 3}px`
                                      : `${heightTablet + transform * 5}px`,
                          }
                        : {
                              height:
                                  step === 1
                                      ? `${heightDesktop}px`
                                      : step === 2
                                      ? `${heightDesktop + transform * 1.2}px`
                                      : step === 3
                                      ? `${heightDesktop + transform * 1.7}px`
                                      : step === 4
                                      ? `${heightDesktop + transform * 3}px`
                                      : `${heightDesktop + transform * 5}px`,
                          }
                }>
                {data.map((data, index) => {
                    return (
                        <TheStepContainer
                            key={index}
                            onClick={() => handleChangeStep(data.step)}
                            style={{
                                backgroundColor:
                                    buttonText === 'Ждем Вас ❤️'
                                        ? theme.colors.textGreenLight
                                        : step === index + 1
                                        ? theme.colors.textGreenLight
                                        : theme.colors.textYellowDark,
                            }}
                            animate={
                                step > index
                                    ? {
                                          scale: (index + 50) * 0.018,
                                          opacity: 1,
                                          zIndex: index + 1,
                                          y: index * transform,
                                          z: index * 2 * transform,
                                      }
                                    : {
                                          opacity: 0,
                                          zIndex: 0 - index,
                                          scale: 0.5,
                                      }
                            }
                            transition={{
                                duration: 0.5,
                                ease: 'easeInOut',
                            }}>
                            <TheStepHead>
                                <h2>Шаг {index + 1}</h2>
                                <p>{step === 5 ? data.title : step === index + 1 ? null : data.title}</p>
                            </TheStepHead>
                            <p>{data.description}</p>
                        </TheStepContainer>
                    );
                })}
            </StepsContainer>
            <Button type='primary' typeHTML='button' disabled={false} onClick={handleClick}>
                {buttonText}
            </Button>
        </Wrapper>
    );
};

export default TeachingSteps;
