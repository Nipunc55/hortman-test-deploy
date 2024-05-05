import DatePicker from "react-datepicker";
import { useEffect, useRef, useState } from "react";
import { Alert, Checkbox } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import i18n from "../../../../../i18n";
import InputField from "../../../../atoms/donor/inputField/InputField";
import DropDownList from "../../../../atoms/donor/dropDownList/DropDownList";
import BasicButton from "../../../../atoms/donor/buttons/BasicButton";
import LinkIcon from "../../../../../assets/svg/LinkIcon";
import { useFormik } from "formik";
import { getDataFromLocalStorage } from "../../../../../utils/common/accessLocalStorage";
import {
  getHealthCareProfessionalById,
  updateHealthCareProfessional
} from "../../../../../api/healthcare_professional";
import LoaderIconSvg from "../../../../../assets/svg/loaderIcon";
import { ToastContainer, toast } from "react-toastify";

const ProfessionalSetupGuide = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [locale, setLocale] = useState(i18n.language);
  const isArabic = locale === "ar";
  useEffect(() => {
    const updateLocale = () => {
      setLocale(i18n.language);
    };

    i18n.on("languageChanged", updateLocale);

    return () => {
      i18n.off("languageChanged", updateLocale);
    };
  }, []);

  const ClinicOptions = [
    { value: "emirati", label: "Emirati" },
    { value: "afghan", label: "Afghan" },
    { value: "albanian", label: "Albanian" }
  ];

  const PofessionOptions = [
    { value: "emirati", label: "Emirati" },
    { value: "afghan", label: "Afghan" },
    { value: "albanian", label: "Albanian" }
  ];

  const nationalityOptions = [
    { value: "emirati", label: "Emirati" },
    { value: "afghan", label: "Afghan" },
    { value: "albanian", label: "Albanian" }
  ];

  const datePickerRef = useRef<any>(null);

  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  const closeDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
  };

  const initialValues = {
    email: "",
    fullName: "",
    hospital: "",
    profession: "",
    passport: "",
    dob: new Date(),
    nationality: "",
    userId: ""
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const { values, handleChange } = formik;

  const handleClick = async () => {
    const { apiSuccess, apiError }: any = await updateHealthCareProfessional(
      values.hospital,
      values.profession,
      values.dob,
      values.nationality,
      values.passport,
      values.userId,
      values.fullName,
      values.email
    );
    if (apiSuccess && apiSuccess.status === 200) {
      toast.success("Profile updated successful!");
      navigate("/health-care");
      console.log(apiSuccess.data.data + "new check");
    } else if (apiError) {
      alert(apiError.response.data.message);
      toast.error(apiError.response.data.message);
    }
  };

  const nationalitySelectionHandler = async (event: {
    value: string;
    label: string;
  }) => {
    await formik.setFieldValue("nationality", event.value);
  };

  const dateOfBirthHandler = async (date: any) => {
    await formik.setFieldValue("dob", date);
    closeDatePicker();
  };

  const professionSelectionHandler = async (event: {
    value: string;
    label: string;
  }) => {
    await formik.setFieldValue("profession", event.value);
  };

  const getApplicationDetails = async () => {
    const userId = await getDataFromLocalStorage("userId");
    const { apiError, apiSuccess }: any =
      await getHealthCareProfessionalById(userId);
    if (apiSuccess && apiSuccess.status === 200) {
      console.log(apiSuccess.data);
      await formik.setFieldValue("userId", userId);
      await formik.setFieldValue(
        "nationality",
        apiSuccess?.data?.data?.nationality || ""
      );
      await formik.setFieldValue(
        "profession",
        apiSuccess?.data?.data?.profession || ""
      );
      await formik.setFieldValue(
        "fullName",
        apiSuccess?.data?.data?.user?.name || ""
      );
      await formik.setFieldValue(
        "passport",
        apiSuccess?.data?.data?.passport || ""
      );
      await formik.setFieldValue(
        "hospital",
        apiSuccess?.data?.data?.hospital || ""
      );
      await formik.setFieldValue(
        "email",
        apiSuccess?.data?.data?.user?.email || ""
      );
      setIsLoading(false);
    } else if (apiError) {
      // alert(apiError.response.data.message);
      setMessage(apiError.response.data.message);
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    void getApplicationDetails();
  }, []);

  const hospitalSelectionHandler = async (event: {
    value: string;
    label: string;
  }) => {
    await formik.setFieldValue("hospital", event.value);
  };

  return (
    <div className="flex justify-center items-center">
      <div className=" bg-white rounded-[20px] pt-4 mt-6 w-[50rem] mb-16">
        <div className="flex justify-center">
          <span className=" text-primary text-5xl font-medium px-5">
            {t("healthcare-professional")}
          </span>
        </div>
        {isError && (
          <Alert
            color="red"
            className="w-full container flex justify-center mt-10"
          >
            <span>{message}</span>
          </Alert>
        )}
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <LoaderIconSvg />
            </div>
          ) : (
            <>
              <div className="pt-10 pb-8 px-12 flex flex-col gap-5">
                <div className="flex flex-row w-full gap-6">
                  <div className="flex-1">
                    <InputField
                      label={`${t("email-address")}`}
                      placeholder={""}
                      name="email"
                      value={values.email}
                      onInputChange={handleChange}
                    />
                  </div>
                  <div className="flex-1">
                    <InputField
                      label={`${t("full-name")}`}
                      placeholder={""}
                      value={values.fullName}
                      name="fullName"
                      onInputChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-row w-full gap-6">
                  <div className="flex-1">
                    <DropDownList
                      options={ClinicOptions}
                      name="hospital"
                      value={values.hospital}
                      // onSelect={() => {}}
                      onChange={hospitalSelectionHandler}
                      placeholder={`${t("hospital-clinic-institute")}`}
                    />
                  </div>
                  <div className="flex-1">
                    <DropDownList
                      options={PofessionOptions}
                      name="poffestion option"
                      value={values.profession}
                      // onSelect={() => {}}
                      onChange={professionSelectionHandler}
                      placeholder={t("profession")}
                    />
                  </div>
                </div>
                <div className="flex flex-row w-full gap-6">
                  <div className={`flex-1 ${isArabic && "text-right"}`}>
                    <span
                      className={`font-normal normal-case text-black-500 ${
                        isArabic && "text-right"
                      }`}
                    >
                      {t("dob")}
                    </span>
                    <DatePicker
                      ref={datePickerRef}
                      selected={values.dob}
                      onChange={dateOfBirthHandler}
                      dateFormat="dd/MM/yyyy"
                      // onBlur={openDatePicker}
                      placeholderText="DD/MM/YYYY"
                      className="w-full h-10 px-3 mt-1 rounded-md outline-none"
                      wrapperClassName="full-width-datepicker-wrapper gold-gradient-input-border"
                    />
                  </div>
                  <div className="flex-1">
                    <DropDownList
                      options={nationalityOptions}
                      name=""
                      value={values.nationality}
                      // onSelect={() => {}}
                      onChange={nationalitySelectionHandler}
                      placeholder={t("nationality")}
                    />
                  </div>
                </div>
                <div className="flex flex-row w-full gap-6">
                  <div className="flex-1">
                    <InputField
                      label={t("emirates-id")}
                      placeholder={t("emirates-id")}
                      value={values.passport}
                      name="passport"
                      onInputChange={handleChange}
                    />
                  </div>
                  <div className="flex-1" />
                </div>
                <div className="flex flex-row w-full gap-6">
                  <div
                    className={`flex items-center ${isArabic && "flex-row-reverse"}`}
                  >
                    <Checkbox
                      crossOrigin={undefined}
                      className="healthcare-professional-form-check-box"
                    />
                    <div
                      className={`flex  items-center justify-center gap-2 ${
                        isArabic ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <span className=" text-base">
                        {t("terms-conditions-acceptance")}
                      </span>
                      <LinkIcon />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-[112px]">
                    <BasicButton
                      onClick={() => {
                        void handleClick();
                      }}
                      styledBorderEnabled={true}
                      style={{
                        backgroundColor: "#EFE8D8",
                        color: "#000000",
                        width: "112px",
                        paddingLeft: "40px",
                        paddingRight: "40px"
                      }}
                      text={`${t("save")}`}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProfessionalSetupGuide;
