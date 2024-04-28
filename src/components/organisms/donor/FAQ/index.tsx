import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import AccordionSection from "../../../atoms/donor/accordion";
import { dummyFAQdata } from "../../../../data/donor/dummyFAQdata";

const FAQSection = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/quick-setup");
  };
  return (
    <div className="faq-container mx-auto ">
      <div className="text-primary text-5xl font-medium text-center pt-6 pb-5">
        {t("mothers-details")}
      </div>
      <AccordionSection data={dummyFAQdata} />
      <div className="w-full flex justify-center pt-7 pb-8">
        <Button
          placeholder={""}
          className="faq-section-button text-xsxl  font-medium uppercase text-black-500 px-10 min-w-[284px]"
          onClick={handleOnClick}
        >
          {t("continue-to-registration")}
        </Button>
      </div>
    </div>
  );
};

export default FAQSection;
