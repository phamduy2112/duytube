import { FormSectionSuspense } from "@/app/(studio)/studio/ui/sections/form-section";
import { VideoView } from "@/modules/videos/view/VideoView";
export const dynamic="force-dynamic";

interface PageProps {
    params: { id: string };
  }
  
const Page=({params}:PageProps)=>{
    const  {videoId}=params;
    console.log(videoId)
    return(
        <div>
            {videoId}
            {/* <FormSectionSuspense videoId={videoId} /> */}
        </div>
    )

}
export default Page