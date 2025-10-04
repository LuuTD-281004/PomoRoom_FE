export const RoomStatus = {
  ON_WORKING: 1,
  ON_REST: 2,
  STOP: 3,
  ON_LONG_REST: 4,
} as const;

export type RoomStatus = typeof RoomStatus[keyof typeof RoomStatus];
