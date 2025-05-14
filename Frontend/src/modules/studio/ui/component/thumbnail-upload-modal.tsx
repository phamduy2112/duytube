import { ResponsiveModal } from "@/components/responsive-dialog";
// import {UploadDropzone} from "react-dropzone"
interface ThumbnailUploadModalProps{
    videoId:string;
    open:boolean;
    onOpenChange:(open:boolean)=>void;

}

export const ThumbnailUploadModal=({
videoId,
open,
onOpenChange,
}:ThumbnailUploadModalProps)=>{
    <ResponsiveModal title="Upload a video"    open={open}
    onOpenChange={onOpenChange}>
    {/* <UploadDropzone/> */}
    </ResponsiveModal>
}