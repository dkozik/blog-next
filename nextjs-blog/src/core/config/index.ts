export const Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  isClient: typeof window !== "undefined",
} as const;
