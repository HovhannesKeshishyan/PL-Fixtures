export const utcDateToLocal = (utcDate: string): [string, string] => {
    const localDate = new Date(utcDate);

    const formattedDate = localDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    const formattedTime = localDate.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return [formattedDate, formattedTime];
}