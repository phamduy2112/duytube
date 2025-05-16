import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"


export const ChannelSubscribedSections=()=>{
    return (
       <div className="flex items-start gap-4">
  <UserAvatar
    name="duy"
    imageUrl="https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/495829766_3798618053688350_7263700441877599386_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=NPas62KK2D4Q7kNvwH4OumX&_nc_oc=Adn-RkY8nGCRQm7yHhMtF2j9rmSkOOsotvzkcCXevDVIQINJCDUmGxzpD9JkwwvYfTU&_nc_zt=23&_nc_ht=scontent.fsgn8-3.fna&_nc_gid=NRmAbndEadNLkjdAkRJGAg&oh=00_AfINwObYduSQkujWNAsl22t_HjDelkHVs1e163Sve5G86A&oe=682B2ADD"
    size={"xl"}
    className="w-[100px] h-[100px]"
  />
  <div className="flex flex-col flex-1">
    <h3 className="text-[1.3rem] font-semibold">Duy đẹp trai</h3>
    <div className="text-sm text-muted-foreground mt-2">
      10,8 Tr người đăng ký | 696 video
    </div>
    <div className="text-sm ">
      Lorem ipsum dolor sit amet consectetur adipisicing elit...
    </div>
  </div>
  <div>
    <Button>
        
        Đã đăng ký</Button>
  </div>
</div>

    )
}