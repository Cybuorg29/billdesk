 export default function replaceUnderscoresWithSpaces(inputString: string): string {
    // Use a regular expression to replace all underscores with spaces
    const result = inputString.replace(/_/g, ' ');
  
    return result;
  }
  
  // Example usage:
  const originalString = "This_is_an_example_string_with_underscores";
  const modifiedString = replaceUnderscoresWithSpaces(originalString);
  
  console.log(modifiedString); // Output: "This is an example string with underscores"
  
