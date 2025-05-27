import { VideoView } from "@/modules/videos/view/VideoView";
import { VideoSectionSuspense } from "@/modules/videos/sections/video-section";
import { FormSectionSuspense } from "../../ui/sections/form-section";

// interface PageProps {
//     params: { id: string };
//   }
export const dynamic="force-dynamic";

const Page=async ({params})=>{
    const  {videoId}=await params;
    console.log(videoId)
    return(
        <div className="mt-[3rem] w-[100%]  px-2">
          <div className="2xl:w-[1600px] m-auto">
                   <FormSectionSuspense videoId={videoId}/>
          </div>
    
        </div>
    )

}
export default Page