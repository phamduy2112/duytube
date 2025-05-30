
import { VideoView } from "@/modules/videos/view/VideoView";
import { JSX } from "react";

export const dynamic="force-dynamic";

interface PageProps {
    params: { videoId: string };
  }
  
const Page = async ({ params }: any)  => {
  const { videoId } = await params; // ✅ sử dụng được trong hàm async
    
    return(
        <div className="">
           
          

             <div>
               
            <VideoView videoId={videoId}/>     
                </div>
        </div>
    )

}
export default Page