import UploadImageIcon from "../../../../../assets/svg/uploadImageIcon";

const UploadImage = ({
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
        Set cover image
        <input
          type="file"
          id="img"
          name="img"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
          value={value}
        />
      </label>
      {selectedFile ? (selectedFile.name || "").substring(0, 10) + "....." : ""}
    </div>
  );
};

export default UploadImage;
