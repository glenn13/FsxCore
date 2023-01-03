export const capitalizeString = (str: string) =>
  str.toLowerCase().replace(/^(.)|\s+(.)/g, (c: string) => c.toUpperCase());
