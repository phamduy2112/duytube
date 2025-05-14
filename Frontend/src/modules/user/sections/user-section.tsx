import {  subscriptions } from "@/scripts/seed-catelogries";
import { UserPageBanner, UserPageBannerSkeleton } from "../ui/components/user-page-banner";
import { UserPageInfo, UserPageInfoSkeleton } from "../ui/components/user-page-info";
import { Separator } from "@/components/ui/separator";

interface UserSectionProps{
    userId:string;
}


// co suspense ...props

interface Props {
  userId: string;
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
const UserSection = ({ userId }: Props) => {
  const user = subscriptions.find((u) => u.id === userId);

  if (!user) {
    return <div>Không tìm thấy người dùng.</div>;
  }

  return (
    <div className="flex flex-col ">
            <UserPageBanner user={user}/>
            <UserPageInfo user={user}/>
            <Separator/>
    </div>

  );
};

export default UserSection;
