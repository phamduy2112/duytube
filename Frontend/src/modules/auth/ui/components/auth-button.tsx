import { Button } from "@/components/ui/button"
import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs"
import { ClapperboardIcon, UserCircleIcon } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton";
import Notification from "@/modules/home/ui/components/home-navbar/notification";

export const AuthButtonSkeleton = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Skeleton nút Studio */}
      <Skeleton className="w-24 h-10 rounded-full" />

      {/* Skeleton avatar user */}
      <Skeleton className="w-10 h-10 rounded-full" />
    </div>
  );
};

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
                <Button variant={"link"}>
                    <Notification/>
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