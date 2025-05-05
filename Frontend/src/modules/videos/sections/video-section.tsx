import { mockVideos } from "@/scripts/seed-catelogries";

const VideoSection = ({ videoId }) => {
  const videoDetail = mockVideos.find((item) => item.id === String(videoId));

  if (!videoDetail) {
    return <div>Không tìm thấy video.</div>;
  }

  return (
    <div>
      <h2>{videoDetail.title}</h2>
      <p>{videoDetail.description}</p>
      <video controls width="640">
        <source src={videoDetail.url} type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ video.
      </video>
      <p>Thể loại: {videoDetail.category}</p>
      <p>Lượt xem: {videoDetail.views}</p>
      <p>Hiển thị: {videoDetail.visibility}</p>
    </div>
  );
};

export default VideoSection;
