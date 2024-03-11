import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Returns a Tailwind class string based on the inputs. Any falsy values will
 * be removed. If all inputs are falsy, an empty string will be returned.
 *
 * @param inputs A list of class values.
 * @returns A Tailwind class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertStringToCamelCase = (str: string) => {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr: string) => chr.toUpperCase());
};
