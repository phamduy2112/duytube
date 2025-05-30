import React, { useState } from 'react';
import { Lock, Globe, Plus, X } from 'lucide-react';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useUser } from '@clerk/nextjs';
import { PlaylistsService } from '@/service/axios/playlists/playlists.service';
import { toast } from 'sonner';

// const playlists = [
//   { id: 1, name: 'Xem sau', locked: false },
//   { id: 2, name: 'J', locked: true },
//   { id: 3, name: 'L', locked: true },
//   { id: 4, name: 'Mm', locked: true },
//   { id: 5, name: 'J', locked: true },
//   { id: 6, name: 'J', locked: true },
//   { id: 7, name: 'J', locked: true },
//   { id: 8, name: 'J', locked: false, isPublic: true },
// ];

interface SaveToPlaylistModalProps {
  onClose: () => void;
  
}

const SaveToPlaylistModal = ({ onClose,setPage,videoId }:any) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
const {user}=useUser();
  const toggleSelect = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const {data:playlists}=useQuery({
    queryKey:["playlists",user?.id],
    queryFn:()=>PlaylistsService.getUserPlaylists(user!.id),
    enabled:!!user?.id

  })
  // const queryClient=QueryClient()
  const createPlaylistMutation = useMutation({
    mutationFn: (data: {
      video_id: string;
      selected:any[]
    }) => PlaylistsService.createVideoPaylist(data),
    onSuccess: () => {

      
      // queryClient.invalidateQueries({ queryKey: ['playlists'] }); // nếu bạn có query get playlists
    
    },
    onError: () => {
      toast.error('Tạo playlist thất bại!');
    },
  });
//  createPlaylistMutation.mutate({
//       video_id: videoId,
//       selected: selected,
//     });

// console.log(
//   {
//       video_id: videoId,
//       selected: selected,
//     }
// )
  console.log(playlists)

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl  w-[100%] max-w-md max-h-[80vh] overflow-y-auto p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-medium mb-4">Lưu video vào...</h2>

{
  playlists?.data?.length>0 ? (
    playlists?.data?.map((item:any) => (
  <div key={item.id} className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={selected.includes(item.id)}
        onChange={() => toggleSelect(item.id)}
      />
      <span>{item.title	}</span>
    </div>
    <div>
      {item.locked ? (
        <Lock className="text-gray-500 w-4 h-4" />
      ) : item.isPublic ? (
        <Globe className="text-gray-500 w-4 h-4" />
      ) : null}
    </div>
  </div>
))
  ):(
    <>
    Chua co danh sach phat
    </>
  )
}
{
  selected.length>0 &&(
    <button
  onClick={() => {
    createPlaylistMutation.mutate({
      video_id: videoId,
      selected: selected,
    });
  }}
>
  Lưu
</button>
  )
}
<button
  onClick={() => setPage(2)}
  className="mt-3 w-full border rounded-lg py-2 text-blue-600 hover:bg-gray-100 flex items-center justify-center gap-2"
>
  <Plus size={16} />
  Danh sách phát mới
</button>
      </div>
    </div>
  );
};

export default SaveToPlaylistModal;
