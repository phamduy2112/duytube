import {  mockUser, subscriptions } from "@/scripts/seed-catelogries";
import { UserPageBanner, UserPageBannerSkeleton } from "../ui/components/user-page-banner";
import { UserPageInfo, UserPageInfoSkeleton } from "../ui/components/user-page-info";
import  UserNavBar from "../ui/components/user-navbar";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { UserService } from "@/service/axios/user/user.service";

// interface UserSectionProps{
//     userId:string;
// }


// co suspense ...props

interface UserSectionProps {
  userId: string;
  handleItemClick: (item: string) => void;
  activeItem: string;
  isLoading:boolean
}

export const UserSectionSkeleton=()=>{
    return(
        <div className="flex flex-col">
            <UserPageBannerSkeleton/>
            <UserPageInfoSkeleton/>
            <Separator/>

        </div>
    )
}
const UserSection = ({ userId,handleItemClick,activeItem,isLoading}:UserSectionProps) => {

  // const {user}=useUser();
  const {data:user}=useQuery({
    queryKey:["get-user-detail",userId],
    queryFn:()=>UserService.getUser(userId),
    enabled:!!userId,


  })

  if (!user) {
    return <div>Không tìm thấy người dùng.</div>;
  }

  return (
    <div className="flex flex-col ">
            <UserPageBanner user={user}/>
            <UserPageInfo user={user}/>
            <UserNavBar handleItemClick={handleItemClick} activeItem={activeItem}/>
    {/* <UserSectionSkeleton/> */}
    </div>

  );
};

export default UserSection;
