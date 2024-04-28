import { Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";
import EducationalMaterialArticleVideo from "./video";
import EducationalMaterialVideoGridCard from "../../../../atoms/donor/cards/educationalMaterialVideoGridCard";

const VideoSection = ({ data }: { data: any }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const getDateValue = (dateInput: string) => {
    const inputDate = new Date(dateInput);

    const options: any = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };

    return inputDate.toLocaleDateString("en-US", options);
  };

  return (
    <div className="grid grid-cols-3 gap-x-gap17 gap-y-gap59 px-7">
      {data?.map((item: any) => (
        <div key={item._id}>
          <div onClick={handleOpen}>
            <EducationalMaterialVideoGridCard
              id={item._id}
              date={getDateValue(item.created_at)}
              title={item?.title}
              key={item._id}
              videoPath={item?.url}
            />
          </div>
          <Dialog open={open} handler={handleOpen} placeholder={""}>
            <DialogBody placeholder={""}>
              <EducationalMaterialArticleVideo url={item.url} />
            </DialogBody>
          </Dialog>
        </div>
      ))}
    </div>
  );
};

export default VideoSection;
