import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PlaylistsService } from '@/service/axios/playlists/playlists.service';
import { useUser } from '@clerk/nextjs';


type PrivacyOption = 'Riêng tư' | 'Không công khai' | 'Công khai';

interface Props {
  onCancel: () => void;
  setPage?: (page: string) => void;
  videoId:string;
}

const CreatePlaylistForm: React.FC<Props> = ({ onCancel, setPage,videoId }) => {
  const [title, setTitle] = useState('');
  const [privacy, setPrivacy] = useState<PrivacyOption>('Riêng tư');
  const [collaborative, setCollaborative] = useState(false);

  const queryClient = useQueryClient();
  const {user}=useUser();
  const createPlaylistMutation = useMutation({
    mutationFn: (data: {
      title: string;
      description?: string;
      user_id: string;
      video_id:string;
    }) => PlaylistsService.createPlaylist(data),
    onSuccess: () => {

      
      toast.success('Tạo playlist thành công!');
      queryClient.invalidateQueries({ queryKey: ['playlists'] }); // nếu bạn có query get playlists
      setTitle('');
      setPrivacy('Riêng tư');
      setCollaborative(false);
      if (setPage) setPage('list');
    },
    onError: () => {
      toast.error('Tạo playlist thất bại!');
    },
  });

  const handleSubmit = () => {
    if (!title.trim()) return;

    createPlaylistMutation.mutate({
      title: title.trim(),
      description:"null",
      user_id:String(user?.id ),
      video_id:String(videoId)
   });
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Danh sách phát mới</h2>

      <input
        type="text"
        placeholder="Chọn một tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring focus:border-blue-500"
      />

      <select
        value={privacy}
        onChange={(e) => setPrivacy(e.target.value as PrivacyOption)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring focus:border-blue-500"
      >
        <option value="Riêng tư">Riêng tư</option>
        <option value="Không công khai">Không công khai</option>
        <option value="Công khai">Công khai</option>
      </select>

      <div className="flex items-center justify-between mb-4">
        <span>Cộng tác</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={collaborative}
            onChange={(e) => setCollaborative(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md peer-checked:translate-x-5 transition-transform"></div>
        </label>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
        >
          Hủy
        </button>
        <button
          onClick={handleSubmit}
          disabled={!title.trim() || createPlaylistMutation.isPending}
          className={`px-4 py-2 rounded-md text-white ${
            !title.trim() || createPlaylistMutation.isPending
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {createPlaylistMutation.isPending ? 'Đang tạo...' : 'Tạo'}
        </button>
      </div>
    </div>
  );
};

export default CreatePlaylistForm;
