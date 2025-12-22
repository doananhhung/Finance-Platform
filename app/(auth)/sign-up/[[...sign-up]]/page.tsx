import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="text-3xl font-bold text-[#2E2A47]">
            Welcome to Finance Platform!
          </h1>
          <p className="text-[#2E2A47]">
            Create an account here
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" size={32} />
          </ClerkLoading>
          <ClerkLoaded>
            <SignIn path="/sign-up" />
          </ClerkLoaded>
        </div>
      </div>
      <div className="h-full bg-blue-500 hidden lg:flex items-center justify-center px-4">
        <Image src="/logoipsum-custom-logo.svg" alt="Logo" width={1000} height={1000} />
      </div>
    </div>    
  )
}