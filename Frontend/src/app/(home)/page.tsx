import Image from "next/image";
import { HomeView } from "./ui/views/home-view";
import UserRegister from "../(auth)/create-user/User-Register";
import TitleGenerator from "@/modules/AI/generate-title";
import MuxPlaylist from "@/modules/videos/ui/components/video-playlist";

export default function Home() {
  return (
   <div className="">
    {/* <TitleGenerator/> */}
        <HomeView/>
        <UserRegister/>
        
     </div>

  );
}
