export function convertToMongoDBAtlasISODate(dateString: string): string | null {
    // Split the date string into day, month, and year parts
    const [year, month, day] = dateString.split('-').map(Number);
    console.log('actual', dateString)

    // Check if the parts are valid numbers and within appropriate ranges
    if (isNaN(day) || isNaN(month) || isNaN(year) ||
        day < 1 || day > 31 || month < 1 || month > 12) {
        return 'invalid Date'; // Invalid date
    }

    // console.log('', dateString);
    // console.log('year', year);
    // Create a new Date object using the parts (Note: month in Date object starts from 0)
    const dateObject = new Date(year, month - 1, day);


    // Return the ISO date string in the format used by MongoDB Atlas (with milliseconds)
    console.log('output', dateObject)
    return dateObject.toISOString();
}