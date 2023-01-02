export const TimeDiff = (start: any, end: any) => {
    start = start.split(':');
    end = end.split(':');
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0) hours = hours + 24;

    return (hours <= 9 ? '0' : '') + hours + ':' + (minutes <= 9 ? '0' : '') + minutes;
};

export const convertH2M = (timeInHour: any) => {
    var timeParts = timeInHour.split(':');
    return Number(timeParts[0]) * 60 + Number(timeParts[1]);
}

export const minutesEachHourInOneDay = [
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