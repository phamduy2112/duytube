export const categoryNames = [
    { id: "1", name: "Comedy" },
    { id: "2", name: "Education" },
    { id: "3", name: "Technology" },
    { id: "4", name: "Music" },
    { id: "5", name: "Travel" },
    { id: "6", name: "Gaming" },
    { id: "7", name: "Sports" },
    { id: "8", name: "News" },
    { id: "9", name: "Lifestyle" },
    { id: "10", name: "Science" },
    { id: "11", name: "Health" },
    { id: "12", name: "Business" },
    { id: "13", name: "Art" },
    { id: "14", name: "History" },
    { id: "15", name: "Nature" },
    { id: "16", name: "Fashion" },
    { id: "17", name: "Food" },
    { id: "18", name: "DIY" },
    { id: "19", name: "Animation" },
    { id: "20", name: "Spirituality" },
  ];
export const mockUsers = [
  { id: "1", name: "Nguyễn Văn A" ,
    subscriberCount:3,
    videoCount:4,
    clerkId:1,
    bannerUrl:"https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/495829766_3798618053688350_7263700441877599386_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=RzUOGY55YLwQ7kNvwEshM1E&_nc_oc=AdmBhQritYhokjOBABxavxOuWpAX3CbI3dpFL_6UqtFMF--S-Z6V0PBBxOvi4-RzDybzvu6LKfMITBGCJlqbpxxD&_nc_zt=23&_nc_ht=scontent.fsgn8-3.fna&_nc_gid=8f0KTX6YQGl7E7_0QezX1g&oh=00_AfIniVQ1W7Gg54rgraPQ6Ur9hNIkDDtGYWMb8OxhxH1wEw&oe=6826555D"},
  { id: "2", name: "Trần Thị B" },
  { id: "3", name: "Lê Văn C" }
];


export const subscriptions = [
  {
    creatorId: "1",
    viewerID: "101",
    user: {
      id: "1",
      name: "Nguyễn Văn A",
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg"
    }
  },
  {
    creatorId: "2",
    viewerID: "101",
    user: {
      id: "2",
      name: "Trần Thị B",
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg"
    }
  },
  {
    creatorId: "3",
    viewerID: "101",
    user: {
      id: "3",
      name: "Phạm Văn C",
      imageUrl: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  }
];

  export const mockVideos = [
    {
      id: "1",
      title: "Hướng dẫn React cơ bản",
      description: "Video hướng dẫn cách dùng React từ cơ bản đến nâng cao.",
      url: "https://example.com/videos/react-basic.mp4",
      thumbnail: "https://example.com/thumbnails/react-basic.jpg",
      duration: 600,
      createAt: "2024-05-01T10:00:00Z",
      viewCount: 1250,
      category: "Lập trình",
      visibility: "public",
      user: {
        id: "u1",
        name: "Nguyễn Văn A",
        avatar: "https://example.com/avatars/user1.jpg"
      }
    },
    {
      id: "2",
      title: "Tạo API với Node.js và Express",
      description: "Video hướng dẫn cách tạo REST API đơn giản.",
      url: "https://example.com/videos/node-api.mp4",
      thumbnail: "https://example.com/thumbnails/node-api.jpg",
      duration: 720,
      createAt: "2024-04-15T14:30:00Z",
      viewCount: 980,
      category: "Lập trình",
      visibility: "unlisted",
      user: {
        id: "u2",
        name: "Trần Thị B",
        avatar: "https://example.com/avatars/user2.jpg"
      }
    },
    {
      id: "3",
      title: "Những khoảnh khắc hài hước trên mạng",
      description: "Tổng hợp video hài hước viral nhất tuần qua.",
      url: "https://example.com/videos/funny-clips.mp4",
      thumbnail: "https://example.com/thumbnails/funny-clips.jpg",
      duration: 300,
      createAt: "2024-04-28T08:45:00Z",
      viewCount: 21500,
      category: "Giải trí",
      visibility: "public",
      user: {
        id: "u3",
        name: "Lê Văn C",
        avatar: "https://example.com/avatars/user3.jpg"
      }
    },
    {
      id: "4",
      title: "Tin tức công nghệ 2025",
      description: "Tóm tắt những tin tức nổi bật trong ngành công nghệ đầu năm 2025.",
      url: "https://example.com/videos/tech-news.mp4",
      thumbnail: "https://example.com/thumbnails/tech-news.jpg",
      duration: 480,
      createAt: "2025-01-01T09:00:00Z",
      viewCount: 4200,
      category: "Tin tức",
      visibility: "private",
      user: {
        id: "u4",
        name: "Phạm Thị D",
        avatar: "https://example.com/avatars/user4.jpg"
      }
    },
    {
      id: "5",
      title: "Tin tức công nghệ 2025",
      description: "Tóm tắt những tin tức nổi bật trong ngành công nghệ đầu năm 2025.",
      url: "https://example.com/videos/tech-news.mp4",
      thumbnail: "https://example.com/thumbnails/tech-news.jpg",
      duration: 480,
      createAt: "2025-01-01T09:00:00Z",
      viewCount: 4200,
      category: "Tin tức",
      visibility: "private",
      user: {
        id: "u4",
        name: "Phạm Thị D",
        avatar: "https://example.com/avatars/user4.jpg"
      }
    },
    {
      id: "6",
      title: "Tin tức công nghệ 2025",
      description: "Tóm tắt những tin tức nổi bật trong ngành công nghệ đầu năm 2025.",
      url: "https://example.com/videos/tech-news.mp4",
      thumbnail: "https://example.com/thumbnails/tech-news.jpg",
      duration: 480,
      createAt: "2025-01-01T09:00:00Z",
      viewCount: 4200,
      category: "Tin tức",
      visibility: "private",
      user: {
        id: "u4",
        name: "Phạm Thị D",
        avatar: "https://example.com/avatars/user4.jpg"
      }
    },
  ];
  