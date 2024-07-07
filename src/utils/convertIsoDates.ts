

export default function convertIsoDate(value: string | undefined) {
  if (!value) return ''
  const date = new Date(value);
  const formattedDateString = date.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Kolkata'
  });

  return formattedDateString;

}