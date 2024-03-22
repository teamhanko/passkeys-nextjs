"use client"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"




const SignInForm = () => {

    return (
        <form>
            <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input type="email" />
                <Label>Password</Label>
                <Input type="password" />
            </div>
            <Button type="submit" className="mt-4 w-full">Sign in with Email</Button>
        </form>
    )
}

export default SignInForm
