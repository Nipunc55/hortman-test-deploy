import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";
import { t } from "i18next";
import i18n from "../../../../../i18n";
import BasicButton from "../../../../atoms/admin/buttons/BasicButton";
import InputField from "../../../../atoms/admin/inputField/InputField";
// import DropDownList from "../../../../atoms/admin/dropDownList/DropDownList";
import QuestionButtonIcon from "../../../../../assets/svg/QuestionButtonIcon";
import { getDataFromLocalStorage } from "../../../../../utils/common/accessLocalStorage";
import { addSubmission } from "../../../../../api/submission";
import { EXPECTED_DELIVERY_QUESTION_ONE } from "../../../../../utils/constants/common";
import { toast, ToastContainer } from "react-toastify";

enum babyDeliveryType {
  TWINS = "Twins",
  TRIPLETS = "Triplets",
  MORE = "More",
  NONE = "None"
}
const ExpectedDelivery = ({ setStep }: { setStep: (step: number) => void }) => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<{
    isExpectingTwinsOrTriplets: boolean | undefined;
    nestedQuestionTwinsOrTriplets?: {
      deliveryType?: babyDeliveryType;
      bankCordBlood?: boolean;
      noOfBabies?: number;
    };
    expectedDeliveryDate: Date;
    expectedDeliveryLocation: string;
  }>({
    isExpectingTwinsOrTriplets: undefined,
    nestedQuestionTwinsOrTriplets: {
      deliveryType: babyDeliveryType.NONE,
      bankCordBlood: false,
      noOfBabies: 0
    },
    expectedDeliveryDate: new Date(),
    expectedDeliveryLocation: ""
  });
  const [loading, setLoading] = useState(false);
  const currentDate = new Date();
  const handleClick = async () => {
    console.log("handleClick");
    console.log(answers.expectedDeliveryLocation);

    setLoading(true);
    const applicationId: string =
      (await getDataFromLocalStorage("donorApplicationId")) ?? "";
    const answersObj = [
      {
        index: 1,
        answerType: "YESANDNO",
        answer: [answers.isExpectingTwinsOrTriplets ? "Yes" : "No"]
      },
      {
        index: 2,
        answerType: "DATE",
        answer: [answers.expectedDeliveryDate.toISOString()]
      },
      {
        index: 3,
        answerType: "TEXT",
        answer: [answers.expectedDeliveryLocation]
      },
      {
        index: 4,
        answerType: "TEXT",
        answer: [answers.nestedQuestionTwinsOrTriplets?.deliveryType || ""]
      },
      {
        index: 5,
        answerType: "YESANDNO",
        answer: [
          answers.nestedQuestionTwinsOrTriplets?.bankCordBlood ? "Yes" : "No"
        ]
      },
      {
        index: 6,
        answerType: "TEXT",
        answer: [
          answers.nestedQuestionTwinsOrTriplets?.noOfBabies?.toString() || ""
        ]
      }
    ];
    try {
      const { apiSuccess, apiError }: any = await addSubmission(
        applicationId,
        EXPECTED_DELIVERY_QUESTION_ONE,
        "100",
        "100",
        answersObj
      );
      if (apiSuccess) {
        toast.success("Successfuly added donor information!");

        setLoading(false);
        setTimeout(() => {
          localStorage.removeItem("donor_step");
          navigate("/quick-setup/questionnaire");
        }, 3000);
      } else {
        setLoading(false);
        console.log(apiError);
        toast.error(apiError.message);
        // alert(apiError.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleChangeNmberOfBabies = (e: any) => {
    setAnswers({
      ...answers,
      nestedQuestionTwinsOrTriplets: {
        ...answers.nestedQuestionTwinsOrTriplets,
        noOfBabies: e.target.value
      }
    });
  };

  const handleDateChange = (date: any) => {
    setAnswers((prev) => {
      return {
        ...prev,
        expectedDeliveryDate: date
      };
    });
    closeDatePicker();
  };

  // const hospitalOptions = [
  //   {
  //     label: "American Hospital Dubai - Dubai",
  //     value: "American Hospital Dubai - Dubai"
  //   },
  //   {
  //     label: "Sheikh Khalifa Medical City - Abu Dhabi",
  //     value: "Sheikh Khalifa Medical City - Abu Dhabi"
  //   },
  //   {
  //     label: "Rashid Hospital - Dubai",
  //     value: "Rashid Hospital - Dubai"
  //   },
  //   {
  //     label: "Al Zahra Hospital - Dubai",
  //     value: "Al Zahra Hospital - Dubai"
  //   }
  // ];

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
  return (
    <div className=" bg-white rounded-lg py-2.5 mt-4 w-[50rem] mb-20 min-h-[480px] justify-between flex flex-col">
      <div className="flex flex-col h-full ">
        <div className=" border-b-[1px] border-b-secondary pb-3">
          <span className=" text-primary text-5xl font-medium px-5 ">
            {t("expected-delivery-info")}
          </span>
        </div>
        <div className="py-5 flex flex-col ">
          <div className="pb-5 flex flex-row justify-between px-15">
            <span>{t("quick-setup-01")}</span>
            <div className="flex flex-row gap-3 max-w-xs">
              <BasicButton
                onClick={() => {
                  setAnswers({
                    ...answers,
                    isExpectingTwinsOrTriplets: true
                  });
                }}
                text={`${t("yes")}`}
                style={{
                  backgroundColor: answers.isExpectingTwinsOrTriplets
                    ? "#C8934F"
                    : "#EFE8D8",
                  color: "#000000"
                }}
              />
              <BasicButton
                onClick={() => {
                  setAnswers({
                    ...answers,
                    isExpectingTwinsOrTriplets: false
                  });
                }}
                text={`${t("no")}`}
                style={{
                  backgroundColor:
                    !answers.isExpectingTwinsOrTriplets &&
                    answers.isExpectingTwinsOrTriplets !== undefined
                      ? "#C8934F"
                      : "#EFE8D8",
                  color: "#000000"
                }}
              />
            </div>
          </div>
          <div className="">
            {answers.isExpectingTwinsOrTriplets && (
              <div className="flex flex-col ">
                <div className="flex flex-row justify-between py-5 px-15 border-t-[1px] border-b-secondary">
                  <span>{t("quick-setup-02")}</span>
                  <div className="flex flex-row gap-3 max-w-xs">
                    <BasicButton
                      onClick={() => {
                        setAnswers({
                          ...answers,
                          nestedQuestionTwinsOrTriplets: {
                            ...answers.nestedQuestionTwinsOrTriplets,
                            deliveryType: babyDeliveryType.TWINS
                          }
                        });
                      }}
                      text={`${t("twins")}`}
                      style={{
                        backgroundColor:
                          answers.nestedQuestionTwinsOrTriplets
                            ?.deliveryType === babyDeliveryType.TWINS
                            ? "#C8934F"
                            : "#EFE8D8",
                        color: "#000000",
                        width: "100px"
                      }}
                    />
                    <BasicButton
                      onClick={() => {
                        setAnswers({
                          ...answers,
                          nestedQuestionTwinsOrTriplets: {
                            ...answers.nestedQuestionTwinsOrTriplets,
                            deliveryType: babyDeliveryType.TRIPLETS
                          }
                        });
                      }}
                      text={`${t("triplet")}`}
                      style={{
                        backgroundColor:
                          answers.nestedQuestionTwinsOrTriplets
                            ?.deliveryType === babyDeliveryType.TRIPLETS
                            ? "#C8934F"
                            : "#EFE8D8",
                        color: "#000000",
                        width: "100px"
                      }}
                    />
                    <BasicButton
                      onClick={() => {
                        setAnswers({
                          ...answers,
                          nestedQuestionTwinsOrTriplets: {
                            ...answers.nestedQuestionTwinsOrTriplets,
                            deliveryType: babyDeliveryType.MORE
                          }
                        });
                      }}
                      text={`${t("more")}`}
                      style={{
                        backgroundColor:
                          answers.nestedQuestionTwinsOrTriplets
                            ?.deliveryType === babyDeliveryType.MORE
                            ? "#C8934F"
                            : "#EFE8D8",
                        color: "#000000",
                        width: "100px"
                      }}
                    />
                  </div>
                </div>

                {answers.nestedQuestionTwinsOrTriplets?.deliveryType ===
                  babyDeliveryType.MORE && (
                  <div className="flex flex-row justify-between px-15 py-5 border-t-[1px] border-b-secondary">
                    <span>{t("quick-setup-03")}</span>
                    <div className="w-[320px]">
                      <InputField
                        placeholder={""}
                        value={
                          answers.nestedQuestionTwinsOrTriplets.noOfBabies?.toString() ||
                          ""
                        }
                        onInputChange={handleChangeNmberOfBabies}
                      />
                    </div>
                  </div>
                )}

                {(answers.nestedQuestionTwinsOrTriplets?.deliveryType ===
                  babyDeliveryType.MORE ||
                  answers.nestedQuestionTwinsOrTriplets?.deliveryType ===
                    babyDeliveryType.TRIPLETS ||
                  answers.nestedQuestionTwinsOrTriplets?.deliveryType ===
                    babyDeliveryType.TWINS) && (
                  <div className="flex flex-row justify-between px-15 py-5 border-t-[1px] border-b-secondary">
                    <span className=" max-w[428px]">{t("quick-setup-04")}</span>
                    <div className="flex flex-row gap-3 max-w-xs h-10">
                      <BasicButton
                        onClick={() => {
                          setAnswers({
                            ...answers,
                            nestedQuestionTwinsOrTriplets: {
                              ...answers.nestedQuestionTwinsOrTriplets,
                              bankCordBlood: true
                            }
                          });
                        }}
                        text={"Yes"}
                        style={{
                          backgroundColor: answers.nestedQuestionTwinsOrTriplets
                            ?.bankCordBlood
                            ? "#C8934F"
                            : "#EFE8D8",
                          color: "#000000"
                        }}
                      />
                      <BasicButton
                        onClick={() => {
                          setAnswers({
                            ...answers,
                            nestedQuestionTwinsOrTriplets: {
                              ...answers.nestedQuestionTwinsOrTriplets,
                              bankCordBlood: false
                            }
                          });
                        }}
                        text={"No"}
                        style={{
                          backgroundColor: !answers
                            .nestedQuestionTwinsOrTriplets?.bankCordBlood
                            ? "#C8934F"
                            : "#EFE8D8",
                          color: "#000000"
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="py-5  px-15 border-t-[1px] border-b-secondary">
            {(answers.isExpectingTwinsOrTriplets !== undefined ||
              answers.nestedQuestionTwinsOrTriplets?.bankCordBlood) && (
              <div className="flex flex-col gap-5">
                <div className="flex flex-row justify-between items-center">
                  <span>{t("quick-setup-05")}</span>
                  <div className="w-[320px]">
                    <DatePicker
                      ref={datePickerRef}
                      selected={answers.expectedDeliveryDate}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      // onBlur={openDatePicker}
                      placeholderText="DD/MM/YYYY"
                      className="w-full h-10 px-3 mt-1 rounded-md outline-none"
                      wrapperClassName="full-width-datepicker-wrapper gold-gradient-input-border"
                      minDate={currentDate}
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-between items-center">
                  <span>{t("quick-setup-06")}</span>

                  <div className="w-[320px]">
                    {/* <DropDownList
                      options={hospitalOptions}
                      name="hospital"
                      value={answers.expectedDeliveryLocation}
                      // onSelect={() => {}}
                      onChange={(e) => {
                        setAnswers({
                          ...answers,
                          expectedDeliveryLocation: e.value
                        });
                      }}
                      placeholder=""
                    /> */}

                    <InputField
                      placeholder={""}
                      value={answers.expectedDeliveryLocation}
                      onInputChange={(e) => {
                        setAnswers({
                          ...answers,
                          expectedDeliveryLocation: e.target.value
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 flex items-start justify-between">
        <div
          onClick={() => {
            setStep(6);
          }}
          className="flex flex-row-reverse justify-end gap-2 items-center space-x-1 px-3 cursor-pointer"
        >
          <span className="font-normal text-sm text-primary">{t("back")}</span>
          <IconButton
            placeholder={""}
            size="sm"
            className={`bg-transparent shadow-none hover:shadow-none ${
              isArabic ? "rotate-180 mx-2" : "mx-2"
            }`}
          >
            <QuestionButtonIcon isFlipped={false} />
          </IconButton>
        </div>
        {loading ? (
          <span className="font-normal text-sm text-primary">Uploading...</span>
        ) : (
          <>
            {((!answers.isExpectingTwinsOrTriplets &&
              answers.expectedDeliveryLocation !== "") ||
              (answers.isExpectingTwinsOrTriplets &&
                answers.nestedQuestionTwinsOrTriplets?.deliveryType !==
                  babyDeliveryType.NONE &&
                answers.expectedDeliveryLocation !== "")) && (
              <div
                onClick={handleClick}
                className="flex flex-row justify-end gap-2 items-center space-x-1 px-3 cursor-pointer"
              >
                <span className="font-normal text-sm text-primary">
                  {t("next")}
                </span>
                <IconButton
                  placeholder={""}
                  size="sm"
                  className={`bg-transparent shadow-none hover:shadow-none ${
                    isArabic ? "rotate-180 mx-2" : "mx-2"
                  }`}
                >
                  <QuestionButtonIcon isFlipped={true} />
                </IconButton>
              </div>
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ExpectedDelivery;
