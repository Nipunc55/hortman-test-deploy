import { Link } from "react-router-dom";
import ActionButton from "../../../../atoms/admin/buttons/ActionButton";
import DropDownArrow from "../../../../../assets/svg/dropDownArrow";

const EducationalMaterialTableRows = ({ data }: { data: any }) => {
  const getDateValue = (dateInput: string) => {
    const inputDate = new Date(dateInput);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    };

    const formattedDate = inputDate.toLocaleDateString("en-UK", options);

    const [day, month, year] = formattedDate.split("/");

    const rearrangedDate = `${year}/${month}/${day}`;

    return rearrangedDate;
  };

  const getTimeValue = (dateInput: string) => {
    const inputDate = new Date(dateInput);
    const options: any = {
      hour: "numeric",
      minute: "numeric"
    };
    return inputDate.toLocaleTimeString("en-US", options);
  };

  return (
    <>
      {data?.length > 0 ? (
        <>
          {data.map((item: any) => (
            <>
              <div
                key={item._id}
                className="py-4 border-t-2 border-secondary flex flex-row font-normal"
              >
                <div className="flex-[4] flex items-center">
                  {item?.title ?? ""}
                </div>
                <div className="flex-[1.5] flex justify-start items-center gap-1">
                  <span>{item?.author?.role ?? ""}</span>
                </div>
                <div className="flex-[1.2] flex items-center">
                  {(item?.postType === "ARTICLES" && "Article") ||
                    (item?.postType === "Article" && "Article")}
                  {(item?.postType === "VIDEOS" && "Video") ||
                    (item?.postType === "Video" && "Video")}
                </div>
                <div className="flex-[2.5] flex items-start flex-col">
                  <span>{item?.status === "PENDING" && "Pending"}</span>
                  <span>{item?.status === "PUBLISHED" && "Published"}</span>
                  <div className="flex gap-1.5">
                    <div>{getDateValue(item.created_at) ?? ""}</div> At{" "}
                    <div>{getTimeValue(item.created_at) ?? ""}</div>
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <Link
                    to={`/admin/educational-material/educational-material-article/${item?._id}`}
                  >
                    <button className="outline-none">
                      <ActionButton
                        endIcon={<DropDownArrow />}
                        text={"Action"}
                        onclick={() => {}}
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </>
          ))}
        </>
      ) : (
        <>
          <div className="w-full my-10 h-20">
            <p className="absolute text-center mx-auto italic right-0 left-0 w-full">
              There are no data to be displayed
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default EducationalMaterialTableRows;
