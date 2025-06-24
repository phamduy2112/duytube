import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PlaylistsService } from "@/service/axios/playlists/playlists.service";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreVerticalIcon, Trash2Icon } from "lucide-react"

export const PlaylistInfo=({
    data
}:any)=>{
  const {user}=useUser()
  const queryClient = useQueryClient();
  
  const { mutate: deletePlaylist } = useMutation({
    mutationFn: (id:string) =>
      PlaylistsService.deletePlaylists(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists', user!.id] });
    },
  });
  const handleDeletePlaylist=(id:string)=>{
    deletePlaylist(id)
  }
    return (
        <div className="flex gap-3">
                <div className="flex-1 min-w-0">
                    <h3 className="font-medium line-clamp-1 lg:line-clamp-2 text-sm break-words">
                        {data.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">Playlist</p>
                    <p className="text-sm text-muted-foreground font-semibold hover:text-primary">View full playlist</p>
                </div>
                <div>
                <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" size="icon" className="rounded-full">
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
         
          <DropdownMenuItem onClick={()=>{handleDeletePlaylist(data?.id)}}>
              <Trash2Icon className="mr-2 size-4" />
              Remove
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
                </div>
        </div>
    )
}