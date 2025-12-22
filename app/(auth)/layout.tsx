import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen">
            <ClerkLoading>
                <div className="flex items-center justify-center min-h-screen">
                    <Loader2 className="animate-spin text-muted-foreground" size={32} />
                </div>
            </ClerkLoading>
            <ClerkLoaded>
                {children}
            </ClerkLoaded>
        </div>
    )
}
