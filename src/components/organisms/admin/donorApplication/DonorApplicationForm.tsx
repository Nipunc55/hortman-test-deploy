/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useRef, useState } from "react";

import DatePicker from "react-datepicker";

// @ts-expect-error This will ignore the type of the library below
import { useCountries } from "use-react-countries";
import { t } from "i18next";
import i18n from "../../../../i18n";
import InputField from "../../../atoms/admin/inputField/InputField";
import DatePickerIcon from "../../../../assets/svg/datePickerIcon";
import DropDownList from "../../../atoms/admin/dropDownList/DropDownList";
import BasicButton from "../../../atoms/admin/buttons/BasicButton";
import { QUESTIONNAIRE } from "../../../../utils/constants/common";
import { getPersonalDetailByApplicationId } from "../../../../api/personal_detail";
import { Alert } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";
import { getDonorApplicationById } from "../../../../api/donor_application";
import { getLocationByApplicationId } from "../../../../api/location";
import { getSubmissionByApplicationIdAndQuestionId } from "../../../../api/submission";
import { UploadImageView } from "../../../atoms/donor/uploadImageView";

const DonorApplicationReportForm = ({ onTabChange }: { onTabChange: any }) => {
  const [fatherPassportIds, setFatherPassportIds] = useState({
    passportFirstPage: "",
    emiratesIdFront: "",
    emiratesIdBack: ""
  });
  const [motherPassportIds, setMotherPassportIds] = useState({
    passportFirstPage: "",
    emiratesIdFront: "",
    emiratesIdBack: ""
  });
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [nationality, setNationality] = useState("");
  const [alternatenumber, setAlternatenumber] = useState("");
  const [emiratesId, setEmiratesId] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [emailFather, setEmailFather] = useState("");
  const [fullNameFather, setFullNameFather] = useState("");
  const [dateOfBirthFather, setDateOfBirthFather] = useState(null);
  const [nationalityFather, setNationalityFather] = useState("");
  const [ethnicityFather, setEthnicityFather] = useState("");
  const [emiratesIdFather, setEmiratesIdFather] = useState("");
  const [alternatenumberFather, setAlternatenumberFather] = useState("");
  const [bankingType, setBankingType] = useState("-");
  const [sourceOfStemmCell, setSourceOfStemmCell] = useState("-");
  const [stemCellPackage, setStemCellPackage] = useState("");
  const { countries } = useCountries();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFather, setIsLoadingFather] = useState(true);
  const [message, setMessage] = useState(false);
  const { name } = useParams();
  const [expectedDiliveryAnswerd, setExpectedDiliveryAnswerd] = useState<{
    numberOfExpectedBabies: string;
    numberOfUmbilicalCords: string;
    expectedDateOfDelivery: Date | null;
    expectedHospitalOfDelivery: string;
  }>({
    numberOfExpectedBabies: "",
    numberOfUmbilicalCords: "",
    expectedDateOfDelivery: null,
    expectedHospitalOfDelivery: ""
  });

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
  useEffect(() => {
    console.log("ugernt", expectedDiliveryAnswerd?.expectedDateOfDelivery);

    // Mon Apr 22 2024 11:00:38 GMT+0530 (India Standard Time)
    // Mon Apr 22 2024 11:01:13 GMT+0530 (India Standard Time)
  }, [expectedDiliveryAnswerd]);

  const getFatherDonorDetails = async () => {
    setIsLoadingFather(true);
    setIsError(false);
    const { apiSuccess, apiError }: any =
      await getPersonalDetailByApplicationId(name, "Father");

    if (apiSuccess && apiSuccess.status === 200) {
      setFatherPassportIds({ ...apiSuccess?.data?.data });
      console.log(apiSuccess?.data?.data);
      setEmailFather(apiSuccess?.data?.data?.email);
      setFullNameFather(apiSuccess?.data?.data?.fullName);
      setAlternatenumberFather(apiSuccess?.data?.data?.alternatePhoneNum);
      setNationalityFather(apiSuccess?.data?.data?.nationality);
      setEmiratesIdFather(apiSuccess?.data?.data?.passport);
      setEthnicityFather(apiSuccess?.data?.data?.ethnicity);

      if (apiSuccess?.data?.data?.dob) {
        const inputDateString = apiSuccess?.data?.data?.dob;
        const formattedDate: any = new Date(inputDateString);

        if (!isNaN(formattedDate)) {
          setDateOfBirthFather(formattedDate);
        }
      }
      setIsLoadingFather(false);
    } else if (apiError) {
      setMessage(apiError.response.data.message);
      setIsError(true);
      setIsLoadingFather(false);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const getMotherDonorDetails = async () => {
    setIsError(false);
    setIsLoading(true);
    const { apiSuccess, apiError }: any =
      await getPersonalDetailByApplicationId(name, "Mother");

    if (apiSuccess && apiSuccess.status === 200) {
      // console.log(apiSuccess?.data?.data);
      setMotherPassportIds({ ...apiSuccess?.data?.data });
      setAlternatenumber(apiSuccess?.data?.data?.alternatePhoneNum);
      setEmail(apiSuccess?.data?.data?.email);
      setFullName(apiSuccess?.data?.data?.fullName);
      setNationality(apiSuccess?.data?.data?.nationality);
      setEmiratesId(apiSuccess?.data?.data?.passport);
      setEthnicity(apiSuccess?.data?.data?.ethnicity);

      if (apiSuccess?.data?.data?.dob) {
        const inputDateString = apiSuccess?.data?.data?.dob;
        const formattedDate: any = new Date(inputDateString);

        if (!isNaN(formattedDate)) {
          setDateOfBirth(formattedDate);
        }
      }

      setIsLoading(false);
    } else if (apiError) {
      setMessage(apiError.response.data.message);
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const getPackageDetails = async () => {
    setIsLoading(true);
    setIsError(false);
    const { apiSuccess, apiError }: any = await getDonorApplicationById(name!);
    if (apiSuccess && apiSuccess.status === 200) {
      // console.log(apiSuccess?.data?.data);
      setBankingType(apiSuccess?.data?.data?.banking);
      setSourceOfStemmCell(apiSuccess?.data?.data?.source_stem_cells);
      setStemCellPackage(apiSuccess?.data?.data?.package.name);
      setIsLoading(false);
    } else if (apiError) {
      setMessage(apiError.response.data.message);
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const getAddressDetails = async () => {
    setIsError(false);
    setIsLoading(true);
    const { apiSuccess, apiError }: any = await getLocationByApplicationId(
      name!
    );
    if (apiSuccess && apiSuccess.status === 200) {
      // console.log(apiSuccess?.data?.data);
      setApartmentNumber(apiSuccess?.data?.data?.apartmentNo);
      setStreet(apiSuccess?.data?.data?.street);
      setLandmark(apiSuccess?.data?.data?.landmark);
      setCity(apiSuccess?.data?.data?.city);
      setCountry(apiSuccess?.data?.data?.country);
      setIsLoading(false);
    } else if (apiError) {
      setMessage(apiError.response.data.message);
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const getExpectedDeliveryAnswers = async () => {
    const { apiSuccess, apiError }: any =
      await getSubmissionByApplicationIdAndQuestionId(
        name!,
        100,
        "EXPECTED_DELIVERY_QUESTION_ONE"
      );
    if (apiSuccess && apiSuccess.status === 200) {
      let numberOfBabies;
      if (apiSuccess?.data?.data[0]?.answers[0].answer[0] === "No") {
        numberOfBabies = 1;
      } else if (apiSuccess?.data?.data[0]?.answers[3].answer[0] === "Twins") {
        numberOfBabies = 2;
      } else if (
        apiSuccess?.data?.data[0]?.answers[3].answer[0] === "Triplets"
      ) {
        numberOfBabies = 3;
      } else {
        numberOfBabies = apiSuccess?.data?.data[0]?.answers[5]?.answer[0] ?? 0;
      }
      const dateStr = apiSuccess?.data?.data[0]?.answers[1]?.answer[0];
      const date = dateStr ? new Date(dateStr) : null;

      setExpectedDiliveryAnswerd({
        numberOfExpectedBabies: numberOfBabies,
        numberOfUmbilicalCords: apiSuccess?.data?.data[0]?.answers[1].answer,
        expectedDateOfDelivery: date,
        expectedHospitalOfDelivery:
          apiSuccess?.data?.data[0]?.answers[2]?.answer[0]
      });
    } else if (apiError) {
      setMessage(apiError.response.data.message);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    void getFatherDonorDetails();
    void getMotherDonorDetails();
    void getPackageDetails();
    void getAddressDetails();
    void getExpectedDeliveryAnswers();
  }, []);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
  ];

  const countryOptions = countries.map(({ name }: any) => {
    return { value: name, label: name };
  });
  const datePickerRef = useRef<any>(null);
  const datePickerFatherRef = useRef<any>(null);
  const handleDateChange = (date: any, type: string) => {
    if (type === "FATHER") {
      setDateOfBirthFather(date);
      closeDatePicker("FATHER");
    } else {
      setDateOfBirth(date);
      closeDatePicker("MOTHER");
    }
  };

  const closeDatePicker = (type: string) => {
    if (type === "FATHER") {
      if (datePickerFatherRef.current) {
        datePickerFatherRef.current.setOpen(false);
      }
    } else {
      if (datePickerRef.current) {
        datePickerRef.current.setOpen(false);
      }
    }
  };

  const openDatePicker = (type: string) => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
    if (type === "FATHER") {
      if (datePickerFatherRef.current) {
        datePickerFatherRef.current.setOpen(true);
      }
    } else {
      if (datePickerRef.current) {
        datePickerRef.current.setOpen(true);
      }
    }
  };
  return (
    <div className="w-full mt-5">
      {isError && (
        <Alert
          color="red"
          className="w-full container flex justify-center mt-10"
        >
          <span>{message}</span>
        </Alert>
      )}
      {isLoading || isLoadingFather ? (
        <div className="my-10 w-full flex justify-center items-center">
          <LoaderIconSvg />
        </div>
      ) : (
        <div className="flex flex-col w-full ">
          <div className="w-full flex flex-col px-5">
            <div className="text-black-500 text-lg font-medium my-4 ">
              {t("mothers-details")}
            </div>
            <div className="flex space-x-5 w-full pb-3 flex-row text-lg font-normal items-center justify-center">
              <div
                className={`flex flex-col space-5 w-full ${
                  isArabic && "text-right"
                }`}
              >
                <div>{t("full-name")}</div>
                <div className="w-full">
                  <InputField
                    placeholder=""
                    label=""
                    onInputChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    styles={{ width: "100%", height: "40px" }}
                    key={"key"}
                  />
                </div>
              </div>
              <div
                className={`flex flex-col space-5 w-full ${
                  isArabic && "text-right"
                }`}
              >
                <div>{t("dob")}</div>
                <div className="flex mt-0.75 justify-between items-center bg-white full-width-datepicker-wrapper gold-gradient-input-border">
                  <DatePicker
                    ref={datePickerRef}
                    selected={dateOfBirth}
                    onChange={(e) => {
                      handleDateChange(e, "MOTHER");
                    }}
                    dateFormat="dd/MM/yyyy"
                    // onBlur={() => {
                    //   openDatePicker("MOTHER");
                    // }}
                    disabled
                    placeholderText="DD/MM/YYYY"
                    className="w-full h-10 px-3 mt-1 rounded-l-md outline-none"
                  />
                  <div className="rounded-r-md pr-2">
                    <DatePickerIcon />
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col space-5 w-full ${
                  isArabic && "text-right"
                }`}
              >
                <div className="">{t("nationality")}</div>
                <div className="w-full">
                  <DropDownList
                    options={countryOptions}
                    name="rejectionBy"
                    value={nationality}
                    // onSelect={() => {}}
                    onChange={(event) => {
                      setNationality(event.value);
                    }}
                    disabled={true}
                  />
                </div>
              </div>
              <div
                className={`flex flex-col space-5 w-full ${
                  isArabic && "text-right"
                }`}
              >
                <div>{t("emirates-id")}</div>
                <div className="w-full">
                  <InputField
                    placeholder=""
                    label=""
                    onInputChange={(e) => setEmiratesId(e.target.value)}
                    value={emiratesId}
                    styles={{ width: "100%", height: "40px" }}
                    key={"key"}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-5 w-full pb-3 flex-row text-lg font-normal items-center justify-center">
              <div
                className={`flex flex-col space-5 w-full ${
                  isArabic && "text-right"
                }`}
              >
                <div className="">{t("ethnicity")}</div>
                <div className="w-full">
                  <DropDownList
                    options={countryOptions}
                    name="rejectionBy"
                    value={ethnicity}
                    // onSelect={() => {}}
                    onChange={(event) => {
                      setNationality(event.value);
                    }}
                    disabled={true}
                  />
                </div>
              </div>
              <div
                className={`flex flex-col space-5 w-full ${
                  isArabic && "text-right"
                }`}
              >
                <div className="">{t("email")}</div>
                <div className="w-full">
                  <InputField
                    placeholder=""
                    label=""
                    onInputChange={(e) => setEmail(e.target.value)}
                    value={email}
                    styles={{ width: "100%", height: "40px" }}
                    key={"key"}
                    disabled={true}
                  />
                </div>
              </div>
              <div
                className={`flex flex-col space-5 w-full ${
                  isArabic && "text-right"
                }`}
              >
                <div className="">{t("Alternate Mobile Number")}</div>
                <div className="w-full">
                  <InputField
                    placeholder=""
                    label=""
                    onInputChange={(e) => setEmail(e.target.value)}
                    value={alternatenumber}
                    styles={{ width: "100%", height: "40px" }}
                    key={"key"}
                    disabled={true}
                  />
                </div>
              </div>
              <div
                className={`flex flex-col space-5 w-full ${
                  isArabic && "text-right"
                }`}
              ></div>
            </div>
            <UploadImageView
              passportFirstPage={motherPassportIds?.passportFirstPage}
              emiratedIDFront={motherPassportIds?.emiratesIdFront}
              emiratedIDBack={motherPassportIds?.emiratesIdBack}
            />
          </div>

          <div className="w-full flex pt-7 flex-col border-b border-secondary pb-10">
            <div className="flex flex-col px-5">
              <div className="text-black-500 text-lg font-medium mb-4">
                {t("address")}
              </div>
              <div className="flex space-x-5 w-full pb-3 flex-row text-lg font-normal items-center justify-center">
                <div
                  className={`flex flex-col space-5 w-full ${
                    isArabic && "text-right"
                  }`}
                >
                  <div>{t("villa")}</div>
                  <div className="w-full">
                    <InputField
                      placeholder=""
                      label=""
                      onInputChange={(e) => setApartmentNumber(e.target.value)}
                      value={apartmentNumber}
                      styles={{ width: "100%", height: "40px" }}
                      key={"key"}
                      disabled={true}
                    />
                  </div>
                </div>
                <div
                  className={`flex flex-col space-5 w-full ${
                    isArabic && "text-right"
                  }`}
                >
                  <div>{t("street")}</div>
                  <div className="w-full">
                    <InputField
                      placeholder=""
                      label=""
                      onInputChange={(e) => setStreet(e.target.value)}
                      value={street}
                      styles={{ width: "100%", height: "40px" }}
                      key={"key"}
                      disabled={true}
                    />
                  </div>
                </div>
                <div
                  className={`flex flex-col space-5 w-full ${
                    isArabic && "text-right"
                  }`}
                >
                  <div>{t("landmark")}</div>
                  <div className="w-full">
                    <InputField
                      placeholder=""
                      label=""
                      onInputChange={(e) => setLandmark(e.target.value)}
                      value={landmark}
                      styles={{ width: "100%", height: "40px" }}
                      key={"key"}
                      disabled={true}
                    />
                  </div>
                </div>
                <div
                  className={`flex flex-col space-5 w-full ${
                    isArabic && "text-right"
                  }`}
                >
                  <div className="">{t("country")}</div>
                  <div className="w-full">
                    <DropDownList
                      options={countryOptions}
                      name="rejectionBy"
                      value={country}
                      // onSelect={() => {}}
                      onChange={(event) => {
                        setCountry(event.value);
                      }}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex space-x-5  text-lg font-normal">
                <div
                  className={`flex flex-col space-5 w-3/12 xl:pr-3 ${
                    isArabic && "text-right"
                  }`}
                >
                  <div>{t("emirate-city")}</div>
                  <div className="w-full">
                    <InputField
                      placeholder=""
                      label=""
                      onInputChange={(e) => setCountry(e.target.value)}
                      value={city}
                      styles={{ width: "100%", height: "40px" }}
                      key={"key"}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col pt-7 border-b border-secondary pb-10">
            <div className="flex flex-col px-5">
              <div className="text-black-500 text-lg font-medium mb-4">
                {t("fathers-details")}
              </div>
              <div className="flex space-x-5 w-full pb-3 flex-row text-lg font-normal items-center justify-center">
                <div
                  className={`flex flex-col space-5 w-full ${
                    isArabic && "text-right"
                  }`}
                >
                  <div>{t("full-name")}</div>
                  <div className="w-full">
                    <InputField
                      placeholder=""
                      label=""
                      onInputChange={(e) => setFullNameFather(e.target.value)}
                      value={fullNameFather}
                      styles={{ width: "100%", height: "40px" }}
                      key={"key"}
                      disabled={true}
                    />
                  </div>
                </div>
                <div
                  className={`flex flex-col space-5 w-full ${
                    isArabic && "text-right"
                  }`}
                >
                  <div>{t("dob")}</div>
                  <div className="flex mt-0.75 justify-between items-center bg-white full-width-datepicker-wrapper gold-gradient-input-border">
                    <DatePicker
                      ref={datePickerFatherRef}
                      selected={dateOfBirthFather}
                      onChange={(e) => {
                        handleDateChange(e, "FATHER");
                      }}
                      dateFormat="dd/MM/yyyy"
                      // onBlur={() => {
                      //   openDatePicker("FATHER");
                      // }}
                      disabled={true}
                      placeholderText="DD/MM/YYYY"
                      className="w-full h-10 px-3 mt-1 rounded-l-md outline-none"
                    />
                    <div className="rounded-r-md pr-2">
                      <DatePickerIcon />
                    </div>
                  </div>
                </div>
                <div
                  className={`flex flex-col w-full ${isArabic && "text-right"}`}
                >
                  <div className="">{t("nationality")}</div>
                  <div className="w-full">
                    <DropDownList
                      options={countryOptions}
                      name="rejectionBy"
                      value={nationalityFather}
                      // onSelect={() => {}}
                      onChange={(event) => {
                        setNationalityFather(event.value);
                      }}
                      disabled={true}
                    />
                  </div>
                </div>
                <div
                  className={`flex flex-col space-5 w-full ${
                    isArabic && "text-right"
                  }`}
                >
                  <div>{t("emirates-id")}</div>
                  <div className="w-full">
                    <InputField
                      placeholder=""
                      label=""
                      onInputChange={(e) => setEmiratesIdFather(e.target.value)}
                      value={emiratesIdFather}
                      styles={{ width: "100%", height: "40px" }}
                      key={"key"}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
              <div className="flex space-x-5 w-full pb-3 flex-row text-lg font-normal items-center justify-center">
                <div
                  className={`flex flex-col space-5 w-full ${
                    isArabic && "text-right"
                  }`}
                >
                  <div className="">{t("ethnicity")}</div>
                  <div className="w-full">
                    <DropDownList
                      options={countryOptions}
                      name="rejectionBy"
                      value={ethnicityFather}
                      // onSelect={() => {}}
                      onChange={(event) => {
                        setNationality(event.value);
                      }}
                      disabled={true}
                    />
                  </div>
                </div>
                <div
                  className={`flex flex-col space-5 w-full ${
                    isArabic && "text-right"
                  }`}
                >
                  <div className="">{t("email")}</div>
                  <div className="w-full">
                    <InputField
                      placeholder=""
                      label=""
                      onInputChange={(e) => setEmailFather(e.target.value)}
                      value={emailFather}
                      styles={{ width: "100%", height: "40px" }}
                      key={"key"}
                      disabled={true}
                    />
                  </div>
                </div>
                <div
                  className={`flex flex-col space-5 w-full ${
                    isArabic && "text-right"
                  }`}
                >
                  <div className="">{t("Alternate Mobile Number")}</div>
                  <div className="w-full">
                    <InputField
                      placeholder=""
                      label=""
                      onInputChange={(e) => setEmail(e.target.value)}
                      value={alternatenumberFather}
                      styles={{ width: "100%", height: "40px" }}
                      key={"key"}
                      disabled={true}
                    />
                  </div>
                </div>
                <div
                  className={`flex flex-col space-5 w-full ${
                    isArabic && "text-right"
                  }`}
                ></div>
              </div>

              <UploadImageView
                passportFirstPage={fatherPassportIds?.passportFirstPage}
                emiratedIDFront={fatherPassportIds?.emiratesIdFront}
                emiratedIDBack={fatherPassportIds?.emiratesIdBack}
              />
            </div>
          </div>
          <div className="w-full flex flex-col border-b border-secondary py-7">
            <div className="flex flex-col px-5">
              <div className="text-black-500 text-lg font-medium mt-4">
                {t("package")}
              </div>
              <div className="flex justify-start gap-5 w-full py-3 flex-row text-lg font-normal items-center">
                <div
                  className={`flex flex-col space-5 w-full ${isArabic && "text-right"}`}
                >
                  <div className="">{t(`banking-type`)}</div>
                  <div className="w-full">
                    <DropDownList
                      options={options}
                      name="rejectionBy"
                      value={bankingType}
                      // onSelect={() => {}}
                      onChange={() => {
                        setBankingType("");
                      }}
                      disabled={true}
                    />
                  </div>
                </div>
                <div
                  className={`flex flex-col space-5 w-full ${isArabic && "text-right"}`}
                >
                  <div className="">{t(`source-stemm-cell`)}</div>
                  <div className="w-full">
                    <DropDownList
                      options={options}
                      name="rejectionBy"
                      value={sourceOfStemmCell}
                      // onSelect={() => {}}
                      onChange={() => {
                        setSourceOfStemmCell("");
                      }}
                      disabled={true}
                    />
                  </div>
                </div>
                <div
                  className={`flex flex-col space-5 w-full ${isArabic && "text-right"}`}
                >
                  <div className="">{t(`stem-cell-package`)}</div>
                  <div className="w-full">
                    <DropDownList
                      options={options}
                      name="rejectionBy"
                      value={stemCellPackage}
                      // onSelect={() => {}}
                      onChange={() => {
                        setStemCellPackage("");
                      }}
                      disabled={true}
                    />
                  </div>
                </div>
                <div
                  className={`flex flex-col space-5 w-full ${isArabic && "text-right"}`}
                ></div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col border-secondary">
            <div className="flex flex-col px-5 gap-8">
              <div className="text-black-500 text-lg font-medium mt-10">
                Expected Delivery Info
              </div>
              <div className="flex flex-col  gap-5 w-full py-3  text-lg font-normal items-center">
                <div
                  className={`flex flex-row  justify-between space-5 w-full ${isArabic && "text-right"}`}
                >
                  <div className="">Number of expected baby/babies</div>
                  <div className="w-full max-w-[331px]">
                    <InputField
                      placeholder=""
                      label=""
                      onInputChange={(e) => setApartmentNumber(e.target.value)}
                      value={expectedDiliveryAnswerd.numberOfExpectedBabies}
                      styles={{ width: "100%", height: "40px" }}
                      key={"key"}
                      disabled={true}
                    />
                  </div>
                </div>
                <div
                  className={`flex flex-row  justify-between space-5 w-full ${isArabic && "text-right"}`}
                >
                  <div className="">
                    Number of umbilical cord’s to be banked
                  </div>
                  <div className="w-full max-w-[331px]">
                    <InputField
                      placeholder=""
                      label=""
                      onInputChange={(e) => setApartmentNumber(e.target.value)}
                      value={"-"}
                      styles={{ width: "100%", height: "40px" }}
                      key={"key"}
                      disabled={true}
                    />
                  </div>
                </div>
                <div
                  className={`flex flex-row  justify-between space-5 w-full ${isArabic && "text-right"}`}
                >
                  <div className="">Expected date of delivery</div>
                  <div className="w-full max-w-[331px]">
                    <div className="flex mt-0.75 justify-between items-center bg-white full-width-datepicker-wrapper gold-gradient-input-border">
                      <DatePicker
                        ref={datePickerRef}
                        selected={
                          expectedDiliveryAnswerd.expectedDateOfDelivery
                        }
                        onChange={(e) => {
                          handleDateChange(e, "MOTHER");
                        }}
                        dateFormat="dd/MM/yyyy"
                        // onBlur={() => {
                        //   openDatePicker("MOTHER");
                        // }}
                        disabled={true}
                        placeholderText="DD/MM/YYYY"
                        className="w-full h-10 px-3 mt-1 rounded-l-md outline-none"
                      />
                      <div className="rounded-r-md pr-2">
                        <DatePickerIcon />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`flex flex-row  justify-between space-5 w-full ${isArabic && "text-right"}`}
                >
                  <div className="">Expected hospital of delivery</div>
                  <div className="w-full max-w-[331px]">
                    <DropDownList
                      options={options}
                      name="rejectionBy"
                      value={
                        expectedDiliveryAnswerd?.expectedHospitalOfDelivery
                      }
                      // onSelect={() => {}}
                      onChange={() => {
                        setBankingType("");
                      }}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end px-5 pt-8">
            <BasicButton
              text={`${t("next")}`}
              onClick={() => {
                onTabChange(QUESTIONNAIRE);
              }}
              styledBorderEnabled={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorApplicationReportForm;
