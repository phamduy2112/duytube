"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useApiCategory } from "@/hooks/api/use-category";
import { snakeCaseToTitle } from "@/lib/utils";
import { ThumbnailUploadModal } from "@/modules/studio/ui/component/thumbnail-upload-modal";
import { VideoPlayer } from "@/modules/videos/ui/components/video-player";
import { categoryNames, mockVideos } from "@/scripts/seed-catelogries";
import { VideoService } from "@/service/axios/videos/video";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { CopyCheckIcon, CopyIcon, Globe2Icon, ImagePlus, ImagePlusIcon, LockIcon, MoreVerticalIcon, RotateCcwIcon, TrashIcon } from "lucide-react"
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

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

export const FormSectionSuspense = ({ videoId }) => {
    const video = mockVideos.find((item) => item.id == videoId)
        const fullUrl=`localhost:3000/videos/${videoId}`

    const form = useForm({
        defaultValues: video
    })
    const onSubmit = async (data) => {
        console.log(data)
    }
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
        

    })
    
   const videoDetail=studioVideoDetail?.data
// Khi có dữ liệu mới từ API → reset lại form
useEffect(() => {
  if (videoDetail) {
    form.reset({
      title: videoDetail.title || "",
      description: videoDetail.description || "",
      categoryId: videoDetail.category || "",
      visibility: videoDetail.visibility || "public",
    });
  }
}, [videoDetail]);
  const { data: categories, isLoading, isError } = useApiCategory();

console.log(form)

    return (
    <>
    <ThumbnailUploadModal open={thumbnailModalOpen} onOpenChange={setThumbnailModalOpen} videoId={videoId}/>
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
                    <div className="space-y-8 lg:col-span-3">
                        <FormField control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Add to a title to your video"
                                        value={videoDetail?.title}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                      
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
  name="categoryId"
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
          {categories?.data.map((category) => (
            <SelectItem value={category.id} key={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  )}
/>




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
                                        <Link href={`/videos/${video?.id}`}>
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
                                        {snakeCaseToTitle(video?.visibility || "preparing")}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex flex-col gap-y-1">
                                    <p className="text-muted-foreground text-xs">Subtitles status</p>
                                    <p className="text-sm">
                                        {snakeCaseToTitle(video?.visibility || "no_audio")}
                                    </p>
                                </div>
                            </div>

                        </div>
   <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value ?? undefined}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                         <SelectItem value="public">
                                           <div className="flex items-center">
                                           <Globe2Icon className="size-4 mr-2"/>
                                           Public
                                           </div>
                                         </SelectItem>
                                         <SelectItem value="private">
                                           <div className="flex items-center">
                                           <LockIcon className="size-4 mr-2"/>
                                           Private
                                           </div>
                                         </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField 
                        name="thmbnaiUrl"
                        control={form.control}
                        render={()=>(
                            <FormItem>
                                <FormLabel>Thumbnail</FormLabel>
                                <FormControl>
                                    <div className="p-0.5 border border-dashed border-neutral-400 relative h-[84px] w-[153px] group">
                                        <Image 
                                        
                                        src={video?.thumbnail ??"/placeholder.svg"} className="object-cover" fill alt="Thmbnail"></Image>

                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                        >
                          <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                    type="button"
                                    size="icon"
                                    className="bg-black/50 hover:bg-black/50 absolute top-1 right-1 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100">
                                        <MoreVerticalIcon className="text-white"></MoreVerticalIcon>
                                    </Button>
                                    <DropdownMenuContent align="start" side="right">
                                        <DropdownMenuItem onClick={()=>setThumbnailModalOpen(true)}>
                                            <ImagePlusIcon className="size-4 mr-1"></ImagePlusIcon>
                                            Changne
                                        </DropdownMenuItem>
                                        <DropdownMenuItem >
                                            <RotateCcwIcon className="size-4 mr-1"></RotateCcwIcon>
                                            Restore
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenuTrigger>
                          </DropdownMenu>
                        </FormField>

                    </div>



                </div>

            </form>
        </FormProvider>
    </>

    )
}