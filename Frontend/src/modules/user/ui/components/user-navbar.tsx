'use client'
import React, { useState } from 'react';
interface NavbarProps {
  activeItem: string;
  handleItemClick: (item: string) => void;
}
const Navbar = ({activeItem,handleItemClick}:NavbarProps) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  // Hàm thay đổi trạng thái khi hover vào item
  const handleMouseEnter = (item:any) => {
    setHoveredItem(item);
  };

  // Hàm reset trạng thái khi rời khỏi item
  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  // Hàm để set active khi click vào item
 

  return (
    <nav className="border-b mt-[.25rem]">
      <ul className="flex space-x-8 py-2 relative">
        {['Trang chủ', 'Video', 'Danh sách phát', 'Bài đăng'].map((item, index) => (
          <li
            key={index}
            className="relative group"
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleItemClick(item)} // Thêm sự kiện click
          >
            <a
              href="#"
              className={`font-[400] ${hoveredItem === item || activeItem === item ? 'text-black font-medium' : 'hover:text-black'}`}
            >
              {item}
            </a>
            <div
              className={`absolute left-0 right-0 top-9 h-0.5 bg-black scale-x-0  ${
                hoveredItem === item || activeItem === item ? 'scale-x-100' : ''
              }`}
            ></div>
          </li>
        ))}
        <li>
          <button className="text-gray-600 hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
