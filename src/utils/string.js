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
