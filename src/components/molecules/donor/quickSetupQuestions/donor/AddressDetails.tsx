/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
import { t } from "i18next";
import InputField from "../../../../atoms/donor/inputField/InputField";
import DropDownList from "../../../../atoms/donor/dropDownList/DropDownList";
import { useFormik } from "formik";
import { getDataFromLocalStorage } from "../../../../../utils/common/accessLocalStorage";
import {
  createLocation,
  getLocationByApplicationId,
  updateLocationByApplicationId
} from "../../../../../api/location";
import LocationPicker from "../../../../../assets/svg/locationPicker";
import { IconButton } from "@material-tailwind/react";
import QuestionButtonIcon from "../../../../../assets/svg/QuestionButtonIcon";
import { ToastContainer, toast } from "react-toastify";

interface GeoInfo {
  country?: string;
}
const AddressDetails = ({ setStep }: { setStep: (step: number) => void }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmit, setIsSubmit] = useState(true);
  const [initialValues, setInitialValues] = useState<any>({
    application: "",
    type: "ADDRESS",
    mapLocation: null,
    apartmentNo: "",
    street: "",
    landmark: "",
    city: "Dubai",
    country: "United Arab Emirates"
  });
  const emiratesCityOptions = [
    { value: "Dubai", label: "Dubai" },
    { value: "Abu dhabi", label: "Abu Dhabi" },
    { value: "Sharjah", label: "Sharjah" },
    { value: "Ajman", label: "Ajman" }
  ];

  const countryOptions = [
    { value: "United Arab Emirates", label: "United Arab Emirates" }
  ];

  // const initialValues = {
  //   application: "",
  //   type: "ADDRESS",
  //   mapLocation: null,
  //   apartmentNo: "",
  //   street: "",
  //   landmark: "",
  //   city: "Dubai",
  //   country: "United Arab Emirates"
  // };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
    enableReinitialize: true
  });

  const { values, handleChange } = formik;
  const getApplicationDetails = async () => {
    const applicationId = await getDataFromLocalStorage("donorApplicationId");
    await formik.setFieldValue("application", applicationId);
  };

  const citySelectionHandler = async (event: {
    value: string;
    label: string;
  }) => {
    await formik.setFieldValue("city", event.value);
  };

  const countrySelectionHandler = async (event: {
    value: string;
    label: string;
  }) => {
    await formik.setFieldValue("country", event.value);
  };

  const checkButtonDisabled = (): boolean => {
    if (
      values.apartmentNo === "" ||
      values.street === "" ||
      values.landmark === "" ||
      values.city === "" ||
      values.country === ""
    ) {
      return true;
    }
    return false;
  };

  const handleBackButtonClick = () => {
    setStep(1);
  };
  const getLocationData = async () => {
    setLoading(true);
    const applicationId = await getDataFromLocalStorage("donorApplicationId");
    const { apiSuccess, apiError }: any =
      await getLocationByApplicationId(applicationId);

    if (apiSuccess && apiSuccess.status === 200) {
      // initialValues = apiSuccess?.data.data;

      const {
        type,
        mapLocation,
        apartmentNo,
        street,
        landmark,
        city,
        country
      } = apiSuccess?.data.data;
      console.log(apiSuccess?.data.data);

      setInitialValues({
        type,
        mapLocation,
        apartmentNo,
        street,
        landmark,
        city,
        country
      });

      getApplicationDetails();
      setIsSubmit(false);
      // toast.success("mother data fetch successful!");
      // setStep(2);
    } else if (apiError) {
      console.log(apiError);
      setIsSubmit(true);

      // toast.error(apiError.response.data.message);
    }
    setLoading(false);
  };

  const handleNextButtonClick = async () => {
    if (checkButtonDisabled()) {
      toast.error("please fill all the inputs!");
    } else {
      if (values.application !== "" || values.application !== undefined) {
        const { apiError, apiSuccess }: any = await createLocation(
          values.application,
          values.type,
          null,
          values.apartmentNo,
          values.street,
          values.city,
          values.country,
          values.landmark
        );

        if (apiSuccess && apiSuccess.status === 200) setStep(3);
        else if (apiError) {
          alert(apiError.response.data.message);
        }
      } else {
        toast.error("Something went wrong with retrieving the application id");
        // alert("Something went wrong with retrieving the application id");
      }
    }
  };
  //   application: "",
  //   type: "ADDRESS",
  //   mapLocation: null,
  //   apartmentNo: "",
  //   street: "",
  //   landmark: "",
  //   city: "Dubai",
  //   country: "United Arab Emirates"
  const handleUpdateButton = async () => {
    setLoading(true);
    const applicationId = await getDataFromLocalStorage("donorApplicationId");
    if (values.application !== "" || values.application !== undefined) {
      const { apiError, apiSuccess }: any = await updateLocationByApplicationId(
        { ...values, id: applicationId }
      );

      if (apiSuccess && apiSuccess.status === 200) setStep(3);
      else if (apiError) {
        console.log(apiError);

        // alert(apiError.response.data.message);
      }
    } else {
      toast.error("Something went wrong with retrieving the application id");
      // alert("Something went wrong with retrieving the application id");
    }
    setLoading(false);
  };

  useEffect(() => {
    void getLocationData();
    void getApplicationDetails();
  }, []);

  const [ipAddress, setIpAddress] = useState("");
  const [geoInfo, setGeoInfo] = useState<GeoInfo | any>({});

  const getVisitorIpAddress = async () => {
    try {
      await fetch("https://api.ipify.org/?format=json")
        .then((response) => response.json())
        .then((data) => {
          setIpAddress(data.ip);
        });
    } catch (error) {
      console.log("Failed to fetch IP: ", error);
    }
  };

  useEffect(() => {
    getVisitorIpAddress();
  }, []);

  const fetchIpInfo = async () => {
    try {
      const res = await fetch(`http://ip-api.com/json/${ipAddress}`);
      const data = await res.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setGeoInfo(data);
      formik.setFieldValue("apartmentNo", data.isp || "");
      formik.setFieldValue("street", data.regionName || "");
      formik.setFieldValue("city", data.city || "");
      formik.setFieldValue("country", data.country || "");
      formik.setFieldValue("landmark", data.zip || "");
      console.log(data.isp, data.regionName, data.city, data.country, data.zip);
    } catch (error) {
      console.log("Failed to fetch IP: ", error);
    }
  };

  console.log(geoInfo);

  return (
    <div className="bg-white rounded-lg py-2.5 mt-4 w-[50rem] mb-20">
      <div className=" border-b-[1px] border-b-secondary">
        <span className=" text-primary text-5xl font-medium px-5">
          {t("address")}
        </span>
      </div>
      <div className="flex flex-row items-center justify-center py-5 ">
        <button
          className=" bg-[#133419] flex flex-row px-12 py-3 w-fit gap-3 rounded-md"
          onClick={fetchIpInfo}
        >
          <LocationPicker />
          <span className=" text-white font-medium text-base">
            {t("pickCurrentLocation")}
          </span>
        </button>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="h-px bg-secondary w-full" />
        <div className="text-base font-medium text-center">OR</div>
        <div className="h-px bg-secondary w-full" />
      </div>
      <div className="py-10 px-15 flex flex-col gap-2.5">
        <div className="flex flex-row w-full gap-6">
          <div className="flex-1">
            {/* <InputField
              label={t("villa")}
              placeholder={t("villa-placeholder")}
              value={values.apartmentNo}
              name="apartment"
              onInputChange={handleChange}
            /> */}
            <InputField
              label={t("villa")}
              placeholder={t("villa")}
              value={values.apartmentNo}
              onInputChange={handleChange}
              name="apartmentNo"
            />
          </div>

          <div className="flex-1">
            <InputField
              label={t("street")}
              placeholder={t("street")}
              value={values.street}
              onInputChange={handleChange}
              name="street"
            />
          </div>
        </div>

        <div className="flex flex-row w-full gap-6">
          <div className="flex-1">
            <InputField
              label={t("landmark")}
              placeholder={t("landmark")}
              value={values.landmark}
              onInputChange={handleChange}
              name="landmark"
            />
          </div>
          <div className="flex-1">
            <DropDownList
              options={countryOptions}
              name="country"
              value={values.country}
              // onSelect={() => {}}
              onChange={countrySelectionHandler}
              placeholder={t("country")}
            />
          </div>
        </div>

        <div className="flex flex-row w-full gap-6">
          <div className="flex-1">
            <DropDownList
              options={emiratesCityOptions}
              name="city"
              value={values.city}
              // onSelect={() => {}}
              onChange={citySelectionHandler}
              placeholder={t("emirate-city")}
            />
          </div>
          <div className="flex-1"></div>
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
          <div className="flex gap-1 items-center space-x-1.5 cursor-pointer">
            <span className="font-normal text-sm text-primary">
              {t("Loading...")}
            </span>
          </div>
        ) : (
          <div
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
              <QuestionButtonIcon isFlipped={true} />
            </IconButton>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddressDetails;
