export function getStateCode(stateName: string): number {
    const stateCodes: Record<string, number> = {
      "Andaman and Nicobar Islands": 35,
      "Andhra Pradesh": 28,
      "Arunachal Pradesh": 12,
      "Assam": 18,
      "Bihar": 10,
      "Chandigarh": 4,
      "Chhattisgarh": 22,
      "Dadra and Nagar Haveli and Daman and Diu": 26,
      "Delhi": 7,
      "Goa": 30,
      "Gujarat": 24,
      "Haryana": 6,
      "Himachal Pradesh": 2,
      "Jammu and Kashmir": 1,
      "Jharkhand": 20,
      "Karnataka": 29,
      "Kerala": 32,
      "Ladakh": 37,
      "Lakshadweep": 31,
      "Madhya Pradesh": 23,
      "Maharashtra": 27,
      "Manipur": 14,
      "Meghalaya": 17,
      "Mizoram": 15,
      "Nagaland": 13,
      "Odisha": 21,
      "Puducherry": 34,
      "Punjab": 3,
      "Rajasthan": 8,
      "Sikkim": 11,
      "Tamil Nadu": 33,
      "Telangana": 36,
      "Tripura": 16,
      "Uttar Pradesh": 9,
      "Uttarakhand": 5,
      "West Bengal": 19
    };
  
    // Convert the input state name to title case (e.g., "andhra pradesh" to "Andhra Pradesh")
    stateName = stateName.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  
    // Check if the state name exists in the object, and return the code if found, or -1 if not found
    return stateCodes[stateName] || -1;
  }
  
  // Example usage:
  const stateName: string = "Andhra Pradesh";
  const stateCode: number = getStateCode(stateName);
  if (stateCode !== -1) {
    console.log(`The code for ${stateName} is ${stateCode}.`);
  } else {
    console.log(`State not found.`);
  }
  