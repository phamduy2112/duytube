import { useUser } from "@clerk/nextjs"
import { useState } from "react";
import { PopupRequireLogin } from "./modal-sign";

export const RequireLoginWrapper=({children})=>{
    const {isSignedIn}=useUser();
    const [showPopup,setShowPopup]=useState(false);
     const handleClick = (e: React.MouseEvent) => {
    if (!isSignedIn) {
      e.preventDefault();
      setShowPopup(true);
    }
  };
    return (
    <>
      <div onClick={handleClick}>
        {children}
      </div>
      <PopupRequireLogin open={showPopup} onClose={() => setShowPopup(false)} />
    </>
  );
}