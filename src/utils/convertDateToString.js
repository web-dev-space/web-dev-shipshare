export const convertDateToString = (utcDate) => {
    const date = new Date(utcDate);
    const formatter = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
    return formatter.format(date);
}

export function addDaysToUTCDate(utcDate, daysToAdd) {
    const timestamp = Date.parse(utcDate) + daysToAdd * 24 * 60 * 60 * 1000;
    const newDate = new Date(timestamp);
    return convertDateToString(newDate.toUTCString());
}
