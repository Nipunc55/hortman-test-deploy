/* eslint-disable */
/* eslint-disable @typescript-eslint/parser */
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox, IconButton } from "@material-tailwind/react";
import LinkIcon from "../../../../../assets/svg/LinkIcon";
import { t } from "i18next";
import i18n from "../../../../../i18n";
import InputField from "../../../../atoms/donor/inputField/InputField";
import DropDownList from "../../../../atoms/donor/dropDownList/DropDownList";
import { useFormik, type FormikErrors } from "formik";
import { getDataFromLocalStorage } from "../../../../../utils/common/accessLocalStorage";
import {
  createPersonalDetails,
  getPersonalDetailByApplicationId,
  updatePersonalDetails
} from "../../../../../api/personal_detail";
import QuestionButtonIcon from "../../../../../assets/svg/QuestionButtonIcon";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showEduMaterialSpecScreen } from "../../../../../redux/slices/QuickSetupGuideSlices";
import FileUploader from "../../../../atoms/admin/fileUploader/FileUploader";
import { imageDb } from "../../../../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { fatherDetailsSchema } from "../../../../../utils/validations";
import { UploadImageView } from "../../../../atoms/donor/uploadImageView";

interface FatherDetailsFormTypes {
  fullName: string;
  email: string;
  dob: Date;
  nationality: string;
  passport: string;
  alternatePhoneNum: string;
  application: string;
  ethnicity: string;
  passportFirstPage: string;
  emiratesIdFront: string;
  emiratesIdBack: string;
}

