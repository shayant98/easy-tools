// This function takes a string and returns a string with all the keys in the input string wrapped in double quotes.
// The keys are extracted by finding a word followed by a colon in the input string.
// The keys are wrapped by double quotes by replacing the matched colon with a double quote, a colon, and another double quote.\
const stringToJsonString = (str: string) => {
  return str.replace(/(\w+:)|(\w+ :)/g, function (matchedStr) {
    const key = matchedStr.substring(0, matchedStr.length - 1);
    return `"${key}":`;
  });
};

const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const base64toFile = async (dataUrl: string): Promise<File> => {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();

  return new File([blob], generateFileNameFromMimeType(blob), { type: blob.type, lastModified: Date.now() });
};

const generateFileNameFromMimeType = (file: Blob): string => {
  // get blob type
  const fileType = file.type;
  let extension;

  console.log(fileType);

  // TODO: find a better way to do this
  switch (fileType) {
    case "image/png":
      extension = "png";
      break;
    case "image/jpeg":
      extension = "jpg";
      break;
    case "image/gif":
      extension = "gif";
      break;
    case "text/plain":
      extension = "txt";
      break;
    case "application/pdf":
      extension = "pdf";
      break;
    default:
      throw new Error("File type not supported");
  }

  // generate file name
  const fileName = `${Date.now()}.${extension}`;
  return fileName;
};

export { stringToJsonString, toBase64, base64toFile };
