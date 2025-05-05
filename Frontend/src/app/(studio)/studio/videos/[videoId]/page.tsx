import { VideoView } from "@/modules/videos/view/VideoView";
import { FormSectionSuspense } from "../../ui/sections/form-section";

// interface PageProps {
//     params: { id: string };
//   }
const Page=async ({params})=>{
    const  {videoId}=await params;
    console.log(videoId)
    return(
        <div className="mt-[3rem] w-[1650px] px-2">
            {videoId}
        <FormSectionSuspense videoId={videoId} />
        </div>
    )

}
export default Page