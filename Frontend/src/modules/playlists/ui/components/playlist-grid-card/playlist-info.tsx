
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
        </div>
    )
}