import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const PopupRequireLogin: React.FC<Props> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-2 text-red-600">Thông báo</h2>
        <p className="text-sm text-gray-700">Bạn cần đăng nhập để sử dụng chức năng này.</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};
