
export const PlaylistInfo=({
    data
}:any)=>{
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                </div>
        </div>
    )
}