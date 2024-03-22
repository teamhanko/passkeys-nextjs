"use server";

import { tenant } from "@teamhanko/passkeys-sdk";
import { getSession } from "./auth";

const passkeyApi = tenant({
  apiKey: process.env.PASSKEYS_API_KEY!,
  tenantId: process.env.PASSKEYS_TENANT_ID!,
});

export async function startServerPasskeyRegistration() {
  const session = await getSession();
  console.log("session", session);
  const sessionUser = session?.user;

  const createOptions = await passkeyApi.registration.initialize({
    userId: sessionUser!.id,
    username: sessionUser!.email || "",
  });

  return createOptions;
}

export async function finishServerPasskeyRegistration(credential: any) {
  const session = await getSession();
  if (!session) throw new Error("Not logged in");

  await passkeyApi.registration.finalize(credential);
}

export async function startServerPasskeyLogin() {
  const options = await passkeyApi.login.initialize();
  return options;
}

export async function finishServerPasskeyLogin(options: any) {
  const response = await passkeyApi.login.finalize(options);
  return response;
}
