export const RoomType = {
  PRIVATE: 1,
  PUBLIC: 2,
} as const;

export type RoomType = (typeof RoomType)[keyof typeof RoomType];
