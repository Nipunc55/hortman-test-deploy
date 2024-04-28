import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import InputField from "../../../atoms/donor/inputField/InputField";
import DropDownList from "../../../atoms/donor/dropDownList/DropDownList";
import BasicButton from "../../../atoms/donor/buttons/BasicButton";
import { type FormikErrors, useFormik } from "formik";
import { getDonorById, updateDonorById } from "../../../../api/donor";
import { useEffect, useState } from "react";
import { getDataFromLocalStorage } from "../../../../utils/common/accessLocalStorage";
import { Alert } from "@material-tailwind/react";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";
import { ToastContainer, toast } from "react-toastify";
import { profileDataValidationSchema } from "../../../../utils/validations";
const ProfileForm = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);

  const CountryOptions = [
    { value: "United Arab Emirates", label: "United Arab Emirates" }
  ];

  const initialValues = {
    fullName: "",
    email: "",
    alternatePhoneNum: "",
    nationality: "",
    passport: "",
    userId: ""
  };

  const formik = useFormik({
    initialValues,
    validationSchema: profileDataValidationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const { errors, values, handleChange } = formik;

  const handleClick = async () => {
    const typedErrors: FormikErrors<any> = errors;

    const firstErrorValue = (Object.values(typedErrors) as string[])[0];
    if (firstErrorValue) {
      console.log(errors);

      toast.error(firstErrorValue);

      return;
    }
    const resolveAfter3Sec = updateDonorById(
      values.userId,
      values.nationality,
      values.passport,
      values.fullName,
      values.email,
      values.alternatePhoneNum
    );

    await toast.promise(resolveAfter3Sec, {
      pending: "Profile data is updating",
      success: "Profile data successfully updated",
      error: "Promise rejected"
    });
    // navigate("/donor");
    setTimeout(() => {
      navigate("/donor");
    }, 1500);
    // navigate("/donor");
    // const { apiError, apiSuccess }: any = await updateDonorById(
    //   values.userId,
    //   values.nationality,
    //   values.passport,
    //   values.fullName,
    //   values.email,
    //   values.alternatePhoneNum
    // );

    // if (apiSuccess && apiSuccess.status === 200) {

    // //  await toast.success("Profile Updated Successfully");
    //  await toast.success("Profile Updated Successfully");

    //   navigate("/donor");
    // } else if (apiError) {
    //   toast.error(apiError.response.data.message);
    // }
  };
  const nationalitySelectionHandler = async (event: {
    value: string;
    label: string;
  }) => {
    await formik.setFieldValue("nationality", event.value);
  };

  const loadPersonalData = async () => {
    const userId = await getDataFromLocalStorage("userId");
    const { apiError, apiSuccess }: any = await getDonorById(userId);
    if (apiSuccess && apiSuccess.status === 200) {
      await formik.setFieldValue("userId", userId);
      await formik.setFieldValue(
        "nationality",
        apiSuccess?.data?.data?.country || ""
      );
      await formik.setFieldValue(
        "passport",
        apiSuccess?.data?.data?.passport || ""
      );
      await formik.setFieldValue(
        "alternatePhoneNum",
        apiSuccess?.data?.data?.user?.mobile_no || ""
      );
      await formik.setFieldValue(
        "fullName",
        apiSuccess?.data?.data?.user?.name || ""
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
    void loadPersonalData();
  }, []);
  return (
    <div className="flex justify-center items-center">
      <div className=" bg-white rounded-[20px]  mt-6 w-[50rem] mb-16">
        <div className="flex justify-start border-b border-secondary">
          <span className=" text-primary text-5xl font-medium px-12 py-7">
            {t("profile")}
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
        <div className="mt-4 pb-8 px-12 flex flex-col gap-5">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <LoaderIconSvg />
            </div>
          ) : (
            <>
              <div className=" flex flex-col gap-5">
                <div className="flex flex-row w-full gap-6">
                  <div className="flex-1">
                    <InputField
                      label={t("email-address")}
                      placeholder={t("email-address")}
                      value={values.email}
                      name="email"
                      onInputChange={handleChange}
                    />
                  </div>
                  <div className="flex-1">
                    <InputField
                      label={t("full-name")}
                      placeholder={t("full-name")}
                      value={values.fullName}
                      name="fullName"
                      onInputChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-row w-full gap-6 items-center">
                  <div className="flex-1">
                    <InputField
                      label={"Mobile"}
                      placeholder={""}
                      value={values.alternatePhoneNum}
                      name="alternatePhoneNum"
                      onInputChange={handleChange}
                    />
                  </div>
                  <div className="flex-1">
                    <DropDownList
                      options={CountryOptions}
                      name="countries"
                      value={values.nationality}
                      // onSelect={() => {}}
                      onChange={nationalitySelectionHandler}
                      placeholder={"Country"}
                    />
                  </div>
                </div>

                <div className="flex flex-row w-full gap-6">
                  <div className="flex-1">
                    <InputField
                      label={t("emirates-id")}
                      placeholder={"784-1979-1234567-1"}
                      value={values.passport}
                      onInputChange={handleChange}
                      name="passport"
                    />
                  </div>
                  <div className="flex-1" />
                </div>
              </div>
            </>
          )}
          <div className="flex items-center justify-center mt-8">
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
                text={t("save")}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProfileForm;
