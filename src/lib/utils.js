
export function replaceText(text, variables) {
  // Loop through each key-value pair in the variables object
  for (const [key, value] of Object.entries(variables)) {
    // Create a regular expression to match the variable in the text
    //check key exist in text
    if (!text.includes(`{{${key}}}`)) {
      Error(`Variable {{${key}}} not found in the text`);
    }

    const regex = new RegExp(`{{${key}}}`, 'g');
    // Replace all occurrences of the variable with its corresponding value
    text = text.replace(regex, value);
  }
  return text;
}