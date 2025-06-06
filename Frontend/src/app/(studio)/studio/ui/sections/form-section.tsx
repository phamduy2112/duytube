"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useApiCategory } from "@/hooks/api/use-category";
import { snakeCaseToTitle } from "@/lib/utils";
import TitleGenerator from "@/modules/AI/generate-title";
import { ThumbnailUploadModal } from "@/modules/studio/ui/component/thumbnail-upload-modal";
import { VideoPlayer } from "@/modules/videos/ui/components/video-player";
import { categoryNames, mockVideos } from "@/scripts/seed-catelogries";
import { generateVideoData } from "@/service/axios/Al/AI.service";
import { VideoService } from "@/service/axios/videos/video";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CopyCheckIcon, CopyIcon, Globe2Icon, ImagePlus, ImagePlusIcon, LockIcon, MoreVerticalIcon, RotateCcwIcon, TrashIcon } from "lucide-react"
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "sonner";

interface FormSectionProps {
    videoId: string;
}

// export const FormSection=({videoId}:FormSectionProps=>{
//     return (
//         <Suspense fallback="loading....">
//         <ErrorBoundary>
//         <FormSectionSuspense/>
//         </ErrorBoundary>
//         </Suspense>
//     )
// })

export const FormSectionSuspense = ({ videoId }:FormSectionProps) => {
        const fullUrl=`localhost:3000/videos/${videoId}`

  const form = useForm({
  defaultValues: {
    title: "",
    description: "",
    category_id: "",
    thumbnaiUrl:"",
  }
})


      const {user}=useUser()
const userId = user?.id;
    const [isCopied, setIsCopied] = useState(false);
    const onCopy = async () => {
        await navigator.clipboard.writeText("localhost:3000")
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000)
    }
    const [thumbnailModalOpen,setThumbnailModalOpen]=useState(false);
    const response={
        videoId,
        userId
    }
    // getVideoDetailStudio
    const {data:studioVideoDetail}=useQuery({
        queryKey:["studio-video-detail",response],
        queryFn:()=>VideoService.getVideoDetailStudio(response),
          enabled: !!videoId && !!userId,


    })
    const { title, description } = form.watch();

const generateVideoMutation = useMutation({
  mutationFn: () => generateVideoData(title),
  onSuccess: (data) => {
    if (data?.videoDescription) {
      form.setValue("description", data.videoDescription);
      console.log(data)
    }
  },
});

// Truyền dữ liệu xuống TitleGenerator
   const videoDetail=studioVideoDetail?.data
// Khi có dữ liệu mới từ API → reset lại form
// reset khi có videoDetail
useEffect(() => {
  if (videoDetail) {
    form.reset({
      title: videoDetail.title || "",
      description: videoDetail.description || "",
      category_id: videoDetail.category || "",
    });
  }
}, [videoDetail]);



  const { data: categories, isLoading, isError } = useApiCategory();


const queryClient=useQueryClient()
 const {mutate:updateVideo}=useMutation({
        mutationFn:VideoService.updateVideoDetail,
        onSuccess:()=>{
          queryClient.invalidateQueries({ queryKey: ["update-video",form ] });

        },
        onError:(data)=>{

        }
    })
        const onSubmit = async (data:any) => {
       const formData={
        ...data,
        id:videoId
       }
       
       updateVideo(formData);
               toast.success("Lưu thành công")

    }
    return (
    <>
    {/* <ThumbnailUploadModal open={thumbnailModalOpen} onOpenChange={setThumbnailModalOpen} videoId={videoId}/> */}
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-center justify-between mb-6 mt-[5rem]">
                    <div>
                        <h1 className="text-2xl font-bold">Video details</h1>
                        <p className="text-xs text-muted-foreground">Manage your video details</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Button disabled={false} type="submit">Save</Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreVerticalIcon />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={()=>{}}>
                                    <TrashIcon className="size-4 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="grid grid-col-1 lg:grid-cols-5 gap-6">
                    <div className="space-y-3 lg:col-span-3">
                       <FormField
  control={form.control}
  name="title"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Title</FormLabel>
      <FormControl>
        <Input {...field} placeholder="Add a title to your video" />
      </FormControl>
    </FormItem>
  )}
