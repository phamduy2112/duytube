import { Button } from "@/components/ui/button"
import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs"
import { ClapperboardIcon, UserCircleIcon } from "lucide-react"
import Link from "next/link"

export const AuthButton=()=>{
    return (
        <>
        <SignedIn>
            <Button asChild>
                <Link href="/studio">
                <ClapperboardIcon/>
                    Studio
                </Link>

            </Button>
            <UserButton>
                <UserButton.MenuItems>
                    <UserButton.Link
                    label="Studio"
                    href="/studio"
                    labelIcon={<ClapperboardIcon className="size-4"/>}
                    ></UserButton.Link>
                    <UserButton.Action label="manageAccount"/>
                </UserButton.MenuItems>
            </UserButton>

        </SignedIn>
        <SignedOut>

            <SignInButton mode="modal">
            <Button
        variant="outline"
        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/2 rounded-full shadow-none"
        >
            <UserCircleIcon className=""></UserCircleIcon>
            Sign in
        </Button>
            </SignInButton>
        </SignedOut>
        
    
        </>
    )   
}