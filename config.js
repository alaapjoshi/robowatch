// Read API key for The Blue Alliance (https://www.thebluealliance.com/account).
// Set EXPO_PUBLIC_TBA_API_KEY in a .env file at the project root; see .env.example.
export const TBA_API_KEY = process.env.EXPO_PUBLIC_TBA_API_KEY;

if (!TBA_API_KEY) {
  console.warn(
    "EXPO_PUBLIC_TBA_API_KEY is not set. Blue Alliance requests will fail until you add it to .env."
  );
}
