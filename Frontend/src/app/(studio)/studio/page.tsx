import { StudioView } from "@/modules/studio/ui/view/studio-view";
import Image from "next/image";
export const dynamic="force-dynamic";

export default function Studio() {
  return (
   <div className="pt-16 ">
        {/* StudioView */}
        <StudioView/>
     </div>

  );
}
