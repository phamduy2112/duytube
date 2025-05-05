
import MuxUploader from "@mux/mux-uploader-react"
interface StudioUploaderProps{
    endpoint?:string|null;
    onSuccess:()=>void;
}

export const StudioUpLoader=({
    endpoint,
    onSuccess,

}:StudioUploaderProps)=>{
    return (
        <div>
            <MuxUploader/>
        </div>
    )
}