import moment from "moment";

export const dateToString = (date: Date) => moment(date).format("DD MMM YYYY");
export const stringToDate = (stringD: string) => moment(stringD, 'DD MMM YYYY').toISOString();

export const formatTimeWithAddedHours = (dateString: Date) => {
    const date = moment(dateString);

    const startTime = date.format('h:mm A');

    const endTime = date.add(2, 'hours').format('h:mm A');

    return `${startTime} - ${endTime}`;
}


// for calendar on home screen
export const generateDateObjects = (dates: string[]) => {
    const dateObjects = {};

    dates.forEach(date => {
        const formattedDate = moment(date, 'DD MMM YYYY').format('YYYY-MM-DD');
        // @ts-ignore
        dateObjects[formattedDate] = {
            selected: true,
            marked: true,
            selectedColor: 'blue',
        };
    });

    return dateObjects;
};