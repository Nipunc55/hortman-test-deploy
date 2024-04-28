// eslint-disable-next-line @typescript-eslint/no-floating-promises
/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { t } from "i18next";
import i18n from "../../../../../i18n";
import InputField from "../../../../atoms/donor/inputField/InputField";
import DropDownList from "../../../../atoms/donor/dropDownList/DropDownList";
import { useFormik, type FormikErrors } from "formik";
import { motherDetailsSchema } from "../../../../../utils/validations";
// import { createPersonalDetails } from "../../../../../api/personal_detail";
import { getDataFromLocalStorage } from "../../../../../utils/common/accessLocalStorage";
import { IconButton } from "@material-tailwind/react";
import QuestionButtonIcon from "../../../../../assets/svg/QuestionButtonIcon";
import FileUploader from "../../../../atoms/admin/fileUploader/FileUploader";
import { imageDb } from "../../../../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createPersonalDetails,
  getPersonalDetailByApplicationId,
  updatePersonalDetails
} from "../../../../../api/personal_detail";
// import { string } from "yup";
// import LoaderIconSvg from "../../../../../assets/svg/loaderIcon";

// interface MotherDetailsFormTypes {
//   fullName: string;
//   email: string;
//   dob: any;
//   nationality: string;
//   passport: string;
//   alternatePhoneNum: string;
//   application: string;
//   ethnicity: string;
//   passportFirstPage: string;
//   emiratesIdFront: string;
//   emiratesIdBack: string;
// }