const FatherDetails = ({ setStep }: { setStep: (step: number) => void }) => {
  const [locale, setLocale] = useState(i18n.language);
  const dispatch = useDispatch();
  const isArabic = locale === "ar";
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  // const nationalityOptions = [
  //   { value: "emirati", label: "Emirati" },
  //   { value: "afghan", label: "Afghan" },
  //   { value: "albanian", label: "Albanian" }
  // ];

  const ethnicityOptions = [
    { value: "Middle East", label: "Middle East" },
    { value: "South Asian", label: "South Asian" },
    { value: "South Asian", label: "South Asian" },
    { value: "White", label: "White" },
    { value: "Black", label: "Black" },
    { value: "Custom", label: "Custom" }
  ];
  const datePickerRef = useRef<any>(null);
  // const openDatePicker = () => {
  //   if (datePickerRef.current) {
  //     datePickerRef.current.setOpen(true);
  //   }
  // };
  const closeDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxChecked(e.target.checked);
  };

  const handleBackButtonClick = () => {
    dispatch(showEduMaterialSpecScreen(true));
    setStep(2);
  };

  const navigate = useNavigate();

  // const [image, setImage] = useState<any>(null);
  const [passportFirstPage, setPassportFirstPage] = useState<any>(null);
  const [emiratedIDFront, setEmiratedIDFront] = useState<any>(null);
  const [emiratedIDBack, setEmiratedIDBack] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [passportProgress, setPassportProgress] = useState<number>(0);

  const passporturlRef = useRef<string>("");
  const emiratedIDFrontRef = useRef<string>("");
  const emiratedIDBackRef = useRef<string>("");
  const [isSubmit, setIsSubmit] = useState(true);

  const [initialValues, setInitialValues] = useState<any>({
    email: "",
    fullName: "",
    dob: new Date(),
    nationality: "Emirati",
    passport: "",
    alternatePhoneNum: "",
    application: "",
    ethnicity: "White",
    passportFirstPage: "",
    emiratesIdFront: "",
    emiratesIdBack: ""
  });

  function handleFileChangePassportFirstPage(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file: any = event.target.files?.[0];
    console.log("FILE " + file);
    console.log("SET FILE " + setPassportFirstPage(file));
    setPassportFirstPage(file);
  }

  function handleEmiratedIDFront(event: React.ChangeEvent<HTMLInputElement>) {
    const file: any = event.target.files?.[0];
    setEmiratedIDFront(file);
  }

  function handleEmirateIDBack(event: React.ChangeEvent<HTMLInputElement>) {
    const file: any = event.target.files?.[0];
    setEmiratedIDBack(file);
  }

  const handleUploadPassport = async (): Promise<string | undefined> => {
    return await new Promise((resolve, reject) => {
      let url: string = "";
      let totalProgress: number = 0;
      if (!passportFirstPage) {
        toast.error("Please choose Emirates ID (Front side)");
        return;
      }
      const imgRef = ref(imageDb, `father-details/${v4()}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const uploadTask = uploadBytesResumable(imgRef, passportFirstPage);

      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          // Get the upload progress
          const passportUploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Upload is ${passportUploadProgress}% done`);
          totalProgress += passportUploadProgress;
          setPassportProgress((totalProgress += passportUploadProgress));
          console.log(passportProgress + "upload progress");
          // toast.info(`Passport Upload: ${Math.round(progress)}%`);
        },
        (error: any) => {
          // Handle errors during the upload.
          console.error("Error during upload:", error);
          reject(error);
        },
        async () => {
          const downloadURLPassport = await getDownloadURL(imgRef);
          passporturlRef.current = downloadURLPassport;
          url = downloadURLPassport;
          resolve(url);

          toast.success("Passport uploaded successfully!");
        }
      );
      return url;
    });
  };

  const handleUploadEmiratesIDFront = async (): Promise<string | undefined> => {
    return await new Promise((resolve, reject) => {
      let url: string = "";
      if (!emiratedIDFront) {
        toast.error("Please choose Emirates ID (Front side)");
        return;
      }
      const imgRef = ref(imageDb, `father-details/${v4()}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const uploadTask = uploadBytesResumable(imgRef, emiratedIDFront);

      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          // Get the upload progress
          const EmiratesIDFrontProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${EmiratesIDFrontProgress}% done`);
          // toast.info(`Emirates Id Front: ${Math.round(progress)}%`);
        },
        (error: any) => {
          // Handle errors during the upload.
          console.error("Error during upload:", error);
          reject(error);
        },
        async () => {
          const downloadURLEmirateIDFront = await getDownloadURL(imgRef);
          emiratedIDFrontRef.current = downloadURLEmirateIDFront;
          url = downloadURLEmirateIDFront;
          resolve(url);

          toast.success("Emirates ID (Front side) uploaded successfully!");
        }
      );
      return url;
    });
  };

  const handleUploadEmirateIDBack = async (): Promise<string | undefined> => {
    return await new Promise((resolve, reject) => {
      let url: string = "";
      if (!emiratedIDBack) {
        toast.error("Please choose Emirates ID (Back side)");
        return;
      }
      const imgRef = ref(imageDb, `father-details/${v4()}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const uploadTask = uploadBytesResumable(imgRef, emiratedIDBack);

      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          // Get the upload progress
          const EmirateIDBackProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${EmirateIDBackProgress}% done`);
          // toast.info(`Emirates Id Back: ${Math.round(progress)}%`);
        },
        (error: any) => {
          // Handle errors during the upload.
          console.error("Error during upload:", error);
          reject(error);
        },
        async () => {
          const downloadURLEmirateIDBack = await getDownloadURL(imgRef);
          emiratedIDBackRef.current = downloadURLEmirateIDBack;
          url = downloadURLEmirateIDBack;
          resolve(url);

          toast.success("Emirates ID (Back side) uploaded successfully!");
        }
      );
      return url;
    });
  };

  const handleNextButtonClick = async () => {
    setLoading(true);
    if (checkButtonDisabled()) {
      // alert("Please fill all the fields.");
      // toast.error("Please fill all the fields.");
    } else {
      if (values.application !== "" || values.application !== undefined) {
        await handleUploadPassport();
        await handleUploadEmiratesIDFront();
        await handleUploadEmirateIDBack();

        if (
          !emiratedIDBackRef.current ||
          !emiratedIDFrontRef.current ||
          !passporturlRef.current
        ) {
          toast.error(
            "File upload is not complete. Please wait and try again."
          );
          // alert("");
        }

        const { apiError, apiSuccess }: any = await createPersonalDetails(
          values.application,
          "Father",
          values.email,
          values.fullName,
          values.dob,
          values.nationality,
          values.passport,
          values.alternatePhoneNum,
          values.ethnicity,
          passporturlRef.current,
          emiratedIDBackRef.current,
          emiratedIDFrontRef.current
        );

        if (apiSuccess && apiSuccess.status === 200) {
          toast.success("Upload successful!");
          navigate("/more-information-of-stem-cell-banking");
        } else if (apiError) {
          toast.error(apiError.response.data.message);
        }
      } else {
        // alert("Something went wrong with retrieving the application id");
        toast.error("Error during upload. Please try again.");
      }
    }
    setLoading(false);
  };
  const handleUpdateButton = async () => {
    setLoading(true);
    if (checkButtonDisabled()) {
      // toast.error("Please fill all the fields.");
    } else {
      if (values.application !== "" || values.application !== undefined) {
        await handleUploadPassport();
        await handleUploadEmiratesIDFront();
        await handleUploadEmirateIDBack();
        const applicationId =
          await getDataFromLocalStorage("donorApplicationId");
        if (
          !emiratedIDBackRef.current ||
          !emiratedIDFrontRef.current ||
          !passporturlRef.current
        ) {
          toast.error(
            "File upload is not complete. Please wait and try again."
          );
          setLoading(false);
          return;
        }

        const { apiError, apiSuccess }: any = await updatePersonalDetails(
          applicationId,
          "Father",
          values.email,
          values.fullName,
          values.dob,
          values.nationality,
          values.passport,
          values.alternatePhoneNum,
          values.ethnicity,
          passporturlRef.current,
          emiratedIDBackRef.current,
          emiratedIDFrontRef.current
        );

        if (apiSuccess && apiSuccess.status === 200) {
          toast.success("Update successful!");
          setStep(4);
        } else if (apiError) {
          toast.error(apiError.response.data.message);
        }
      } else {
        // alert("Something went wrong with retrieving the application id");
        toast.error("Error during upload. Please try again.");
      }
    }
    setLoading(false);
  };
  const getPersonalDetails = async () => {
    setLoading(true);
    const applicationId = await getDataFromLocalStorage("donorApplicationId");
    const { apiSuccess, apiError }: any =
      await getPersonalDetailByApplicationId(applicationId, "Father");

    if (apiSuccess && apiSuccess.status === 200) {
      // initialValues = apiSuccess?.data.data;
      let {
        email,
        fullName,
        dob,
        nationality,
        passport,
        alternatePhoneNum,
        // application,
        ethnicity,
        passportFirstPage,
        emiratesIdFront,
        emiratesIdBack
      } = apiSuccess?.data.data;

      setInitialValues({
        email,
        fullName,
        dob: new Date(dob || null),
        nationality,
        passport,
        alternatePhoneNum,
        // application: "",
        ethnicity,
        passportFirstPage: "",
        emiratesIdFront: "",
        emiratesIdBack: ""
      });
      setCheckboxChecked(true);
      passporturlRef.current = passportFirstPage;
      emiratedIDFrontRef.current = emiratesIdFront;
      emiratedIDBackRef.current = emiratesIdBack;
      getApplicationDetails();
      setIsSubmit(false);
      // toast.success("mother data fetch successful!");
      // setStep(2);
      setPassportFirstPage(passportFirstPage);
      setEmiratedIDFront(emiratesIdFront);
      setEmiratedIDBack(emiratesIdBack);
    } else if (apiError) {
      console.log(apiError);
      setIsSubmit(true);

      // toast.error(apiError.response.data.message);
    }
    setLoading(false);
  };
  // const initialValues: FatherDetailsFormTypes = {
  //   email: "",
  //   fullName: "",
  //   dob: new Date(),
  //   nationality: "emirati",
  //   passport: "",
  //   alternatePhoneNum: "",
  //   application: "",
  //   ethnicity: "White",
  //   passportFirstPage: "",
  //   emiratesIdFront: "",
  //   emiratesIdBack: ""
  // };

  const formik = useFormik({
    initialValues,
    onSubmit: handleNextButtonClick,
    validationSchema: fatherDetailsSchema,
    validateOnChange: true,
    enableReinitialize: true
  });

  const { errors, values, handleChange } = formik;
  console.log(errors);

  // const hasValidationErrors = Object.values(errors).some((error) => !!error);
  const checkButtonDisabled = (): boolean => {
    // if (
    //   values.email === "" ||
    //   values.fullName === "" ||
    //   values.nationality === "" ||
    //   values.passport === "" ||
    //   !checkboxChecked ||
    //   hasValidationErrors ||
    //   passportFirstPage == null ||
    //   emiratedIDFront == null ||
    //   emiratedIDBack == null
    // ) {
    const typedErrors: FormikErrors<FatherDetailsFormTypes> = errors;

    const firstErrorValue = (Object.values(typedErrors) as string[])[0];

    if (firstErrorValue) {
      toast.error(firstErrorValue);
      return true;
    }

    if (!checkboxChecked) {
      toast.error("Please check terms and conditions!");
      return true;
    }
    if (
      passportFirstPage == null ||
      emiratedIDFront == null ||
      emiratedIDBack == null
    ) {
      toast.error("Please upload the necessary documents");
      return true;
    }
    // }

    return false;
  };
  const dateOfBirthHandler = async (date: any) => {
    await formik.setFieldValue("dob", date);
    closeDatePicker();
  };

  // const nationalitySelectionHandler = async (event: {
  //   value: string;
  //   label: string;
  // }) => {
  //   await formik.setFieldValue("nationality", event.value);
  // };

  const ethnicitySelectionHandler = async (event: {
    value: string;
    label: string;
  }) => {
    await formik.setFieldValue("ethnicity", event.value);
  };

  const getApplicationDetails = async () => {
    const applicationId = await getDataFromLocalStorage("donorApplicationId");
    await formik.setFieldValue("application", applicationId);
  };

  useEffect(() => {
    const updateLocale = () => {
      setLocale(i18n.language);
    };
    void getApplicationDetails();
    void getPersonalDetails();
    i18n.on("languageChanged", updateLocale);

    return () => {
      i18n.off("languageChanged", updateLocale);
    };
  }, []);
  const camelCaseValidation = async (event: any) => {
    const fullName = event.target.value;
    const capitalizedFullName = fullName
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    await formik.setFieldValue("fullName", capitalizedFullName);
  };
  const passportValidation = async (event: any) => {
    const original = event.target.value;

    let formattedValue = "";
    if (original.startsWith("784")) {
      // Remove dashes and limit to 16 characters
      const processedValue = original.replace(/-/g, "").substring(0, 15);

      // Add dashes after 3rd, 7th, and 14th characters
      formattedValue =
        processedValue.slice(0, 3) +
        "-" +
        processedValue.slice(3, 7) +
        "-" +
        processedValue.slice(7, 14) +
        "-" +
        processedValue.slice(14);

      // setFormattedString(formattedValue);
    } else {
      formattedValue = original;
    }

    await formik.setFieldValue("passport", formattedValue);
  };
  return (
    <div className=" bg-white rounded-lg py-2.5 mt-4 w-[50rem] mb-20">
      <div className=" border-b-[1px] border-b-secondary">
        <span className=" text-primary text-5xl font-medium px-5">
          {t("fathers-details")}
        </span>
      </div>
      <div className="pt-10 px-15 flex flex-col gap-2.5">
        <div className="flex flex-row w-full gap-6">
          <div className="flex-1">
            <InputField
              label={t("full-name")}
              placeholder={t("full-name")}
              value={values.fullName}
              // onInputChange={handleChange}
              onInputChange={camelCaseValidation}
              name="fullName"
            />
          </div>
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
              name="dob"
              onChange={dateOfBirthHandler}
              dateFormat="dd/MM/yyyy"
              // onBlur={openDatePicker}
              showYearDropdown
              placeholderText="DD/MM/YYYY"
              className="w-full h-10 px-3 mt-1 rounded-md outline-none"
              wrapperClassName="full-width-datepicker-wrapper gold-gradient-input-border"
              onKeyDown={(e) => e.preventDefault()}
              maxDate={new Date()}
              peekNextMonth
              showMonthDropdown
              dropdownMode="select"
            />
          </div>
        </div>

        <div className="flex flex-row w-full gap-6">
          <div className="flex-1">
            {/* <DropDownList
              options={nationalityOptions}
              name="rejectionBy"
              value={values.nationality}
              // onSelect={() => {}}
              onChange={nationalitySelectionHandler}
              placeholder={t("nationality")}
            /> */}
            <InputField
              label={t("nationality")}
              placeholder={t("")}
              value={values.nationality}
              onInputChange={handleChange}
              name="nationality"
            />
          </div>
          <div className="flex-1">
            <InputField
              label={t("emirates-id")}
              placeholder={"784-1979-1234567-1"}
              value={values.passport}
              // onInputChange={handleChange}
              onInputChange={passportValidation}
              name="passport"
            />
          </div>
        </div>

        <div className="flex flex-row w-full gap-6">
          <div className="flex-1">
            <DropDownList
              options={ethnicityOptions}
              name="rejectionBy"
              value={values.ethnicity}
              onChange={ethnicitySelectionHandler}
              placeholder={"Ethnicity"}
            />
          </div>
          <div className="flex-1">
            <InputField
              label={t("email-address")}
              placeholder={t("email-address")}
              value={values.email}
              name="email"
              onInputChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-row w-full gap-6">
          <div className="w-1/2">
            <InputField
              label={t("mobile-no")}
              placeholder={"+971 50 000 0000"}
              value={values.alternatePhoneNum}
              onInputChange={handleChange}
              name="alternatePhoneNum"
              type="tel"
              required={true}
            />
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="mt-6 text-2xl font-medium">Additional Documents</div>
        <div className="flex items-center justify-between w-full gap-8 mb-3.5">
          <div className="w-full flex-[1]">
            <FileUploader
              heading="Passport (First page)"
              handleFileChange={handleFileChangePassportFirstPage}
              selectedFile={passportFirstPage}
              value={values.passportFirstPage}
              acceptType="image/*,.pdf"
            />
          </div>
          <div className="w-full flex-[1]"></div>
        </div>
        <div className="flex items-center justify-between w-full gap-8 mb-3.5">
          <div className="w-full flex-[1]">
            <FileUploader
              heading="Emirates ID (Front side)"
              handleFileChange={handleEmiratedIDFront}
              selectedFile={emiratedIDFront}
              value={values.emiratesIdFront}
              acceptType="image/*,.pdf"
            />
          </div>
          <div className="w-full flex-[1]">
            <FileUploader
              heading="Emirates ID (Back side)"
              handleFileChange={handleEmirateIDBack}
              selectedFile={emiratedIDBack}
              value={values.emiratesIdBack}
              acceptType="image/*,.pdf"
            />
          </div>
        </div>
        <UploadImageView
          passportFirstPage={passportFirstPage}
          emiratedIDFront={emiratedIDFront}
          emiratedIDBack={emiratedIDBack}
        />
      </div>
      <div className="flex items-center px-12 py-1">
        <Checkbox
          crossOrigin={undefined}
          className="border-[1] border-primary"
          onChange={handleCheckboxChange}
        />
        <div className="flex flex-row items-center justify-center gap-2">
          <span className=" text-base">{t("terms-conditions")}</span>
          <LinkIcon />
        </div>
      </div>
      <div className="flex items-center justify-between p-5 px-5">
        <div
          onClick={handleBackButtonClick}
          className="flex gap-1 items-center space-x-1.5 cursor-pointer"
        >
          <IconButton
            placeholder={""}
            size="sm"
            className="bg-transparent shadow-none hover:shadow-none"
          >
            <QuestionButtonIcon />
          </IconButton>
          <span className="font-normal text-sm text-primary">{t("back")}</span>
        </div>
        {loading ? (
          <>
            <span className="font-normal text-sm text-primary">
              {" "}
              {t("Loading...")}
            </span>
          </>
        ) : (
          <div
            // onClick={handleNextButtonClick}
            onClick={isSubmit ? handleNextButtonClick : handleUpdateButton}
            className="flex gap-1 items-center space-x-1.5 cursor-pointer"
          >
            <span className="font-normal text-sm text-primary">
              {t("next")}
            </span>
            <IconButton
              placeholder={""}
              size="sm"
              className="bg-transparent shadow-none hover:shadow-none"
            >
              {isArabic ? (
                <QuestionButtonIcon />
              ) : (
                <QuestionButtonIcon isFlipped={true} />
              )}
            </IconButton>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default FatherDetails;
