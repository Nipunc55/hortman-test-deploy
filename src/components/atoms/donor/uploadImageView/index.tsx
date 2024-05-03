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
            <ImageRow
              idImage={passportFirstPage}
              name={"Passport (First page)"}
            />
          )}
          {emiratedIDFront && typeof emiratedIDFront === "string" && (
            <ImageRow
              idImage={emiratedIDFront}
              name={"Emirates ID (Front side)"}
            />
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
