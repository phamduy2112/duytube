import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface Props {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSearch: () => void;
}
export const HistorySidebarSkeleton = () => {
  return (
    <div className="p-4 space-y-4 text-sm animate-pulse">
      {/* Skeleton for Input */}
      <div className="h-9 bg-gray-300 rounded-md" />

      {/* Skeleton for Trash item */}
      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded" />
          <div className="h-4 bg-gray-300 rounded w-3/4" />
        </li>
      </ul>
    </div>
  );
};

export const HistorySidebar = ({ inputValue, setInputValue, onSearch }: Props) => {  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(); // gọi hàm khi nhấn Enter
    }
  };
  return (
    <div className="p-4 space-y-4 text-sm">
      <Input
        placeholder="Tìm kiếm trong danh sách video ..."
        className="text-sm"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <ul className="space-y-2">
        <li className="flex items-center gap-2 cursor-pointer hover:underline">
          <Trash2 size={16} /> <span>Xoá tất cả nhật ký xem</span>
        </li>
      </ul>
    </div>
  );
};
