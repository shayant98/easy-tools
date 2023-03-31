// This function takes a string and returns a string with all the keys in the input string wrapped in double quotes.
// The keys are extracted by finding a word followed by a colon in the input string.
// The keys are wrapped by double quotes by replacing the matched colon with a double quote, a colon, and another double quote.\
const stringToJsonString = (str: string) => {
  return str.replace(/(\w+:)|(\w+ :)/g, function (matchedStr) {
    const key = matchedStr.substring(0, matchedStr.length - 1);
    return `"${key}":`;
  });
};

export { stringToJsonString };
