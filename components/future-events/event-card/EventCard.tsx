import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../services/hook';
import Button from '../../buttons/button';
import { AnimatePresence } from 'framer-motion';
import { toggleHeight } from '../../../utils/motion-animations';
import downArrow from '../../../images/icons/downArrow.svg';
import { onOpenModalFormFutureEvents } from '../../../services/modalSlice';
import { resetMemberCountChange, setDetails } from '../../../services/futureEventSignUpData';
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
import { convertH2M, minutesEachHourInOneDay, TimeDiff } from '../../../utils/timeCalcHelpers';
import { FlexCCC } from '../../StyledMain';

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

const EventCard = ({ title, description, age, participants: participantsData, total_spots, price, start, end, page_id }: IProps) => {
    const [participants, setParticipants] = useState<number>(participantsData);
    const { shouldChangeMember } = useAppSelector((state) => state.futureEventDetails);
    const [enrolled, setEnrolled] = useState(false);
    const dispatch = useAppDispatch();

    const day = new Date(start).toLocaleString('ru-RU', { day: 'numeric' });
    const month = new Date(start)
        .toLocaleString('ru-RU', {
            month: 'long',
            day: 'numeric',
        })
        .split(' ')[1];
    const timeStart = new Date(start).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    const timeEnd = new Date(end).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    // Date full in format - 31 декабря 2022 г.
    const dateFull = new Date(start).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });

    // Calculate difference between ending time and starting time
    const duration2 = TimeDiff(timeStart, timeEnd);
    // Convert duration to minutes
    const diff = convertH2M(duration2);

    const isFullHour = minutesEachHourInOneDay.some((i) => i === diff);
    const hours = Math.floor(diff / 60)
    const minutes = diff % 60;
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

    const [open, setOpen] = useState(false);

    const handleClick = async (title: string, age: string, dateFull: string) => {
        const values = {
            title,
            age,
            dateFull,
        };
        dispatch(onOpenModalFormFutureEvents());
        dispatch(setDetails(values));
    };

    const handleParticipantsChange = async () => {
        const members = participants + 1;
        const data = {
            members,
            page_id,
        };
        const JSONdata = JSON.stringify(data);
        const endpoint = '/api/update-events-members';
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        };

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options);

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json();
        setParticipants(result.newMembers);
        dispatch(resetMemberCountChange());
    };

    useEffect(() => {
        if (shouldChangeMember) {
            handleParticipantsChange();
            setEnrolled(true);
        }
    }, [shouldChangeMember]);

    return (
        <StyledCard>
            <StyledDateNumber>
                <span>{day}</span>
            </StyledDateNumber>
            <MonthAndTimeContainer>
                <span>{month}</span>
                <span>{timeStart}</span>
            </MonthAndTimeContainer>
            <FlexCCC>
                <TitleAndAgeContainer>
                    <h2>{title}</h2>
                    {open ? null : <p>{age}</p>}
                </TitleAndAgeContainer>
                <AnimatePresence initial={false} mode={'wait'}>
                    {open ? (
                        <InnerContainer variants={toggleHeight} initial={toggleHeight.hidden} animate={toggleHeight.visible} exit={toggleHeight.exit}>
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
                                    typeHTML='submit'
                                    padding='0.5rem 0.9rem'
                                    fontFamily='var(--ff-body)'
                                    onClick={() => handleClick(title, age, dateFull)}
                                    disabled={enrolled || spotsLeft === 0}>
                                    {enrolled ? 'Ждем вас!' : spotsLeft === 0 ? 'Мест больше нет' : 'Приведу ребенка'}
                                </Button>
                            </SpaceBetween>
                        </InnerContainer>
                    ) : null}
                </AnimatePresence>
            </FlexCCC>
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
