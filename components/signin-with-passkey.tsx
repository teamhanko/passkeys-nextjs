"use client"

import { finishServerPasskeyLogin, startServerPasskeyLogin } from "@/lib/passkey";
import { get } from "@github/webauthn-json";

import { Button } from "./ui/button"
import { getUserID, loginWithPasskey } from "@/lib/auth";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation'

export default function SignInWithPasskey() {
    const router = useRouter()
    async function signIn() {
        const assertion = await startServerPasskeyLogin();
        const credential = await get(assertion as any);
        const response = await finishServerPasskeyLogin(credential);
        if (!response || !response.token) {
            return null;
        }
        const { token } = response;
        const userID = await getUserID(token);
        if (!userID) {
            return null;
        }
        await loginWithPasskey(userID);
        router.push('/dashboard')
    }
    return (
        <Button className="mt-4" variant="secondary" onClick={signIn}> Sign in with a Passkey </Button>
    )
}
