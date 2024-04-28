import { t } from "i18next";
import DropDownArrow from "../../../../assets/svg/dropDownArrow";
import PlusIcon from "../../../../assets/svg/plusIcon";
import {
  Alert,
  Dialog,
  DialogBody,
  DialogHeader
} from "@material-tailwind/react";
import RoundedCloseIcon from "../../../../assets/svg/RoundedCloseIcon";
import InputField from "../../../atoms/admin/inputField/InputField";
import TextAreaInput from "../../../atoms/admin/inputs/TextAreaInput";
import { PopupFormSubmitButton } from "../../../atoms/admin/buttons/PopupButtons";
import { useEffect, useState } from "react";
import { createInvoice } from "../../../../api/payment";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { getDonorApplicationById } from "../../../../api/donor_application";
import { getLocationByApplicationId } from "../../../../api/location";

const DonorApplicationPaymentTableHeader = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [packageValue, setPackage] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);
  const [price, setPrice] = useState<any>(null);

  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  const userId = useParams();
  // console.log(userId.name);

  const getDonorApplication = async () => {
    if (userId.name) {
      const response = await getDonorApplicationById(userId.name);
      if (response.apiSuccess) {
        const apiSuccess = response.apiSuccess as any;
        // console.log(apiSuccess?.data?.data);
        setPrice(apiSuccess?.data?.data?.package?.price);
        setPackage(apiSuccess?.data?.data?.package?._id);
      }
    }
  };

  console.log(typeof packageValue + "package");

  const getLocation = async () => {
    if (userId.name) {
      const response = await getLocationByApplicationId(userId.name);
      if (response.apiSuccess) {
        const apiSuccess = response.apiSuccess as any;
        // console.log(apiSuccess?.data?.data?.country);
        setLocation(apiSuccess?.data?.data?.country);
      }
    }
  };

  useEffect(() => {
    void getDonorApplication();
    void getLocation();
  }, [userId.name]);

  const initialvalues = {
    invoice: "",
    amount: Number(price),
    description: "",
    application: String(userId.name),
    package: String(packageValue),
    location: String(location)
  };

  const formik = useFormik({
    initialValues: initialvalues,
    onSubmit: async (values, e) => {
      console.log(values);
      setIsError(false);
      setIsLoading(true);

      const { apiSuccess, apiError }: any = await createInvoice(
        values.invoice,
        values.amount,
        values.description,
        values.application,
        values.package,
        values.location
      );

      setIsLoading(false);

      if (apiSuccess) {
        setIsLoading(false);
        resetForm(e);
        handleClose();
      } else if (apiError) {
        setMessage(apiError.response.data.message);
        setIsError(true);
        setIsLoading(false);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    },
    validateOnChange: false
  });

  const resetForm = (e: any) => {
    formik.handleReset(e);
  };

  const { values } = formik;

  return (
    <div>
      <div className="flex justify-end items-end">
        <div className="py-8 px-6">
          <button
            className="w-full h-10 px-6 py-2 bg-primary rounded-lg shadow justify-start items-center gap-1 inline-flex text-white hover:scale-95 cursor-pointer duration-1000"
            onClick={handleOpen}
          >
            <PlusIcon />
            Create Invoice
          </button>
        </div>
      </div>
      <div className="pb-3 items-center justify-center pl-6 flex flex-row font-normal text-base border-b-2  border-[#EFE8D8]">
        <div className="flex-[2] font-medium">{t("date")}</div>
        <div className="flex-[2] flex  items-center  gap-1 ">
          <span className="font-medium">{t("package")}</span>
          <DropDownArrow />
        </div>
        <div className="flex-[2] flex justify-start items-center gap-1 ">
          <span className="font-medium">{t("email")}</span>
          <DropDownArrow />
        </div>
        <div className="flex-[2] flex justify-start items-center gap-1 ">
          <span className="font-medium">{t("type")}</span>
          <DropDownArrow />
        </div>
        <div className="flex-[2] flex justify-start items-center gap-2 ">
          <span className="font-medium">{t("amount")}</span>
        </div>
        <div className="flex-[2] font-medium">{t("status")}</div>
        <div className="flex-[2.4]" />
      </div>
      <Dialog placeholder={""} open={open} handler={handleOpen} size="xs">
        <DialogHeader
          className="text-5xl text-textPrimary  border-b border-secondary font-medium flex flex-row justify-between"
          placeholder={""}
        >
          Create Invoice
          <div onClick={handleOpen}>
            <RoundedCloseIcon />
          </div>
        </DialogHeader>
        {isError && (
          <div className="w-full flex justify-center items-center">
            <Alert color="red" className="w-11/12 p-2 mt-4">
              <span>{message}</span>
            </Alert>
          </div>
        )}
        <DialogBody placeholder={""} className="flex flex-col gap-5">
          <InputField
            placeholder={"INV-24-00001"}
            value={values.invoice}
            onInputChange={(e) => {
              void formik.setFieldValue("invoice", e.target.value);
            }}
            label="Invoice Custom Number"
          />
          <div>
            <TextAreaInput
              placeholder="Type your invoice description here..."
              value={values.description}
              onChange={(e) => {
                void formik.setFieldValue("description", e.target.value);
              }}
              name="comments"
              label="Invoice Description"
              height="h[73px]"
            />
          </div>
          <InputField
            placeholder={"0.00"}
            value={values.amount}
            onInputChange={(e) => {
              void formik.setFieldValue("amount", e.target.value);
            }}
            label="Amount"
          />
        </DialogBody>
        <div className="w-full flex justify-end px-5 pb-6 pt-3">
          <div
            className="flex"
            onClick={async () => {
              if (!isLoading) {
                await formik.setFieldValue("application", userId.name);
                await formik.setFieldValue("package", packageValue);
                await formik.setFieldValue("location", location);
                await formik.submitForm();
              }
            }}
          >
            <PopupFormSubmitButton text={"Submit"} isLoading={isLoading} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DonorApplicationPaymentTableHeader;
