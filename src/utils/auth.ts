import * as jwt from "jsonwebtoken";

export const _AUTH_SECRET = "GraphQL-is-aw3some";

export interface AuthTokenPayload {
  userId: number;
}

export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    throw new Error("No token found");
  }

  return jwt.verify(token, _AUTH_SECRET) as AuthTokenPayload;
}
