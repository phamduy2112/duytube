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
export const mockComments = [
  {
    id: "1",
    userId: "1",
    user: {
      name: "John Doe",
      imageUrl: "https://i.pravatar.cc/150?img=1"
    },
    value: "This is a comment.",
    createAt: "2025-05-12T12:34:56Z",
    replyCount: 2,
    videoId: "video_1",
    replies: [
      {
        id: "1-1",
        userId: "2",
        user: {
          name: "Jane Smith",
          imageUrl: "https://i.pravatar.cc/150?img=2"
        },
        value: "This is a reply to the comment.",
        createAt: "2025-05-12T13:00:00Z",
        videoId: "video_1",
      },
      {
        id: "1-2",
        userId: "3",
        user: {
          name: "Alice Johnson",
          imageUrl: "https://i.pravatar.cc/150?img=3"
        },
        value: "Another reply to the comment.",
        createAt: "2025-05-12T14:00:00Z",
        videoId: "video_1",
      }
    ]
  },
  {
    id: "2",
    userId: "4",
    user: {
      name: "Bob Lee",
      imageUrl: "https://i.pravatar.cc/150?img=4"
    },
    value: "Here is another comment.",
    createAt: "2025-05-12T15:00:00Z",
    replyCount: 0,
    videoId: "video_2",
    replies: []
  }
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
  