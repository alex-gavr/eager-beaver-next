import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../services/hook';
import { Button } from '../../buttons/button';
import { AnimatePresence } from 'framer-motion';
import { toggleHeight } from '../../../utils/motion-animations';
import { PreloaderSmall } from '../../preloader/preloader-small';
import Moment from 'react-moment';
import 'moment/locale/ru';
import moment from 'moment';
import downArrow from '../../../images/icons/downArrow.svg';
import { onOpenModalFormFutureEvents } from '../../../services/modalSlice';
import { resetMemberCountChange, setDetails } from '../../../services/futureEventSignUpData';
import Image from 'next/image';
import {
    FlexColumnCenter,
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

const EventCard = ({ title, description, age, participants: participantsData, total_spots, price, start, end, page_id }: IProps) => {
    const [participants, setParticipants] = useState<number>(participantsData);
    const { shouldChangeMember } = useAppSelector((state) => state.futureEventDetails);

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

    // const handleClick = (title: string, age: string, participants: number, dateFull: string, page_id: string) => {
    //     const values = {
    //         title,
    //         age,
    //         dateFull,
    //     };
    //     dispatch(setDetails(values));
    //     dispatch(onOpenModal());
    //     dispatch(resetEnrolledToFutureEvent());
    //     const members = participants + 1;
    //     setEnrolledDataOptions({
    //         page_id: page_id,
    //         members: members,
    //     });
    // };
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
        }
    }, [shouldChangeMember]);

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
            <FlexColumnCenter>
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
                                    // onClick={() => handleClick(title, age, participants, dateFull, page_id)}
                                    onClick={() => handleClick(title, age, dateFull)}
                                    disabled={enrolled || spotsLeft === 0}>
                                    {buttonLoading ? <PreloaderSmall /> : enrolled ? 'Ждем вас!' : spotsLeft === 0 ? 'Мест больше нет' : 'Приведу ребенка'}
                                </Button>
                            </SpaceBetween>
                        </InnerContainer>
                    ) : null}
                </AnimatePresence>
            </FlexColumnCenter>
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
