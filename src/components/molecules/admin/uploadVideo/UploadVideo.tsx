import UploadImageIcon from "../../../../assets/svg/uploadImageIcon";

const UploadVideo = ({
  selectedFile,
  handleChange,
  value
}: {
  selectedFile: any;
  handleChange: any;
  value: any;
}) => {
  return (
    <div className="w-full p-4 rounded-lg flex flex-col justify-between items-center">
      <div className="flex space-x-5 items-center">
        <UploadImageIcon />
      </div>
      <label className="w-full h-full cursor-pointer text-[#959DAD] text-xsxl font-normal flex justify-center items-center">
        Add the video
        <input
          type="file"
          className="hidden"
          onChange={handleChange}
          value={value}
          accept="video/*"
        />
      </label>
      {selectedFile ? (selectedFile.name || "").substring(0, 10) + "....." : ""}
    </div>
  );
};

export default UploadVideo;
