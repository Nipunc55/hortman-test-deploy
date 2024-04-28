import MotherDetails from "../../../../molecules/donor/quickSetupQuestions/donor/MotherDetails";
import AddressDetails from "../../../../molecules/donor/quickSetupQuestions/donor/AddressDetails";
import FatherDetails from "../../../../molecules/donor/quickSetupQuestions/donor/FatherDetails";
import BankingDetails from "../../../../molecules/donor/quickSetupQuestions/donor/BankingDetails";
import SourceOfStem from "../../../../molecules/donor/quickSetupQuestions/donor/SourceOfStem";
import StemPackages from "../../../../molecules/donor/quickSetupQuestions/donor/StemPackages";
import ExpectedDelivery from "../../../../molecules/donor/quickSetupQuestions/donor/ExpectedDelivery";
import EducationalMaterialsQuickSetup from "../../../../../pages/donor/educational-material/educationalMaterialsQuickSetup";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../../../../redux/store";
import { updateStep } from "../../../../../redux/slices/QuickSetupGuideSlices";
import PublicBankingPackages from "../../../../molecules/donor/quickSetupQuestions/donor/PublicBankingPackages";

const DonorSetupGuide = () => {
  // const [step, setStep] = useState<number>(1);
  const dispatch = useDispatch();
  const step = useSelector((state: RootState) => state.quickSetupReducer.step);

  const setStep = (step: number) => {
    dispatch(updateStep(step));
  };
  return (
    <div className="flex items-center justify-center">
      {step === 1 ? (
        <div>
          <MotherDetails setStep={setStep} />
        </div>
      ) : step === 2 ? (
        <div>
          <AddressDetails setStep={setStep} />
        </div>
      ) : step === 3 ? (
        <div>
          <FatherDetails setStep={setStep} />
        </div>
      ) : step === 4 ? (
        <div>
          <EducationalMaterialsQuickSetup setStep={setStep} />
        </div>
      ) : step === 5 ? (
        <div>
          <SourceOfStem setStep={setStep} />
        </div>
      ) : step === 6 ? (
        <div>
          <BankingDetails setStep={setStep} />
        </div>
      ) : step === 7 ? (
        <div>
          <StemPackages setStep={setStep} />
        </div>
      ) : step === 8 ? (
        <div>
          <ExpectedDelivery setStep={setStep} />
        </div>
      ) : step === 9 ? (
        <div>
          <PublicBankingPackages setStep={setStep} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DonorSetupGuide;
