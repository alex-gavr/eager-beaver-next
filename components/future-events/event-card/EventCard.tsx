import { useEffect, useState } from 'react';
import { addParticipant } from '../../../services/futureEventsSlice';
import { useAppDispatch, useAppSelector } from '../../../services/hook';
import { Button } from '../../buttons/button';
import { AnimatePresence } from 'framer-motion';
import { toggleHeight } from '../../../utils/motion-animations';
import { PreloaderSmall } from '../../preloader/preloader-small';
import Moment from 'react-moment';
import 'moment/locale/ru';
import moment from 'moment';
import downArrow from '../../../images/icons/downArrow.svg';
import { onOpenModal } from '../../../services/modalSlice';
import { setDetails } from '../../../services/futureEventSignUpData';
import { resetEnrolledToFutureEvent } from '../../../services/telegramSlice';
import Image from 'next/image';
import {
    InnerContainer,
    InnerContainerDetails,
    MonthAndTimeContainer,
    SpaceBetween,
    StyledCard,
    StyledDateNumber,
    TitleAndAgeContainer,
    TogglerContainer,
} from './EventCardsStyles';

interface IProps {
    title: string;
    description: string;
    age: string;
    participants: number;
    total_spots: number;
    price: string;
    start: string;
    end: string;
    page_id: string;
}

const EventCard = ({ title, description, age, participants, total_spots, price, start, end, page_id }: IProps) => {
    const { longLoading } = useAppSelector((state) => state.futureEvents);
    const { enrolledToFutureEvent } = useAppSelector((state) => state.telegram);
    const [enrolled, setEnrolled] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [enrolledDataOptions, setEnrolledDataOptions] = useState({
        page_id: '',
        members: 0,
    });
    const dispatch = useAppDispatch();

    Moment.globalLocale = 'ru';

    // Duration calculations
    const startingTime = moment(start).format('LT');
    const endingTime = moment(end).format('LT');
    const startingTime1 = moment(startingTime, 'LT');
    const endingTime1 = moment(endingTime, 'LT');
    const diff = endingTime1.diff(startingTime1, 'm');
    const minutesEachHourInOneDay = [
        60,
        60 * 2,
        60 * 3,
        60 * 4,
        60 * 5,
        60 * 6,
        60 * 7,
        60 * 8,
        60 * 9,
        60 * 10,
        60 * 11,
        60 * 12,
        60 * 13,
        60 * 14,
        60 * 15,
        60 * 16,
        60 * 17,
        60 * 18,
        60 * 19,
        60 * 20,
        60 * 21,
        60 * 22,
        60 * 23,
        60 * 24,
    ];
    const isFullHour = minutesEachHourInOneDay.some((i) => i === diff);
    const hours = moment.duration(diff, 'minutes').hours();
    const minutes = moment.duration(diff, 'minutes').minutes();
    const durationName = hours === 1 ? 'час' : hours > 4 ? 'часов' : 'часа';

    let duration = null;
    if (isFullHour) {
        duration = `${hours} ${durationName}`;
    } else if (hours === 0) {
        duration = `${minutes} минут`;
    } else if (!isFullHour && hours > 0) {
        duration = `${hours} ${durationName} ${minutes} минут`;
    }

    // Spots Left
    const spotsLeft = total_spots - participants;

    // Month
    const dateFull = moment(start).format('LL');
    const dateFullSplit = dateFull.split(' ');
    const month = dateFullSplit[1];

    const [open, setOpen] = useState(false);

    const handleClick = (title: string, age: string, participants: number, dateFull: string, page_id: string) => {
        const values = {
            title,
            age,
            dateFull,
        };
        dispatch(setDetails(values));
        dispatch(onOpenModal());
        dispatch(resetEnrolledToFutureEvent());
        const members = participants + 1;
        setEnrolledDataOptions({
            page_id: page_id,
            members: members,
        });
    };

    useEffect(() => {
        if (enrolledToFutureEvent && !enrolled && enrolledDataOptions.members > 0) {
            setButtonLoading(true);
            setEnrolled(true);
            dispatch(addParticipant(enrolledDataOptions));
        }
    }, [enrolledToFutureEvent, enrolled, enrolledDataOptions]);

    useEffect(() => {
        if (!longLoading) {
            setButtonLoading(false);
        }
    }, [longLoading]);

    return (
        <StyledCard>
            <StyledDateNumber>
                <Moment format='DD'>{start}</Moment>
            </StyledDateNumber>
            <MonthAndTimeContainer>
                <span>{month}</span>
                <Moment element={'span'} format='LT'>
                    {start}
                </Moment>
            </MonthAndTimeContainer>
            <TitleAndAgeContainer>
                <h2>{title}</h2>
                {open ? null : <p>{age}</p>}
            </TitleAndAgeContainer>
            <AnimatePresence initial={false} mode={'wait'}>
                {open ? (
                    <InnerContainer variants={toggleHeight} initial={toggleHeight.hidden} animate={toggleHeight.visible}>
                        <p>{description}</p>
                        <InnerContainerDetails>
                            <p> Возраст - {age}</p>
                            <p>Продолжительность - {duration}</p>
                            <p> Количество мест - {total_spots}</p>
                            <p>
                                Стоимость - <span>{price}</span>
                            </p>
                        </InnerContainerDetails>
                        <SpaceBetween>
                            <p> Еще свободно {spotsLeft} мест </p>
                            <Button
                                type='emptyPrimary'
                                typeHTML='button'
                                textColor='black'
                                padding='0.5rem 0.9rem'
                                fontFamily='var(--ff-body)'
                                onClick={() => handleClick(title, age, participants, dateFull, page_id)}
                                disabled={enrolled || spotsLeft === 0}>
                                {buttonLoading ? <PreloaderSmall /> : enrolled ? 'Ждем вас!' : spotsLeft === 0 ? 'Мест больше нет' : 'Приведу ребенка'}
                            </Button>
                        </SpaceBetween>
                    </InnerContainer>
                ) : null}
            </AnimatePresence>
            <TogglerContainer onClick={() => setOpen((prev) => !prev)}>
                <Image
                    src={downArrow}
                    alt=''
                    style={{
                        transform: open ? 'rotate(540deg)' : 'rotate(0deg)',
                        transition: 'transform 0.5s ease-in-out',
                    }}
                />
            </TogglerContainer>
        </StyledCard>
    );
};

export default EventCard;
