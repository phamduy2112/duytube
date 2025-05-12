
interface PageProps{
    params:Promise<{videoId:string}>
}
export const dynamic="force-dynamic";

const Page=async ({params}:PageProps)=>{
    const {videoId}=await params
    return (
        <div>
            Video ID:{videoId}
        </div>
    )
}
export default Page