import { ChannelView } from '@/modules/home/ui/views/channel-view'
import { Suspense } from 'react'


function Page() {
  return (
    <div>  <Suspense fallback={<div>Loading...</div>}>
      <ChannelView />
    </Suspense>
                  

    </div>
  )
}

export default Page