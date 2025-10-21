import type { Conversation, Message } from "./chat";

export type UserRole = {
  id: string;
  userId: string;
  roleId: string;
  role: Role;
  assignedAt: string;
  updatedAt: string;
};

export type UserType = {
  id: string;
  username: string;
  email: string;
  provider?: string;
  googleId?: string;
  isActive?: number;
  userRoles?: UserRole[];
  createdAt?: string;
  updatedAt?: string;
  avatarUrl?: string;
  userStar: number;
  isPersonalPremium: boolean;
  isGroupPremium: boolean;
  messages?: Message[];
  conversations?: Conversation[];
};

export type Role = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};
