"use server";

import { db } from "@/db";
import { SignJWT, jwtVerify, decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

async function verifyUser(email: string, password: string): Promise<any> {
  const user = db.users.find(
    (user) => user.email === email && user.password === password
  );
  return user || null;
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const user = await verifyUser(email, password);

  if (!user) {
    throw new Error("Authentication failed");
  }
  const sessionUser = { id: user.id, email: user.email };
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ user: sessionUser, expires });

  cookies().set("session", session, { expires });
}

export async function loginWithPasskey(userId: string) {
  const user = db.users.find((user) => user.id === userId);
  if (!user) {
    throw new Error("Authentication failed");
  }

  const sessionUser = { id: user.id, email: user.email };
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ user: sessionUser, expires });

  cookies().set("session", session, { expires });
}

export async function getUserID(token: string) {
  const payload = decodeJwt(token ?? "");

  const userID = payload.sub;
  return userID;
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
