// R2 public base URL for Rio's birthday album
const R2_BASE =
  "https://pub-f947eb0b9c4e4413adbb55de4dfbc8d4.r2.dev/69bb9afea9171fd6a2a943d4";

// ─── Hero section data ────────────────────────────────────────────────────────
// Fill in the [PLACEHOLDER] values before deploying
export const profile = {
  name: "Bảo Nam", // e.g. "Rio"
  age: "11", // e.g. 10
  birthdayDate: "May 9, 2015", // e.g. "May 9, 2026"
  message:
    "Happy Birthday to a great, brilliant, gorgeous, and humorous person! ", // personal birthday quote or message
  avatarUrl: `${R2_BASE}/49533f4e-1a41-4d53-a881-5a4b2c7300b3.jpeg`, // e.g. /avatar.jpeg
};

// ─── Gallery images ───────────────────────────────────────────────────────────
// Filenames follow DSC0XXXX.JPG pattern from the birthday photo session.
// Groups reflect gaps in the original shoot sequence.
const PHOTO_NUMBERS = [
  // Group 1
  2296,
  2297,
  2298,
  // Group 2
  2300,
  2301,
  2302,
  2303,
  // Group 3
  2306,
  2307,
  2308,
  2309,
  2310,
  // Group 4
  2312,
  2313,
  2314,
  2315,
  2316,
  2317,
  2318,
  2319,
  2320,
  2321,
  2322,
  2323,
  2324,
  2325,
  2326,
  2327,
  2328,
  // Group 5
  2331,
  2332,
  2333,
  2334,
  2335,
  2336,
  2337,
  2338,
  2339,
  2340,
  // Group 6: consecutive 2342–2507
  ...Array.from({ length: 166 }, (_, i) => 2342 + i),
];

export const galleryImages = PHOTO_NUMBERS.map((n, i) => ({
  id: String(i + 1),
  url: `${R2_BASE}/DSC0${n}.JPG`,
  alt: `Birthday photo ${i + 1}`,
}));
