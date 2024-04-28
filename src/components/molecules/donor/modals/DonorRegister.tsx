/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
  Input
} from "@material-tailwind/react";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
// @ts-expect-error This will ignore the type of the library below
import { useCountries } from "use-react-countries";
import { type FormikErrors, useFormik } from "formik";
import { donorCreationSchema } from "../../../../utils/validations";
// import DropDownList from "../../../atoms/admin/dropDownList/DropDownList";
import { PopupFormSubmitButton } from "../../../atoms/admin/buttons/PopupButtons";
import InputField from "../../../atoms/admin/inputField/InputField";
import DropDownArrow from "../../../../assets/svg/dropDownArrow";
import { createDonor } from "../../../../api/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { status } from "../../../../types/userTypes";

interface UserCreateModalModalProps {
  open: boolean;
  handleOpen: (value: boolean) => void;
}

const DonorCreateModal = ({ open, handleOpen }: UserCreateModalModalProps) => {
  const { countries } = useCountries();
  const [country, setCountry] = useState(0);
  const { countryCallingCode } = countries[country];
  const initialValues = {
    fullName: "",
    email: "",
    mobileNumber: ""
  };
  //   const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //   const [message, setMessage] = useState("");
  //   const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, e) => {
      setIsLoading(true);
      //   setIsError(false);
      console.log("onsubmit");
      const id = toast.loading("User is creating...");

      const { apiSuccess, apiError }: any = await createDonor(
        values.fullName,
        values.email,
        values.mobileNumber
      );

      if (apiSuccess) {
        toast.update(id, {
          render: "Account crreated successfully",
          type: "success",
          isLoading: false
        });
        setTimeout(() => {
          resetForm(e);
          handleOpen(false);
        }, 3000);
      } else if (apiError) {
        toast.update(id, {
          render: apiError.response.data.message,
          type: "error",
          isLoading: false
        });
      }
      setIsLoading(false);
    },
    validationSchema: donorCreationSchema,
    validateOnChange: true
  });

  const resetForm = (e: any) => {
    formik.handleReset(e);
  };

  const { errors, values } = formik;
  const checkValidations = () => {
    // if (Object.keys(errors).length === 0) {
    //   toast.error("Please fill all the fields!");
    //   return true;
    // }

    const typedErrors: FormikErrors<any> = errors;

    const firstErrorValue = (Object.values(typedErrors) as string[])[0];

    if (firstErrorValue) {
      toast.error(firstErrorValue);
      return true;
    }
  };
  return (
    <>
      <Dialog open={open} size={"xs"} handler={handleOpen} placeholder={""}>
        <ToastContainer />
        <DialogHeader placeholder={""}>
          <div className="w-full flex justify-between items-center">
            <div className="text-5xl text-textPrimary font-medium">
              Create Account
            </div>
            <IconButton
              placeholder={""}
              onClick={() => handleOpen(false)}
              className="bg-transparent outline-none shadow-none hover:shadow-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clipPath="url(#clip0_8213_18063)">
                  <path
                    d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 10L14 14M14 10L10 14"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_8213_18063">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </IconButton>
          </div>
        </DialogHeader>
        <hr className="border border-secondary" />
        {/* {isError && (
          <div className="w-full flex justify-center items-center">
            <Alert color="red" className="w-11/12 p-2 mt-4">
              <span>{message}</span>
            </Alert>
          </div>
        )} */}
        <DialogBody placeholder={""}>
          <InputField
            label={"Full Name"}
            placeholder={"Full Name"}
            value={values.fullName}
            onInputChange={(e) => {
              void formik.setFieldValue("fullName", e.target.value);
            }}
          />
          <div className="mt-4">
            <span
              className={`font-normal normal-case text-black-500 text-sm w-full`}
            >
              Mobile
            </span>
            <div className="flex w-full gold-gradient-input-border-select rounded-lg bg-white h-10">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    placeholder={""}
                    ripple={false}
                    variant="text"
                    color="blue-gray"
                    className="flex h-10 w-[100px] text-sm px-2 items-center gap-1 rounded-r-none bg-white/10 outline-none text-black font-normal"
                  >
                    {countryCallingCode}
                    <DropDownArrow />
                  </Button>
                </MenuHandler>
                <MenuList
                  className="max-h-[20rem] w-[350px] z-300000"
                  placeholder={""}
                >
                  {countries
                    .filter(
                      (country: any) => country.countryCallingCode === "+971"
                    )
                    .map(
                      (
                        { name, flags, countryCallingCode }: any,
                        index: any
                      ) => {
                        return (
                          <MenuItem
                            placeholder={""}
                            key={name}
                            value={name}
                            className="flex items-center gap-2"
                            onClick={() => setCountry(index)}
                          >
                            <img
                              src={flags.svg}
                              alt={name}
                              className="h-5 w-5 rounded-full object-cover"
                            />
                            {name}{" "}
                            <span className="ml-auto">
                              {countryCallingCode}
                            </span>
                          </MenuItem>
                        );
                      }
                    )}
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
                value={values.mobileNumber}
                onChange={(e) => {
                  void formik.setFieldValue("mobileNumber", e.target.value);
                }}
                crossOrigin={""}
              />
            </div>
          </div>
          <div className="mt-4">
            <InputField
              label={"Email"}
              placeholder={"Email"}
              value={values.email}
              onInputChange={(e) => {
                void formik.setFieldValue("email", e.target.value);
              }}
            />
          </div>
          {/* <div className="w-full mt-4">
            <DropDownList
              options={options}
              name="role"
              value={values.role}
              // onSelect={() => {}}
              onChange={onRoleHandler}
              placeholder="Role"
            />
          </div> */}
          {/* <div className="w-full mt-4">
            <DropDownList
              options={optionsStatus}
              name="status"
              // eslint-disable-next-line no-constant-condition
              value={values.status ? "Active" : "Inactive"}
              // onSelect={() => {}}
              onChange={onStatusHandler}
              placeholder="Status"
            />
          </div> */}
        </DialogBody>

        <DialogFooter placeholder={""}>
          <div className="w-full flex justify-center">
            <div
              className="flex"
              onClick={() => {
                if (!isLoading) {
                  checkValidations();
                  void formik.submitForm();
                  console.log("clicked");
                }
              }}
            >
              <PopupFormSubmitButton text={"Save"} isLoading={isLoading} />
            </div>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DonorCreateModal;