/>
<Button
  onClick={() => generateVideoMutation.mutate()}
  disabled={generateVideoMutation.isPending}
  className="bg-blue-600"
>
  {generateVideoMutation.isPending ? "Đang tạo nội dung..." : "Tạo nội dung với AI"}
</Button>

                       <FormField
  control={form.control}
  name="description"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Description</FormLabel>
      <FormControl>
        <Textarea
          {...field}
          className="resize-none pr-10"
          placeholder="Add a description"
        />
      </FormControl>
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="category_id"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Category</FormLabel>
      <Select
        onValueChange={field.onChange}
        value={field.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {categories?.data.map((category:any) => (
            <SelectItem value={category.id} key={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  )}
/>
 <div>
   
              
              </div>




                    </div>
                    <div className="flex flex-col gap-y-8 lg:col-span-2">
                        <div className="flex flex-col gap-4 bg-[#F9F9F9] rounded-xl overflow-hidden h-fit">
                            <VideoPlayer
                                playBackId={videoDetail?.mux_playback_id}
                            />
                        </div>
                        <div className="p-4 flex flex-col gap-y-6">
                            <div className="flex justify-between items-center gap-x-2">
                                <div className="flex flex-col gap-y-1">
                                    <p className="text-muted-foreground text-xs">
                                        Video link
                                    </p>
                                    <div className="flex items-center gap-x-2">
                                        <Link href={`/videos/${1}`}>
                                            <p className="line-clamp-1 text-sm text-blue-500">
                                                locahost:3000/123
                                            </p>
                                        </Link>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="shrink-0"
                                            onClick={onCopy}
                                            disabled={isCopied}
                                        >
                                            {isCopied ? <CopyCheckIcon /> : <CopyIcon />}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col gap-y-1">
                                    <p className="text-muted-foreground text-xs">Video status</p>
                                    <p className="text-sm">
                                        {snakeCaseToTitle("preparing")}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex flex-col gap-y-1">
                                    <p className="text-muted-foreground text-xs">Subtitles status</p>
                                    <p className="text-sm">
                                        {snakeCaseToTitle( "no_audio")}
                                    </p>
                                </div>
                            </div>

                        </div>
 {/* <FormField
  control={form.control}
  name="visibility" // <-- fix chỗ này
  render={({ field }) => (
    <FormItem>
      <FormLabel>Visibility</FormLabel>
      <Select
        onValueChange={field.onChange}
        value={field.value}
        defaultValue={field.value ?? undefined}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select visibility" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="public">
            <div className="flex items-center">
              <Globe2Icon className="size-4 mr-2" />
              Public
            </div>
          </SelectItem>
          <SelectItem value="private">
            <div className="flex items-center">
              <LockIcon className="size-4 mr-2" />
              Private
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </FormItem>
  )}
/> */}

                     <FormField 
  name="thumbnaiUrl"
  control={form.control}
  render={({ field }) => (
    <FormItem>
      <FormLabel>Thumbnail</FormLabel>
      <FormControl>
        <div className="p-0.5 border border-dashed border-neutral-400 relative h-[84px] w-[153px] group">
          <Image 
            src="/placeholder.svg"
            className="object-cover"
            fill
            alt="Thumbnail"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                size="icon"
                className="bg-black/50 hover:bg-black/50 absolute top-1 right-1 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100">
                <MoreVerticalIcon className="text-white" />
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="start" side="right">
              <DropdownMenuItem onClick={() => setThumbnailModalOpen(true)}>
                <ImagePlusIcon className="size-4 mr-1" />
                Change
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RotateCcwIcon className="size-4 mr-1" />
                Restore
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </FormControl>
    </FormItem>
  )}
/>


                    </div>



                </div>

            </form>
        </FormProvider>
    </>

    )
}