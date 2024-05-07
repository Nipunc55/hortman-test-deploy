import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import DropDownList from "../../../../atoms/admin/dropDownList/DropDownList";
import InputField from "../../../../atoms/donor/inputField/InputField";
import { Checkbox } from "@material-tailwind/react";
import i18n from "../../../../../i18n";
import { t } from "i18next";
import TextAreaInput from "../../../../atoms/admin/inputs/TextAreaInput";
import BasicButton from "../../../../atoms/admin/buttons/BasicButton";
import { useParams } from "react-router-dom";
import { createKitDispatch, getDrivers } from "../../../../../api/kitStatus";
import { getDonorApplicationById } from "../../../../../api/donor_application";
import dayjs from "dayjs";
import { updateApplicationStatusByUser } from "../../../../../api/donor";

interface KitDispatchFormTypes {
  delivery_date_time: Date;
  driver: {
    value: string;
    label: string;
  };
  contact_person: string;
  contact_number: string;
  address: string;
  instructions: string;
  application: string;
}

const KitDispatchModal = ({ handleClose }: { handleClose: () => void }) => {
  const { name } = useParams();
  const datePickerRef = useRef<any>(null);
  const [locale, setLocale] = useState(i18n.language);
  const isArabic = locale === "ar";

  const [donorApplication, setDonorApplication] = useState<any>("");

  const initialValues: KitDispatchFormTypes = {
    application: name ?? "",
    driver: {
      value: "",
      label: ""
    },
    delivery_date_time: new Date(),
    contact_person: "",
    contact_number: "",
    address: "",
    instructions: ""
  };
  const handleSubmit = async () => {
    const payload = {
      ...values,
      driver: values.driver.value
    };
    const { apiError, apiSuccess } = await createKitDispatch({ data: payload });
    if (apiSuccess) {
      const currentDate = dayjs().format("MMMM DD, YYYY");
      const { apiError: updateAppApiError }: any =
        await updateApplicationStatusByUser(
          { type: "kit_status", date: currentDate },
          name!
        );
      if (updateAppApiError) {
        console.log(updateAppApiError.response.data.message);

        // alert(updateAppApiError.response.data.message);
      }
      handleClose();
    } else if (apiError) {
      alert("Error");
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validateOnChange: false
  });

  const { values, handleChange } = formik;

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

  const dateOfBirthHandler = async (date: any) => {
    await formik.setFieldValue("delivery_date_time", date);
    closeDatePicker();
  };

  const assignedToSelectionHandler = async (event: {
    value: string;
    label: string;
  }) => {
    await formik.setFieldValue("driver", event);
  };

  // const assignedToOptions = [
  //   { value: "Ibrar Ahmed", label: "Ibrar Ahmed" },
  //   { value: "Talha Ahmed", label: "Talha Ahmed" },
  //   { value: "Ali Ahmed", label: "Ali Ahmed" }
  // ];

  const getDonorApplication = async () => {
    const response = await getDonorApplicationById(name ?? "");
    if (response.apiSuccess) {
      const apiSuccess = response.apiSuccess as any;
      setDonorApplication(apiSuccess?.data?.data?.delivery);
    }
  };
  const [assignedToOpts, setAssignedToOpts] = useState<any[]>([]);
  const renderDrivers = async () => {
    const response = await getDrivers();

    if (response.apiSuccess) {
      const apiSuccess = response.apiSuccess as any;
      if (apiSuccess.data.data.docs) {
        const drivers = apiSuccess?.data?.data?.docs;
        const driverOptions = drivers.map((driver: any) => {
          return {
            value: driver._id,
            label: driver.name
          };
        });
        setAssignedToOpts(driverOptions);
      }
    } else {
      const apiError = response.apiSuccess as any;
      console.log(apiError, "apiError");
    }
  };
  useEffect(() => {
    const updateLocale = () => {
      setLocale(i18n.language);
    };

    void renderDrivers();
    void getDonorApplication();
    i18n.on("languageChanged", updateLocale);
    closeDatePicker();
    return () => {
      i18n.off("languageChanged", updateLocale);
    };
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between gap-4">
        <div className="flex w-full flex-1 flex-col">
          <span className={`font-normal normal-case text-black-500`}>
            {t("kit-dispatch-modal-datePicker")}
          </span>
          <DatePicker
            ref={datePickerRef}
            selected={values.delivery_date_time}
            onChange={dateOfBirthHandler}
            name="dob"
            dateFormat="dd/MM/yyyy"
            // onBlur={openDatePicker}
            placeholderText="DD/MM/YYYY"
            className="w-full h-10 px-3 mt-1 rounded-md outline-none"
            wrapperClassName="full-width-datepicker-wrapper gold-gradient-input-border"
          />
        </div>
        <div className="flex-1">
          <DropDownList
            options={assignedToOpts}
            name="driver"
            value={values.driver.label}
            // onSelect={() => {}}
            onChange={assignedToSelectionHandler}
            placeholder={t("kit-dispatch-modal-assignTo")}
          />
        </div>
      </div>

      <div className="flex flex-row justify-between gap-4">
        <div className="flex w-full flex-1 flex-col">
          <InputField
            label={t("kit-dispatch-modal-contactPerson")}
            placeholder={t("kit-dispatch-modal-contactPerson")}
            value={values.contact_person}
            onInputChange={handleChange}
            name="contact_person"
          />
        </div>
        <div className="flex-1">
          <InputField
            label={t("kit-dispatch-modal-Contact-Number")}
            placeholder={"971 50 1234567"}
            value={values.contact_number}
            onInputChange={handleChange}
            name="contact_number"
          />
        </div>
      </div>

      <div className="flex flex-row justify-between gap-4 h-36">
        <div className="flex-1 flex flex-col">
          <div className="flex flex-row items-center">
            <Checkbox
              crossOrigin={undefined}
              className="healthcare-professional-form-check-box"
              onChange={async (e) => {
                if (e.target.checked) {
                  if (donorApplication) {
                    await formik.setFieldValue("address", donorApplication);
                  } else {
                    alert("No Address Found, Enter manually");
                    e.target.checked = false;
                  }
                }
              }}
            />
            <div
              className={`flex  items-center justify-center ${
                isArabic ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <span className=" text-base">
                {t("kit-dispatch-modal-pick-location")}
              </span>
            </div>
          </div>
          <div className="h-full">
            <TextAreaInput
              name={"address"}
              value={values.address}
              height="h-17"
              onChange={handleChange}
              label={t("kit-dispatch-modal-Other-Address")}
              placeholder={t("kit-dispatch-modal-Other-Address-placeholder")}
            />
          </div>
        </div>
        <div className="flex-1">
          <TextAreaInput
            name={"instructions"}
            value={values.instructions}
            onChange={handleChange}
            height="h-27"
            label={t("kit-dispatch-modal-instructions")}
            placeholder={t("kit-dispatch-modal-instructions-placeholder")}
          />
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <div className=" w-31">
          <BasicButton
            onClick={handleSubmit}
            text={`${t("submit")}`}
            style={{
              backgroundColor: "#EFE8D8",
              color: "#000000"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default KitDispatchModal;
