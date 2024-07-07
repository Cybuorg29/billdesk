export function compareIsoDates(dateStr1: string, dateStr2: string): boolean {
    try {
        // Parse ISO dates into Date objects
        const date1 = new Date(dateStr1);
        const date2 = new Date(dateStr2);

        // Compare the Date objects and return the result
        return date1.getTime() < date2.getTime();
    } catch (error) {
        // Return false for invalid date formats
        return false;
    }
}