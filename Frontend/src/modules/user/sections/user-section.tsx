import {  mockUser, subscriptions } from "@/scripts/seed-catelogries";
import { UserPageBanner, UserPageBannerSkeleton } from "../ui/components/user-page-banner";
import { UserPageInfo, UserPageInfoSkeleton } from "../ui/components/user-page-info";
import  UserNavBar from "../ui/components/user-navbar";
import { Separator } from "@/components/ui/separator";

// interface UserSectionProps{
//     userId:string;
// }


// co suspense ...props

interface UserSectionProps {
  userId: string;
  handleItemClick: (item: string) => void;
  activeItem: string;
}

const UserSectionSkeleton=()=>{
    return(
        <div className="flex flex-col">
            <UserPageBannerSkeleton/>
            <UserPageInfoSkeleton/>
            <Separator/>

        </div>
    )
}
const UserSection = ({ userId,handleItemClick,activeItem}:UserSectionProps) => {
  const user = mockUser.find((u) => u.id ==userId);

  if (!user) {
    return <div>Không tìm thấy người dùng.</div>;
  }

  return (
    <div className="flex flex-col ">
            <UserPageBanner user={user}/>
            <UserPageInfo user={user}/>
            <UserNavBar handleItemClick={handleItemClick} activeItem={activeItem}/>
    </div>

  );
};

export default UserSection;
