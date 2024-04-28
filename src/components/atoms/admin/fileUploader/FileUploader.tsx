const FileUploader = ({
  heading = "File Uploader",
  buttonText = "Choose a file",
  selectedFile,
  handleFileChange,
  value,
  acceptType = "*/*"
}: {
  heading?: string;
  buttonText?: string;
  selectedFile: any;
  handleFileChange: any;
  value: string;
  acceptType?: string;
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="text-base">{heading}</div>
      <div className="flex items-center justify-between px-2 py-1.5 shadow-inner input-border">
        <span className="text-[#959DAD] text-xsxl">
          {/* {selectedFile
            ? (selectedFile.name || "").substring(0, 10) + "....."
            : "Upload a file..."} */}
          {selectedFile ? "uploaded" : "Upload a file..."}
        </span>

        <label className="text-white bg-[#959DAD] rounded-lg py-1.5 px-4.5 scale-95 cursor-pointer">
          {buttonText}
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            value={value}
            accept={acceptType}
          />
        </label>
      </div>
    </div>
  );
};

export default FileUploader;
