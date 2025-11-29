// Application constants
// Add application-wide constants here as needed

export const LOGIN_ROLES = ["Super", "Admin", "Manager", "User"] as const;

export const GAME_BLOCK_OPTIONS = [
  "SRIDEVI",
  "TIME BAZAR",
  "MADHUR DAY",
  "MILAN DAY",
  "RAJDHANI DAY",
  "SUPREME DAY",
  "KALYAN",
  "GOLDEN DAY",
  "SRIDEVI NIGHT",
  "MADHUR NIGHT",
  "SUPREME NIGHT",
  "MILAN NIGHT",
  "KALYAN NIGHT",
  "RAJDHANI NIGHT",
  "MAIN BAZAR",
] as const;

export const RECORDS_PER_BLOCK_OPTIONS = [
  { value: "20", label: "20" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
  { value: "500", label: "500" },
  { value: "1000", label: "1000" },
] as const;

export const USER_SEGMENT_LABELS = {
  all: "All Users",
  "play-active": "Play Active Users",
  "play-inactive": "Play Inactive Users",
  "block-devices": "Block Devices",
} as const;

export type UserSegment = keyof typeof USER_SEGMENT_LABELS;
