
 export function convertNumToWord(number: number): string {
    const ones: string[] = [
      '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
      'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];
  
    const tens: string[] = [
      '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
    ];
  
    const thousands: string[] = ['', 'thousand', 'million', 'billion'];
  
    function convertLessThanThousand(num: number): string {
      if (num === 0) {
        return '';
      } else if (num < 20) {
        return ones[num];
      } else if (num < 100) {
        return tens[Math.floor(num / 10)] + ' ' + ones[num % 10];
      } else {
        return ones[Math.floor(num / 100)] + ' hundred ' + convertLessThanThousand(num % 100);
      }
    }
  
    function toWords(num: number): string {
      if (num === 0) {
        return 'zero';
      }
  
      let result = '';
      for (let i = 0; num > 0; i++, num = Math.floor(num / 1000)) {
        if (num % 1000 !== 0) {
          result = convertLessThanThousand(num % 1000) + ' ' + thousands[i] + ' ' + result;
        }
      }
  
      return result.trim();
    }
  
    return toWords(number);
  }
  
  // Example usage:

  