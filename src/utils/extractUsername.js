import { generateRandomChars } from "./generateRandomCharacters";

export function extractUsername(email) {
    const atIndex = email.indexOf("@");
    const username = email.substring(0, atIndex);
    
    // Generate 5 random characters
    const randomChars = generateRandomChars(5);
    
    // Add hyphen and random characters to the username
    const modifiedUsername = username + "-" + randomChars;
    
    return modifiedUsername;
  }