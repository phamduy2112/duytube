import Image from "next/image";
import { HomeView } from "./ui/views/home-view";
import UserRegister from "../(auth)/create-user/User-Register";

export default function Home() {
  return (
   <div className="">
        <HomeView/>
        <UserRegister/>
        
     </div>

  );
}
