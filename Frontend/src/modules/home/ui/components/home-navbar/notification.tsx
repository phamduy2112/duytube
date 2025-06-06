import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { UserAvatar } from '@/components/user-avatar'
import { Bell } from 'lucide-react'
import React, { useState } from 'react'

function Notification() {
  return (
    <div> 
<DropdownMenu >
  <DropdownMenuTrigger><Bell/></DropdownMenuTrigger>
  <DropdownMenuContent className='w-[500px]' align='end'>
    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
        <div>
               <div className="flex gap-3">
                 <div>
                        <UserAvatar
                        imageUrl="https://yt3.ggpht.com/yti/ANjgQV9lu9ZqUHoOmFdhvvuoE9kZFb5QMHvTSQs5hIXfyacQgA=s88-c-k-c0x00ffffff-no-rj"
                        name="duy"
                        />
                    </div>
               <div>
                <div>
            <p>                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci placeat molestias blanditiis fugiat dolore? Quis vitae temporibus dolore quasi illo? Veniam obcaecati tenetur tempora! Fuga ratione at ea possimus aperiam!
</p>
<p>2 hours</p>
                </div>

               </div>
                 </div>
        </div>
    </DropdownMenuItem>
  
  </DropdownMenuContent>
</DropdownMenu>
      </div>
  )
}

export default Notification