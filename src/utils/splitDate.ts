 export function splitDate(dateStr: string): { day: number, month: number, year: number } | null {
    const dateObj = new Date(dateStr);

    // Check if the date string is valid
    // if (isNaN(dateObj.getTime())) {
    //     console.error("Invalid date string");
    //     return null;
    // }

    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // Months in JavaScript are 0-indexed
    const year = dateObj.getFullYear();

    return { day, month, year };
}