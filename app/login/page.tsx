import SignInForm from "@/components/signin-form";
import SignInWithPasskey from "@/components/signin-with-passkey";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function AuthPage() {

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription className="">Choose your preferred sign in method</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col">
                        <form
                            action={async (formData) => {
                                "use server"
                                await login(formData);
                                redirect("/dashboard");
                            }}
                        >
                            <div className="flex flex-col gap-y-2">
                                <Label>Email</Label>
                                <Input type="email" name="email" />
                                <Label>Password</Label>
                                <Input type="password" name="password" />
                            </div>
                            <Button type="submit" className="mt-4 w-full">Sign in with Email</Button>
                        </form>
                        <div className="relative mt-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <SignInWithPasskey />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
