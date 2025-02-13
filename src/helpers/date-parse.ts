import type {DateTimeFormatOptions} from "@/types/types";


const dateFormat: Readonly<DateTimeFormatOptions> = {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
}

const timeFormat: Readonly<DateTimeFormatOptions> = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
}

const isTodayDate = (localDate: Date, today: Date): boolean => {
    return localDate.getFullYear() === today.getFullYear() &&
        localDate.getMonth() === today.getMonth() &&
        localDate.getDate() === today.getDate();
}

export const utcDateToLocal = (utcDate: string, todayLabel: string | false = "Today"): [string, string] => {
    const localDate = new Date(utcDate);
    const today = new Date();

    let formattedDate = localDate.toLocaleDateString('en-GB', dateFormat);

    const formattedTime = localDate.toLocaleTimeString('en-GB', timeFormat);

    if (todayLabel && isTodayDate(localDate, today)) {
        formattedDate = todayLabel
    }

    return [formattedDate, formattedTime];
}