const MotherDetails = ({ setStep }: { setStep: (step: number) => void }) => {
  const [locale, setLocale] = useState(i18n.language);
  const [loading, setLoading] = useState<boolean>(true);
  const isArabic = locale === "ar";
  const [isSubmit, setIsSubmit] = useState(true);
  // const [isFormFilled, setIsFormFilled] = useState<boolean>(false);

  const checkFormFilled = (): void => {
    // const { fullName, dob, nationality, passport, email, alternatePhoneNum } =
    //   values;
    // setIsFormFilled(
    //   fullName !== "" &&
    //     dob !== "" &&
    //     nationality !== "" &&
    //     passport !== "" &&
    //     email !== "" &&
    //     alternatePhoneNum !== "" &&
    //     emiratedIDBack != null &&
    //     emiratedIDFront != null &&
    //     passportFirstPage != null
    // );
  };

  useEffect(() => {
    const updateLocale = () => {
      setLocale(i18n.language);
    };

    i18n.on("languageChanged", updateLocale);

    return () => {
      i18n.off("languageChanged", updateLocale);
    };
  }, []);

  // let initialValues: MotherDetailsFormTypes = {
  //   email: "",
  //   fullName: "",
  //   dob: new Date(),
  //   nationality: "Emirati",
  //   passport: "",
  //   alternatePhoneNum: "",
  //   application: "",
  //   ethnicity: "White",
  //   passportFirstPage: "",
  //   emiratesIdFront: "",
  //   emiratesIdBack: ""
  // };
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
  // const [image, setImage] = useState<any>(null);
  const [passportFirstPage, setPassportFirstPage] = useState<any>(null);
  const [emiratedIDFront, setEmiratedIDFront] = useState<any>(null);
  const [emiratedIDBack, setEmiratedIDBack] = useState<any>(null);

  const passporturlRef = useRef<string | null>(null);
  const emiratedIDFrontRef = useRef<string | null>(null);
  const emiratedIDBackRef = useRef<string | null>(null);
  useEffect(() => {
    getPersonalDetails();
  }, []);
  function handleFileChangePassportFirstPage(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    console.log(event.target.files);

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
    if (passporturlRef.current) {
      // toast.warning("Passport has already been uploaded.");
      setLoading(false);
    } else {
      return await new Promise((resolve, reject) => {
        let url: string = "";

        if (!passportFirstPage) {
          toast.error("Please upload the necessary documents");
          setLoading(false);
          return;
        }
        const imgRef = ref(imageDb, `mother-details/${v4()}`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const uploadTask = uploadBytesResumable(imgRef, passportFirstPage);

        uploadTask.on(
          "state_changed",
          (snapshot: any) => {
            // Get the upload progress
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
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
            toast.success("Passport (First page) uploaded successfully!");
          }
        );
        return url;
      });
    }
  };

  const handleUploadEmiratesIDFront = async (): Promise<string | undefined> => {
    if (emiratedIDFrontRef.current) {
      // toast.warning("Emirates Id Front has already been uploaded.");
      setLoading(false);
    } else {
      return await new Promise((resolve, reject) => {
        let url: string = "";
        if (!emiratedIDFront) {
          toast.error("Please upload the necessary documents");
          setLoading(false);
          return;
        }
        const imgRef = ref(imageDb, `mother-details/${v4()}`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const uploadTask = uploadBytesResumable(imgRef, emiratedIDFront);

        uploadTask.on(
          "state_changed",
          (snapshot: any) => {
            // Get the upload progress
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
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
    }
  };

  const handleUploadEmirateIDBack = async (): Promise<string | undefined> => {
    if (emiratedIDBackRef.current) {
      // toast.warning("Emirates Id Back has already been uploaded.");
      setLoading(false);
    } else {
      return await new Promise((resolve, reject) => {
        let url: string = "";
        if (!emiratedIDBack) {
          // alert("Please choose a file first!");
          toast.error("Please upload the necessary documents");
          setLoading(false);
          return;
        }
        const imgRef = ref(imageDb, `mother-details/${v4()}`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const uploadTask = uploadBytesResumable(imgRef, emiratedIDBack);

        uploadTask.on(
          "state_changed",
          (snapshot: any) => {
            // Get the upload progress
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
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
    }
  };
  const getPersonalDetails = async () => {
    setLoading(true);
    const applicationId = await getDataFromLocalStorage("donorApplicationId");
    const { apiSuccess, apiError }: any =
      await getPersonalDetailByApplicationId(applicationId, "Mother");

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
      passporturlRef.current = passportFirstPage;
      emiratedIDFrontRef.current = emiratesIdFront;
      emiratedIDBackRef.current = emiratesIdBack;
      getApplicationDetails();
      setIsSubmit(false);
      setPassportFirstPage(passportFirstPage);
      setEmiratedIDFront(emiratesIdFront);
      setEmiratedIDBack(emiratesIdBack);
      // toast.success("mother data fetch successful!");
      // setStep(2);
    } else if (apiError) {
      console.log(apiError);
      setIsSubmit(true);

      // toast.error(apiError.response.data.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    console.log("initialValues", initialValues);
  }, [initialValues]);

  const handleNextButtonClick = async () => {
    setLoading(true);
    if (checkButtonDisabled()) {
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
          setLoading(false);
          return;
        }

        const { apiError, apiSuccess }: any = await createPersonalDetails(
          values.application,
          "Mother",
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
          setStep(2);
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
    toast.success(`Saving...`);
    if (checkButtonDisabled()) {
      // setLoading(false);
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
          "Mother",
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
          setLoading(false);
          toast.success("Update successful!");
          setStep(2);
        } else if (apiError) {
          setLoading(false);
          toast.error(apiError.response.data.message);
        }
      } else {
        setLoading(false);
        // alert("Something went wrong with retrieving the application id");
        toast.error("Error during upload. Please try again.");
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleNextButtonClick,
    validationSchema: motherDetailsSchema,
    validateOnChange: true,
    enableReinitialize: true
  });

  const { errors, values, handleChange } = formik;

  useEffect(() => {
    checkFormFilled();
    // console.log("values", values);
  }, [values, passportFirstPage, emiratedIDFront, emiratedIDBack]);

  // const nationalityOptions = [
  //   { value: "Emirati", label: "Emirati" },
  //   { value: "Afghan", label: "Afghan" },
  //   { value: "Albanian", label: "Albanian" }
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
    // datePickerRef.current.setOpen(false);
    datePickerRef.current.setOpen(false);
    console.log(datePickerRef.current);

    if (datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
  };
  const hasValidationErrors = Object.values(errors).some((error) => !!error);

  const checkButtonDisabled = (): boolean => {
    if (
      values.email === "" ||
      values.fullName === "" ||
      values.nationality === "" ||
      values.passport === "" ||
      hasValidationErrors
    ) {
      const typedErrors: FormikErrors<any> = errors;

      const firstErrorValue = (Object.values(typedErrors) as string[])[0];

      toast.error(firstErrorValue);
      return true;
    }

    return false;
  };

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

  const ethnicitySelectionHandler = async (event: {
    value: string;
    label: string;
  }) => {
    await formik.setFieldValue("ethnicity", event.value);
  };

  const dateOfBirthHandler = async (date: any) => {
    await formik.setFieldValue("dob", date);
    closeDatePicker();
  };

  const getApplicationDetails = async () => {
    const applicationId = await getDataFromLocalStorage("donorApplicationId");
    await formik.setFieldValue("application", applicationId);
  };
  useEffect(() => {
    getApplicationDetails()
      .then((result) => {
        console.log("Promise resolved successfully:", result);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  return (
    <div className=" bg-white pt-2.5 mt-4 w-[50rem] mb-20 quick-setup-bg">
      {/* <LoaderIconSvg /> */}
      <div className=" border-b-[1px] border-b-secondary">
        <span className=" text-primary text-5xl font-medium px-5">
          {t("expected-mother-details")}
        </span>
      </div>
      <div className="pt-10 px-15 flex flex-col gap-2.5">
        <div className="flex flex-row items-center w-full gap-6">
          <div className={`flex-1 ${isArabic ? "text-right" : "text-left"}`}>
            <InputField
              label={t("full-name")}
              placeholder={t("full-name")}
              value={values.fullName}
              // onInputChange={handleChange}
              onInputChange={camelCaseValidation}
              name="fullName"
            />
          </div>

          <div className="flex-1">
            <div className={`flex-1 ${isArabic ? "text-right" : "text-left"}`}>
              <span className={`font-normal normal-case text-black-500`}>
                {t("dob")}
              </span>
              <DatePicker
                ref={datePickerRef}
                selected={values.dob}
                onChange={dateOfBirthHandler}
                name="dob"
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                onSelect={() => {
                  closeDatePicker();
                }}
                showYearDropdown
                placeholderText="DD/MM/YYYY"
                className="w-full h-10 px-3 mt-1 rounded-md outline-none"
                wrapperClassName="full-width-datepicker-wrapper gold-gradient-input-border"
                onKeyDown={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full items-center gap-6">
          <div className="flex-1">
            {/* <DropDownList
              // options={nationalityOptions}
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
              onInputChange={passportValidation}
              name="passport"
            />
          </div>
        </div>

        <div className="flex flex-row w-full items-center gap-6">
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
              type="email"
              placeholder={t("email-address")}
              value={values.email}
              onInputChange={handleChange}
              name="email"
              // errorMessage={errors.email}
            />
          </div>
        </div>

        <div className="flex flex-row w-full items-center gap-6">
          <div className="w-1/2">
            <InputField
              label={t("mobile-no")}
              placeholder={"+971 50 000 0000"}
              value={values.alternatePhoneNum}
              onInputChange={handleChange}
              name="alternatePhoneNum"
              type="tel"
            />
          </div>
          <div className="w-1/2"></div>
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
        <div className="flex items-center justify-between w-full gap-8 mb-7">
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
      </div>

      <div className="flex items-center justify-end p-5 px-5">
        {loading ? (
          <>
            <span className="font-normal text-sm text-primary">
              {t("Loading...")}
            </span>
          </>
        ) : (
          <div
            onClick={isSubmit ? handleNextButtonClick : handleUpdateButton}
            className={`flex gap-1 items-center space-x-1.5 cursor-pointer`}
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
      <ToastContainer containerId={"friendRequest"} />
    </div>
  );
};

export default MotherDetails;
