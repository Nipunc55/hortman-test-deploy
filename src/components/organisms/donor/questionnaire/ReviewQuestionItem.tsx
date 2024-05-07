import { useEffect, useState } from "react";
import { t } from "i18next";
import i18n from "../../../../i18n";
import { InputType } from "../../../../redux/types/Questions";
import EditIcon from "../../../../assets/svg/editIcon";
import QuestionView from "../../../molecules/admin/modals/QuestionView";
import EyeIcon from "../../../../assets/svg/eyeIcon";

const ReviewQuestionItem = ({
  setSelectedQuestionIndex,
  question,
  setError,
  type
}: {
  setSelectedQuestionIndex?: (value: number) => void;
  question: any;
  setError: (value: boolean) => void;
  type: string;
}) => {
  const [locale, setLocale] = useState(i18n.language);
  const [modalOpen, setModalOpen] = useState(false);
  const isArabic = locale === "ar";
  useEffect(() => {
    // console.log(question);
    const updateLocale = () => {
      setLocale(i18n.language);
    };

    i18n.on("languageChanged", updateLocale);

    return () => {
      i18n.off("languageChanged", updateLocale);
    };
  }, []);

  const getQuestionAnswerValue = () => {
    if (question.inputType === InputType.YESANDNO) {
      if (question.answer === "YES") {
        return true;
      } else if (question.answer === "NO") {
        return false;
      }
    }

    if (question.inputType === InputType.CHECKBOX) {
      if (question.answer.includes("None of the above")) {
        return false;
      } else if (question?.answer?.length > 0) {
        return true;
      }
    }

    if (question.inputType === InputType.MULTIPLE_CHECKBOX) {
      /* if (
        typeof question.answer === "string" &&
        question.answer.toLowerCase().includes("none of the above")
      ) {
        return false;
      } else if (question.answer.length > 0) {
        return true;
      } */
    }
  };

  useEffect(() => {
    if (question?.answer?.length === 0) {
      setError(true);
    }
  }, []);

  return (
    <>
      <div
        className={`flex items-center justify-between border-[#D9D9D9] border-b-2 py-2 ${
          isArabic ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div className="gap-1 flex flex-row pr-5">
          <span
            className={`${
              question?.answer?.length === 0 && "text-[#DF3333]"
            } text-xs`}
          >
            {question.id}.
          </span>
          {isArabic ? (
            <span
              className={`${
                question?.answer?.length === 0 && "text-[#DF3333]"
              } text-xs`}
            >
              {question?.translatedQuestion ?? ""}
            </span>
          ) : (
            <span
              className={`${
                question?.answer?.length === 0 && "text-[#DF3333]"
              } text-xs`}
            >
              {question?.question ?? ""}
            </span>
          )}
        </div>
        <div
          className={`flex  text-xxsm gap-1 items-center ${
            isArabic ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <div
            className={`${
              getQuestionAnswerValue()
                ? "bg-primary text-white"
                : "bg-secondary"
            }  w-12.5 py-1.25 flex items-center justify-center cursor-pointer`}
          >
            <span>{t("yes")}</span>
          </div>
          <div
            className={` ${
              getQuestionAnswerValue() !== false
                ? "bg-secondary text-black"
                : "bg-primary text-white"
            } w-12.5 py-1.25 flex items-center justify-center mr-1 cursor-pointer`}
          >
            <span>{t("no")}</span>
          </div>
          <button
            onClick={() => {
              if (setSelectedQuestionIndex) {
                setSelectedQuestionIndex(question.id - 1);
              }
              setModalOpen(true);
            }}
          >
            <EyeIcon />
            {/* <EditIcon /> */}
          </button>
          <QuestionView
            open={modalOpen}
            handleOpen={setModalOpen}
            question={question}
          />
        </div>
      </div>
    </>
  );
};

export default ReviewQuestionItem;
