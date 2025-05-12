import { ResponsiveModal } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button"
import { Loader2Icon, PlusIcon } from "lucide-react";
import { StudioUpLoader } from "./studio-uploader";

export const StudioUpLoadModal=()=>{
    let isPending=false;
    let open=false
    // const router=Router;
    const onSuccess=()=>{
        // router.push("/studio/videos/")
    }
    let create={
        data:{
            url:"ABC"
        }
    }
    return (    
        <>
        <ResponsiveModal
        title="Upload a video"
        open={open}
        onOpenChange={()=>{}}
        >

{
    create.data?.url? <StudioUpLoader endpoint={create.data?.url} onSuccess={onSuccess} />:<Loader2Icon/>
}
           
        </ResponsiveModal>
        <Button
            variant="secondary"
            disabled={isPending}
            
        >
            {isPending?<Loader2Icon className="animate-spin"/>:<PlusIcon/>}
            Create</Button>
        </>
        
    )
}