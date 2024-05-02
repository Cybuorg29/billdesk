export function getDateInfo(isoDate: any) {
    const date = new Date(isoDate);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const monthName = monthNames[date.getMonth()];
    const monthNumber = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const time = date.toLocaleTimeString('en-US');

    return {
        monthName: monthName,
        monthNumber: monthNumber,
        day: day,
        year: year,
        dayOfWeek: dayOfWeek,
        time: time
    };
}