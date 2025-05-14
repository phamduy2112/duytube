import { VideoView } from "@/modules/videos/view/VideoView";
import { VideoSectionSuspense } from "@/modules/videos/sections/video-section";

// interface PageProps {
//     params: { id: string };
//   }
export const dynamic="force-dynamic";

const Page=async ({params})=>{
    const  {videoId}=await params;
    console.log(videoId)
    return(
        <div className="mt-[3rem] w-[1650px] px-2">
            {videoId}
           <VideoSectionSuspense videoId={videoId}/>
        </div>
    )

}
export default Page