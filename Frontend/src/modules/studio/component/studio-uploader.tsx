import MuxUploader from "@mux/mux-uploader-react";

interface StudioUploaderProps {
  endpoint: string;
  onSuccess: () => void;
}

export const StudioUpLoader = ({ endpoint, onSuccess }: StudioUploaderProps) => {
  return (
    <div>
      <MuxUploader
        endpoint={endpoint}
        onSuccess={onSuccess} // ✅ đúng tên prop
      />
    </div>
  );
};
