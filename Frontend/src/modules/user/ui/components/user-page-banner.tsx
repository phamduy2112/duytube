import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils"
import { useAuth } from "@clerk/nextjs"
import { Edit2Icon } from "lucide-react";

export const UserPageBannerSkeleton=()=>{
    return <Skeleton className="w-full max-h-[200px] h-[15px] md:h-[25vh]"/>
}

export const UserPageBanner=({user}:any)=>{
    // const {userId}=useAuth();
    console.log(user)
    return (
        <div className="relative group">
            
            <div className={cn(
                "w-full max-h-[200px] h-[15vh] md:h-[25vh] bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl",
             "bg-cover bg-center"
            )}
         style={{
//   backgroundImage: `url("https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/495829766_3798618053688350_7263700441877599386_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=RzUOGY55YLwQ7kNvwEshM1E&_nc_oc=AdmBhQritYhokjOBABxavxOuWpAX3CbI3dpFL_6UqtFMF--S-Z6V0PBBxOvi4-RzDybzvu6LKfMITBGCJlqbpxxD&_nc_zt=23&_nc_ht=scontent.fsgn8-3.fna&_nc_gid=8f0KTX6YQGl7E7_0QezX1g&oh=00_AfIniVQ1W7Gg54rgraPQ6Ur9hNIkDDtGYWMb8OxhxH1wEw&oe=6826555D")`
}}

            ></div>
            {/* user.clerkId===userId */}
            <Button 
            type="button"
            size="icon"
            className="absolute top-4 right-4 rounded-full bg-black/50 hover:bg-black/50 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <Edit2Icon className="size-4 text-white"/>
            </Button>
        </div>
    )
}