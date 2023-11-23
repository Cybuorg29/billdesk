export  function convertToIndianCurrencyWords(amount: number): string {
  const ones = [
    'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'
  ];
  const teens = [
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  if (amount === 0) {
    return 'Zero Rupees';
  }

  function convertToWords(num: number): string {
    if (num === 0) {
      return '';
    } else if (num < 10) {
      return ones[num];
    } else if (num < 20) {
      return teens[num - 10];
    } else {
      const ten = Math.floor(num / 10);
      const one = num % 10;
      return tens[ten] + (one > 0 ? ` ${ones[one]}` : '');
    }
  }

  const crore = Math.floor(amount / 10000000);
  const lakh = Math.floor((amount % 10000000) / 100000);
  const thousand = Math.floor((amount % 100000) / 1000);
  const remaining = Math.floor(amount % 1000);
  const decimalPart = Math.round((amount % 1) * 100);

  let words = '';

  if (crore > 0) {
    words += convertToWords(crore) + ' Crore ';
  }
  if (lakh > 0) {
    words += convertToWords(lakh) + ' Lakh ';
  }
  if (thousand > 0) {
    words += convertToWords(thousand) + ' Thousand ';
  }
  if (remaining > 0) {
    words += convertToWords(remaining) + ' Rupees ';
  }
  if (decimalPart > 0) {
    words += 'and ' + convertToWords(decimalPart) + ' Paisa';
  }

  return words.trim(); // Remove leading/trailing spaces
}

