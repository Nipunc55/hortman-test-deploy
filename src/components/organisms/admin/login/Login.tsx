/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
import Footer from "../footer/footer";
import {
  Button,
  Alert,
  Spinner,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
  Tabs,
  TabsHeader,
  Tab
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
// @ts-expect-error This will ignore the type of the library below
import { useCountries } from "use-react-countries";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n";
import LoginLogoIcon from "../../../../assets/svg/loginLogoIcon";
import DropDownArrow from "../../../../assets/svg/dropDownArrow";
import { login } from "../../../../api/auth";
import { useDispatch } from "react-redux";
import { updatePhoneNumber } from "../../../../redux/slices/login";
import DonorCreateModal from "../../../molecules/donor/modals/DonorRegister";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { countries } = useCountries();
  const [country, setCountry] = useState(40);
  const { countryCallingCode } = countries[country];
  const [locale, setLocale] = useState(i18n.language);
  const [activeTab, setActiveTab] = useState(locale);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  i18n.on("languageChanged", (_lng) => setLocale(i18n.language));
  const [isDonorRegistterModalOpen, setDonorRegisterModal] =
    useState<boolean>(false);
  const { t } = useTranslation();
  useEffect(() => {
    localStorage.clear();
  }, []);
  const data = [
    {
      label: "العربية",
      value: "ar"
    },
    {
      label: "ENGLISH",
      value: "en"
    }
  ];

  // const handleKeyPress = (e: any) => {
  //   if (e.key === "Enter") {
  //     handleSubmit();
  //   }
  // };

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsError(false);

    if (!phoneNumber.trim()) {
      // Phone number is empty or contains only spaces
      setIsError(true);
      setMessage("Please enter a valid phone number.");
      setIsLoading(false);
      return;
    }

    const { apiSuccess, apiError }: any = await login(phoneNumber);
    setIsLoading(false);
    // navigate("/otp", { state: { phoneNumber } });
    // dispatch(updatePhoneNumber(phoneNumber));
    // navigate("/otp", { state: { test: "test" }, replace: true });

    if (apiSuccess && apiSuccess.status === 200) {
      dispatch(updatePhoneNumber(phoneNumber));
      navigate("/otp", { state: { test: "test" }, replace: true });
    } else if (apiError) {
      setMessage(apiError.response.data.message);
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };
  // const handleRegister = () => {
  //   setDonorRegisterModal((pre) => !pre);
  // };
  const languageChange = (language: string | undefined) => {
    i18n.changeLanguage(language);
  };

  const handleChange = (value: string) => {
    setActiveTab(value);
    languageChange(value);
    document.body.style.direction = value === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className="flex flex-col justify-between items-center min-h-screen">
      {isError && (
        <Alert
          color="red"
          className="w-5/12 absolute flex justify-center top-10"
        >
          <span>{message}</span>
        </Alert>
      )}

      <div className="absolute top-10 right-20">
        <Tabs id="custom-animation" value={activeTab}>
          <TabsHeader
            placeholder={""}
            indicatorProps={{
              className:
                "bg-gradient-to-r from-[#9A953D] to-[#FFDA91] shadow-none"
            }}
            className="bg-transparent gold-gradient-input-border-select px-2 py-2 flex w-[165px] h-[50px]"
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                placeholder={""}
                onClick={() => handleChange(value)}
                className={`text-xs font-medium ${
                  activeTab === value ? "text-white" : "text-primary"
                }`}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
      </div>
      <div className="flex flex-col items-center space-y-9 mt-[10%]">
        <LoginLogoIcon />
        <div className="flex w-full border-2 border-textPrimary rounded-lg bg-white h-12.5">
          <Menu placement="bottom-start">
            <MenuHandler>
              <Button
                placeholder={""}
                ripple={false}
                variant="text"
                color="blue-gray"
                className="flex h-12.5 w-[91px] items-center gap-2 rounded-r-none bg-white/10 outline-none text-base text-black font-normal px-4"
              >
                {countryCallingCode}
                <DropDownArrow />
              </Button>
            </MenuHandler>
            <MenuList className="max-h-[20rem] w-[350px]" placeholder={""}>
              {countries
                .filter((country: any) => country.countryCallingCode === "+971")
                .map(({ name, flags, countryCallingCode }: any) => {
                  return (
                    <MenuItem
                      placeholder={""}
                      key={name}
                      value={name}
                      className="flex items-center gap-2"
                      onClick={() => setCountry(40)}
                    >
                      <img
                        src={flags.svg}
                        alt={name}
                        className="h-5 w-5 rounded-full object-cover"
                      />
                      {name}{" "}
                      <span className="ml-auto">{countryCallingCode}</span>
                    </MenuItem>
                  );
                })}
            </MenuList>
          </Menu>

          <Input
            type="tel"
            placeholder="Mobile Number"
            className="rounded-l-none text-base text-black font-normal !border-t-blue-gray-200 focus:!border-t-gray-900 border-none w-[258px] h-12.5"
            labelProps={{
              className: "before:content-none after:content-none"
            }}
            containerProps={{
              className: "w-full"
            }}
            onChange={(e: any) => {
              const formattedNumber = e.target.value.replace(/[^\d]/g, "");
              const phoneNumberWithCountryCode = "+971" + formattedNumber;
              setPhoneNumber(phoneNumberWithCountryCode);
            }}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            crossOrigin={""}
          />
        </div>
        <Button
          placeholder={""}
          disabled={isLoading}
          onClick={handleSubmit}
          className="rounded-[50px] flex justify-center bg-gradient-to-r from-[#9A793D] to-[#DFC073] shadow-none w-[160px] text-base font-bold"
        >
          {isLoading ? <Spinner color="orange" /> : t("continue")}
        </Button>
        {/* <Button
          placeholder={""}
          onClick={handleRegister}
          className="rounded-[50px] flex justify-center bg-gradient-to-r from-[#9A793D] to-[#DFC073] shadow-none w-[160px] text-base font-bold"
        >
          {"register"}
        </Button> */}
      </div>
      <DonorCreateModal
        open={isDonorRegistterModalOpen}
        handleOpen={setDonorRegisterModal}
      />
      <div>
        <Footer textColor="text-secondary" />
      </div>
    </div>
  );
};

export default Login;
