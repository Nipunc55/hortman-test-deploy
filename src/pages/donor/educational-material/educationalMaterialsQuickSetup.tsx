import EducationalMaterialTable from "../../../components/organisms/donor/educational-material/educationalMaterialTable";
import { Button } from "@material-tailwind/react";
import { t } from "i18next";

const EducationalMaterialsQuickSetup = ({
  setStep
}: {
  setStep: (step: number) => void;
}) => {
  const handleContinue = () => {
    setStep(5);
  };
  return (
    <div className="container mx-auto flex justify-center mb-16">
      <EducationalMaterialTable />
      <div className="fixed bottom-1 p-4 py-2 mx-10 edu-modal">
        <div className="w-full mx-auto text-center flex items-center gap-6">
          <span className="text-white text-base font-normal">
            Please restart your donor journey by continuing to complete your
            application
          </span>
          <Button
            placeholder={""}
            onClick={handleContinue}
            className="rounded-[17.5px] flex justify-center bg-gradient-to-r from-[#9A793D] to-[#DFC073] shadow-none text-xsxl font-normal text-white hover:scale-95 duration-500"
          >
            {t("continue")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EducationalMaterialsQuickSetup;
