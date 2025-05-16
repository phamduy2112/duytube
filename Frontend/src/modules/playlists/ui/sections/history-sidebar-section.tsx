import { Input } from "@/components/ui/input"
import { Trash2, Pause, Settings } from "lucide-react"

export const HistorySidebar = () => {
  return (
    <div className=" p-4  space-y-4 text-sm">
      {/* Search */}
      <Input placeholder="Tìm kiếm trong danh sách video ..." className="text-sm" />

      {/* Options */}
      <ul className="space-y-2">
        <li className="flex items-center gap-2 cursor-pointer hover:underline">
          <Trash2 size={16} /> <span>Xoá tất cả nhật ký xem</span>
        </li>
      
      </ul>

    
    </div>
  )
}
