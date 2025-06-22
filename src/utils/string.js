/**
 * Extracts the initials from a full name.
 * @param fullName - The full name string.
 * @returns The initials of the name, formatted as a string.
 */
export function getInitials(fullName) {
  if (!fullName || typeof fullName !== "string") {
    // throw new Error('Invalid input: fullName must be a non-empty string.');
    return "";
  }

  const nameParts = fullName.trim().split(/\s+/); // Split by whitespace
  const firstInitial = nameParts[0]?.[0]?.toUpperCase() || ""; // First name initial
  const lastInitial =
    nameParts.length > 1
      ? nameParts[nameParts.length - 1][0].toUpperCase()
      : ""; // Last name initial

  return firstInitial + lastInitial;
}

export function camelToSnake(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2") // tambahkan underscore sebelum huruf kapital
    .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2") // tangani huruf kapital beruntun
    .toLowerCase();
}

export function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
