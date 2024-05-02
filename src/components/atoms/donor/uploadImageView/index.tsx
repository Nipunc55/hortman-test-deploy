import { DownloadIcon } from "../../../../assets/svg/downloadButton";

export function UploadImageView({
  passportFirstPage,
  emiratedIDFront,
  emiratedIDBack
}: {
  passportFirstPage: string;

  emiratedIDFront: string;

  emiratedIDBack: string;
}) {
  let isViewAvailable =
    (passportFirstPage !== null && typeof passportFirstPage === "string") ||
    (emiratedIDFront !== null && typeof emiratedIDFront === "string") ||
    (emiratedIDBack !== null && typeof emiratedIDBack === "string");

  return (
    <div className="">
      {isViewAvailable && (
        <>
          <div className="mt-6 text-2xl font-medium mb-2 ">
            Uploaded Documents
          </div>
          {passportFirstPage && typeof passportFirstPage === "string" && (
            <div className="border-b-[1px] border-b-secondary mb-2 ">
              <div className="flex justify-between items-center pt-2 ">
                <div>Passport (First page)</div>
                <a
                  href={passportFirstPage}
                  download="image.jpg"
                  target="_blank"
                >
                  <DownloadIcon />
                </a>
              </div>
            </div>
          )}
          {emiratedIDFront && typeof emiratedIDFront === "string" && (
            <div className="border-b-[1px] border-b-secondary mb-2 ">
              <div className="flex justify-between items-center pt-2">
                <div>Emirates ID (Front side)</div>
                <a href={emiratedIDFront} download="image.jpg" target="_blank">
                  <DownloadIcon />
                </a>
              </div>
            </div>
          )}
          {emiratedIDBack && typeof emiratedIDBack === "string" && (
            <ImageRow
              idImage={emiratedIDBack}
              name={"Emirates ID (Back side)"}
            />
          )}
        </>
      )}
    </div>
  );
}
function ImageRow({ idImage, name }) {
  return (
    <div className="border-b-[1px] border-b-secondary mb-2 ">
      <div className="flex justify-between items-center pt-2">
        <div>{name}</div>
        <a href={idImage} download="image.jpg" target="_blank">
          <DownloadIcon />
        </a>
      </div>
    </div>
  );
}
