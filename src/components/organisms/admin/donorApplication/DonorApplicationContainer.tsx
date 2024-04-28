import { Button, ButtonGroup, Tabs, TabsBody } from "@material-tailwind/react";
import { useState } from "react";
import DonorDetails from "./DonorDetails";
import Questionnaire from "./Questionnaire";
import Payments from "./Payments";
import Certificate from "./Certificate";
import { t } from "i18next";
import {
  CERTIFICATE,
  DONOR_DETAILS,
  ELIGIBILITYASSESSMENT,
  KITSTATUS,
  PAYMENTS,
  QUESTIONNAIRE,
  UCUNITSTATUS
} from "../../../../utils/constants/common";
import TableTitle from "../../../atoms/admin/typography/TableTitle";

// import ApplicationRejectionModal from "../../../molecules/admin/modals/ApplicationRejectionModal";
// import ApplicationNotificationModal from "../../../molecules/admin/modals/ApplicationNotificationModal";
import DoneIcon from "../../../../assets/svg/doneIcon";
import NotDoneIcon from "../../../../assets/svg/notDoneIcon";
import EligibiltyAssessment from "./EligibiltyAssessment";
import KitStatus from "./KitStatus";
import UnitStatus from "./UnitStatus";

const DonorApplicationContainer = () => {
  // const [isRejectionModalOpen, setIsRejectionModalOpen] =
  //   useState<boolean>(false);
  // const [isNotificationModalOpen, setIsNotificationModalOpen] =
  //   useState<boolean>(false);
  const [selectedTab, setselectedTab] = useState<string>(DONOR_DETAILS);

  const handleTabChange = (tab: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setselectedTab(tab);
  };

  return (
    <div className="container">
      <div className="bg-tableBg w-full py-5 h-full rounded-xl shadow-lg my-5 mb-16">
        <div className="flex justify-between items-center px-5">
          <TableTitle
            text={`${t("donor-applications")}`}
            textSize="text-6xl"
            color="text-textSecondary"
          />
        </div>
        <div className="border-t-2 mt-4 border-secondary">
          <div className="flex w-max mt-5 mx-auto justify-center items-center">
            <ButtonGroup
              placeholder={""}
              variant="outlined"
              size="sm"
              className="gold-gradient-button-group border border-transparent rounded-lg w-full h-10"
            >
              <Button
                placeholder={""}
                onClick={() => setselectedTab(DONOR_DETAILS)}
                className={`flex items-center px-2 gap-3 ${
                  selectedTab === DONOR_DETAILS
                    ? "gold-gradient-button-group-active"
                    : "gold-gradient-button-group"
                } normal-case shadow-none border-transparent text-black-500 text-xs font-medium`}
              >
                {selectedTab === DONOR_DETAILS ? <DoneIcon /> : <NotDoneIcon />}
                {t("donor-details")}
              </Button>
              <Button
                placeholder={""}
                onClick={() => setselectedTab(QUESTIONNAIRE)}
                className={`flex items-center px-2 gap-3 ${
                  selectedTab === QUESTIONNAIRE
                    ? "gold-gradient-button-group-active"
                    : "gold-gradient-button-group"
                } normal-case shadow-none border-transparent text-black-500 text-xs font-medium`}
              >
                {selectedTab === QUESTIONNAIRE ? <DoneIcon /> : <NotDoneIcon />}
                {t("questionnaire")}
              </Button>
              <Button
                placeholder={""}
                onClick={() => setselectedTab(ELIGIBILITYASSESSMENT)}
                className={`flex items-center px-2 gap-3 ${
                  selectedTab === ELIGIBILITYASSESSMENT
                    ? "gold-gradient-button-group-active"
                    : "gold-gradient-button-group"
                } normal-case shadow-none border-transparent text-black-500 text-xs font-medium`}
              >
                {selectedTab === ELIGIBILITYASSESSMENT ? (
                  <DoneIcon />
                ) : (
                  <NotDoneIcon />
                )}
                {t("eligibility-assessment")}
              </Button>
              <Button
                placeholder={""}
                onClick={() => setselectedTab(PAYMENTS)}
                className={`flex items-center px-2 gap-3 ${
                  selectedTab === PAYMENTS
                    ? "gold-gradient-button-group-active"
                    : "gold-gradient-button-group"
                } normal-case shadow-none border-transparent text-black-500 text-xs font-medium`}
              >
                {selectedTab === PAYMENTS ? <DoneIcon /> : <NotDoneIcon />}
                {t("payment")}
              </Button>
              <Button
                placeholder={""}
                onClick={() => setselectedTab(KITSTATUS)}
                className={`flex items-center px-2 gap-3 ${
                  selectedTab === KITSTATUS
                    ? "gold-gradient-button-group-active"
                    : "gold-gradient-button-group"
                } normal-case shadow-none border-transparent text-black-500 text-xs font-medium`}
              >
                {selectedTab === KITSTATUS ? <DoneIcon /> : <NotDoneIcon />}
                {t("kit-status")}
              </Button>
              <Button
                placeholder={""}
                onClick={() => setselectedTab(UCUNITSTATUS)}
                className={`flex items-center px-2 gap-3 ${
                  selectedTab === UCUNITSTATUS
                    ? "gold-gradient-button-group-active"
                    : "gold-gradient-button-group"
                } normal-case shadow-none border-transparent text-black-500 text-xs font-medium`}
              >
                {selectedTab === UCUNITSTATUS ? <DoneIcon /> : <NotDoneIcon />}
                {t("unit-status")}
              </Button>

              <Button
                placeholder={""}
                onClick={() => setselectedTab(CERTIFICATE)}
                className={`flex items-center px-2 gap-3  ${
                  selectedTab === CERTIFICATE
                    ? "gold-gradient-button-group-active"
                    : "gold-gradient-button-group"
                } normal-case shadow-none border-transparent text-black-500 text-xs font-medium`}
              >
                {selectedTab === CERTIFICATE ? <DoneIcon /> : <NotDoneIcon />}
                {t("storage-certificate")}
              </Button>
            </ButtonGroup>
          </div>
          <Tabs value="html">
            <TabsBody placeholder={""}>
              <>
                {selectedTab === DONOR_DETAILS ? (
                  <DonorDetails onTabChange={handleTabChange} />
                ) : selectedTab === QUESTIONNAIRE ? (
                  <Questionnaire onTabChange={handleTabChange} />
                ) : selectedTab === ELIGIBILITYASSESSMENT ? (
                  <EligibiltyAssessment />
                ) : selectedTab === PAYMENTS ? (
                  <Payments />
                ) : selectedTab === KITSTATUS ? (
                  <KitStatus />
                ) : selectedTab === UCUNITSTATUS ? (
                  <UnitStatus />
                ) : selectedTab === CERTIFICATE ? (
                  <Certificate />
                ) : null}
              </>
            </TabsBody>
          </Tabs>
          {/* Components go here */}
        </div>
      </div>
      {/* <ApplicationRejectionModal
        open={isRejectionModalOpen}
        handleOpen={setIsRejectionModalOpen}
      /> */}
      {/* need to add a reciever ID */}
      {/* <ApplicationNotificationModal
        receiverId={""}
        open={isNotificationModalOpen}
        handleOpen={setIsNotificationModalOpen}
      /> */}
    </div>
  );
};

export default DonorApplicationContainer;
