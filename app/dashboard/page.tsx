import RegisterNewPasskey from "@/components/register-new-passkey";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function DashboardPage() {
    return (
        <div className="p-4">
            <form
                action={async () => {
                    "use server"
                    await logout();
                    redirect("/login");
                }}
            >
                <Button type="submit">Logout</Button>
            </form>
            <div className="mt-4">
                <RegisterNewPasskey />
            </div>
        </div>
    )
}

