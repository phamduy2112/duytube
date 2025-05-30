
import { ChannelSubscribedSections } from "../sections/channel-subscribed-sections";

interface HomeViewProps{
    categoryId?:string;
}

export const ChannelView=()=>{
    return (
        <div className="max-w-[1650px] mx-auto mb-10 px-4 pt-17 flex flex-col gap-y-6">
                {/*  */}
               
             <div>
                <h1 className="text-2xl font-bold">Tất cả kênh đã đăng ký

</h1>
                <p className="text-xs text-muted-foreground">
                   Videos from your favorite creators
                </p>
             </div>
        <ChannelSubscribedSections/>
              
        </div>
    )
}