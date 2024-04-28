import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox, Typography } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { t } from "i18next";
import { type QuestionType } from "../../../../redux/types/Questions";
import i18n from "../../../../i18n";
import { updateQuestions } from "../../../../redux/slices/Questions";
import Forward from "../../../../assets/svg/forward";

const MaternalRiskCustomQ4 = ({ question }: { question: QuestionType }) => {
  const dispatch = useDispatch();
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

  const handleCheckbox = (isChecked: boolean, option: string) => {
    let questionAnswers: string[] = [""];
    if (Array.isArray(question.answer)) {
      questionAnswers = [...question.answer];
    } else if (question.answer !== null) {
      questionAnswers = [question.answer];
    }

    if (isChecked) {
      if (!questionAnswers.includes(option)) {
        questionAnswers = [...questionAnswers, option];
      }
    } else {
      questionAnswers = [
        ...questionAnswers.filter((questionAnswer) => questionAnswer !== option)
      ];
      // questionAnswers = [""];
      // console.log("not null", questionAnswers);
    }

    const updatedQuestion: QuestionType = {
      ...question,
      answer: questionAnswers
    };
    console.log(updatedQuestion);

    dispatch(updateQuestions(updatedQuestion));
  };
  return (
    <div>
      <div className="flex space-x-2 pl-3">
        <span className="text-2xl text-black-500 font-normal">
          {question.id}.
        </span>
        <span className="text-2xl text-black-500 font-normal flex flex-row gap-5">
          {`${isArabic ? question.translatedQuestion : question.question}`}
          <Link
            to={"/quick-setup/edu-material"}
            className="flex flex-row items-center cursor-pointer"
          >
            <span className=" text-xs text-primary">{t("click&read")}</span>{" "}
            <Forward />{" "}
          </Link>
        </span>
      </div>
      <div className="mb-10 -ml-1">
        <div
          className={`${
            question.checkboxColumns === 1
              ? "flex flex-col w-full"
              : "grid grid-cols-3"
          }`}
        >
          {question.options?.map((option, index) => (
            <div
              key={index}
              className={`${
                question.checkboxColumns === 2 &&
                index % 2 !== 0 &&
                "col-span-2"
              } ${option.optionDescription && "mb-2.5"}`}
            >
              <div className="flex items-center space-x-2.5">
                <div
                  className={`flex justify-center items-start ${
                    option.optionDescription && "-mt-6"
                  }`}
                >
                  <Checkbox
                    defaultChecked={question.answer.includes(
                      option.optionTitle
                    )}
                    className={`h-[22px] w-6 rounded-md checked:bg-white border-[3px] border-primary checked:border-primary`}
                    color="gray"
                    onChange={(e) => {
                      handleCheckbox(e.target.checked, option.optionTitle);
                    }}
                    icon={
                      <svg
                        width="9"
                        height="8"
                        viewBox="0 0 9 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.47217 4L3.35485 6L7.12021 2"
                          stroke="#C8934F"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    crossOrigin={undefined}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <Typography
                    color="black"
                    className="text-sm font-medium text-black-500"
                    placeholder={""}
                  >
                    {`${
                      isArabic
                        ? option.translatedOptionTitle
                        : option.optionTitle
                    }`}
                  </Typography>
                  {option.optionDescription && (
                    <Typography
                      color="blue-gray"
                      className="text-sm font-normal text-black-500"
                      placeholder={""}
                    >
                      {option.optionDescription}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaternalRiskCustomQ4;
