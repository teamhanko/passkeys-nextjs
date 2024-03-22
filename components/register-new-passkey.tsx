"use client"

import { finishServerPasskeyRegistration, startServerPasskeyRegistration } from '@/lib/passkey';
import { Button } from './ui/button'
import {
    create,
    type CredentialCreationOptionsJSON,
} from "@github/webauthn-json";

const RegisterNewPasskey = () => {
    async function registerPasskey() {
        const createOptions = await startServerPasskeyRegistration();
        const credential = await create(createOptions as CredentialCreationOptionsJSON);
        await finishServerPasskeyRegistration(credential);
    }
    return (
        <Button
            onClick={() => registerPasskey()}
            className="flex justify-center items-center space-x-2"
        >
            Register a new passkey
        </Button>
    )
}

export default RegisterNewPasskey