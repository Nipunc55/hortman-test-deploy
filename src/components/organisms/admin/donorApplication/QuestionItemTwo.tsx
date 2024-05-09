/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useDispatch } from "react-redux";
import { InputType } from "../../../../redux/types/Questions";
import QuestionButton from "../../../atoms/donor/buttons/QuestionButton";
import { useEffect, useState } from "react";
import ChildQuestion from "./ChildQuestion";
import { Checkbox, Typography } from "@material-tailwind/react";
import { t } from "i18next";
import {
  CheckBoxType,
  type MultipleCheckboxAnswerType,
  type CheckboxTypeOneOptions,
  type QuestionTwoType
} from "../../../../redux/types/QuestionsTwo";
import i18n from "../../../../i18n";
import { updateQuestionsTwo } from "../../../../redux/slices/QuestionsTwo";
import QuestionInputText from "../../../atoms/donor/inputs/QuestionInputText";
import ChildQuestionAdmin from "./ChildQuestion";
import ChildQuestionTwo from "./ChildQuestionTwo";

const QuestionItemTwo = ({ question }: { question: any }) => {
  const dispatch = useDispatch();
  const [locale, setLocale] = useState(i18n.language);
  const isArabic = locale === "ar";
  console.log(
    "question TWO",
    question.isYesSelected && question.yesQuestions !== null
  );

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
    let questionAnswers: any = [];
    if (Array.isArray(question.answer)) {
      questionAnswers = [...question.answer];
    } else if (question.answer !== null && question.answer !== "") {
      questionAnswers = [question.answer];
    }

    if (isChecked) {
      if (!questionAnswers.includes(option)) {
        questionAnswers = [...questionAnswers, option];
      }
    } else {
      questionAnswers = [
        ...questionAnswers.filter(
          (questionAnswer: any) => questionAnswer !== option
        )
      ];
    }

    const updatedQuestion: QuestionTwoType = {
      ...question,
      answer: questionAnswers
    };
    dispatch(updateQuestionsTwo(updatedQuestion));
  };

  const getInputValue = (title: string) => {
    let questionAnswers: any = [];
    if (Array.isArray(question.answer)) {
      questionAnswers = [...question.answer];
    } else if (question.answer !== null && question.answer !== "") {
      questionAnswers = [question.answer];
    }

    const questionAnswerObject: MultipleCheckboxAnswerType =
      questionAnswers.find(
        (questionAnswer: MultipleCheckboxAnswerType) =>
          questionAnswer.title === title
      );

    let inputValue = "";

    if (questionAnswerObject && questionAnswerObject.options.length > 0) {
      inputValue = questionAnswerObject.options[0];
    }

    return inputValue;
  };

  const isCheckboxSelected = (title: string, label: string) => {
    let questionAnswers: any = [];
    if (Array.isArray(question.answer)) {
      questionAnswers = [...question.answer];
    } else if (question.answer !== null && question.answer !== "") {
      questionAnswers = [question.answer];
    }

    const questionAnswerObject: MultipleCheckboxAnswerType =
      questionAnswers.find(
        (questionAnswer: MultipleCheckboxAnswerType) =>
          questionAnswer.title === title
      );

    let isChecked = false;

    if (questionAnswerObject?.options.includes(label)) {
      isChecked = true;
    }

    return isChecked;
  };

  const handleTextInputChange = (e: any, title: string, type: CheckBoxType) => {
    let questionAnswers: any = [];
    if (Array.isArray(question.answer)) {
      questionAnswers = [...question.answer];
    } else if (question.answer !== null && question.answer !== "") {
      questionAnswers = [question.answer];
    }

    let questionAnswerObject: MultipleCheckboxAnswerType = questionAnswers.find(
      (questionAnswer: MultipleCheckboxAnswerType) =>
        questionAnswer.title === title
    );

    const questionAnswerObjectIndex: number =
      questionAnswers.findIndex(
        (questionAnswer: MultipleCheckboxAnswerType) =>
          questionAnswer.title === title
      ) === -1
        ? questionAnswers.length
        : questionAnswers.findIndex(
            (questionAnswer: MultipleCheckboxAnswerType) =>
              questionAnswer.title === title
          );

    if (questionAnswerObject) {
      questionAnswerObject = {
        ...questionAnswerObject,
        options: [e.target.value]
      };
    } else if (!questionAnswerObject) {
      questionAnswerObject = {
        title,
        type,
        options: [e.target.value]
      };
    }

    questionAnswers[questionAnswerObjectIndex] = questionAnswerObject;

    const updatedQuestion: QuestionTwoType = {
      ...question,
      answer: questionAnswers
    };
    dispatch(updateQuestionsTwo(updatedQuestion));
  };

  const handleMultipleCheckbox = (
    isChecked: boolean,
    option: string,
    title: string,
    type: CheckBoxType
  ) => {
    let questionAnswers: any = [];
    if (Array.isArray(question.answer)) {
      questionAnswers = [...question.answer];
    } else if (question.answer !== null && question.answer !== "") {
      questionAnswers = [question.answer];
    }

    let questionAnswerObject: MultipleCheckboxAnswerType = questionAnswers.find(
      (questionAnswer: MultipleCheckboxAnswerType) =>
        questionAnswer.title === title
    );

    const questionAnswerObjectIndex: number =
      questionAnswers.findIndex(
        (questionAnswer: MultipleCheckboxAnswerType) =>
          questionAnswer.title === title
      ) === -1
        ? questionAnswers.length
        : questionAnswers.findIndex(
            (questionAnswer: MultipleCheckboxAnswerType) =>
              questionAnswer.title === title
          );
    if (isChecked) {
      if (
        questionAnswerObject &&
        !questionAnswerObject.options.includes(option)
      ) {
        questionAnswerObject = {
          ...questionAnswerObject,
          options: [...questionAnswerObject.options, option]
        };
      } else if (!questionAnswerObject) {
        questionAnswerObject = {
          title,
          type,
          options: [option]
        };
      }

      questionAnswers[questionAnswerObjectIndex] = questionAnswerObject;
    } else {
      if (
        questionAnswerObject?.options.filter(
          (questionAnswerObjectFilter) => questionAnswerObjectFilter !== option
        ).length === 0
      ) {
        questionAnswers = questionAnswers.filter((q: any) => q.title !== title);
      } else {
        questionAnswerObject = {
          ...questionAnswerObject,
          options: [
            ...questionAnswerObject?.options.filter(
              (questionAnswerObjectFilter) =>
                questionAnswerObjectFilter !== option
            )
          ]
        };
        questionAnswers[questionAnswerObjectIndex] = questionAnswerObject;
      }
    }

    const updatedQuestion: QuestionTwoType = {
      ...question,
      answer: questionAnswers
    };

    dispatch(updateQuestionsTwo(updatedQuestion));
  };

  return (
    <div className="flex flex-col space-y-7">
      <div
        className={`${
          question.inputType === InputType.YESANDNO
            ? "flex justify-between space-x-5"
            : "flex flex-col justify-between items-start space-y-5"
        }`}
      >
        <div className="flex space-x-2 gap-2 pl-3">
          <div
            className={`text-2xl text-black-500 font-normal flex  gap-px ${
              isArabic ? "ml-1 flex-row-reverse" : "flex-row"
            }`}
          >
            <span>{question.id}</span>
            <span>.</span>
          </div>
          {isArabic ? (
            <span className="text-2xl text-black-500 font-normal">
              {question.translatedQuestion}
            </span>
          ) : (
            <span className="text-2xl text-black-500 font-normal">
              {question.question}
            </span>
          )}
        </div>
        {question.inputType === InputType.YESANDNO && (
          <div className="flex gap-2 mx-2 space-x-2 pr-5">
            <QuestionButton
              text={`${t("yes")}`}
              onClick={() => {
                // const questionUpdated: QuestionTwoType = {
                //   ...question,
                //   isYesSelected: true,
                //   answer: "YES"
                // };
                // dispatch(updateQuestionsTwo(questionUpdated));
              }}
              selected={question.answer === "YES"}
              // disable
            />
            <QuestionButton
              selected={question.answer === "NO"}
              text={`${t("no")}`}
              onClick={() => {
                // const questionUpdated: QuestionTwoType = {
                //   ...question,
                //   isYesSelected: false,
                //   answer: "NO"
                // };
                // dispatch(updateQuestionsTwo(questionUpdated));
              }}
            />
          </div>
        )}
        {question.inputType === InputType.CHECKBOX && (
          <div className="mb-10 -ml-1">
            <div
              className={`-space-y-2 ${
                question.checkboxColumns === 1
                  ? "flex flex-col w-full"
                  : "grid grid-cols-3"
              }`}
            >
              {question.options?.map((option: any, index: number) => (
                <div
                  key={index}
                  className={`${
                    question.checkboxColumns === 2 &&
                    index % 2 !== 0 &&
                    "col-span-2"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className={`flex justify-center items-start`}>
                      <Checkbox
                        key={`${question.id}-${index}`}
                        defaultChecked={question.answer.includes(
                          option.optionTitle
                        )}
                        className={`h-[22px] w-6 rounded-md checked:bg-white border-[3px] border-primary checked:border-primary`}
                        color="gray"
                        onChange={(e) => {
                          // handleCheckbox(e.target.checked, option.optionTitle);
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
                        disabled={true}
                        crossOrigin={undefined}
                      />
                    </div>
                    <div className="flex space-x-1">
                      <Typography
                        color="black"
                        className="text-base font-normal text-black-500"
                        placeholder=""
                      >
                        {isArabic
                          ? option.translatedOptionTitle
                          : option.optionTitle}{" "}
                      </Typography>
                      <span className="text-sm font-normal text-black-500">
                        {isArabic
                          ? option.translatedOptionDescription
                          : option.optionDescription}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {question.inputType === InputType.MULTIPLE_CHECKBOX && (
          <div className="mb-10 -ml-1">
            <div
              className={`-space-y-2 ${
                question.checkboxColumns === 1
                  ? "flex flex-col w-full"
                  : "grid grid-cols-3"
              }`}
            >
              {question.options?.map((option: any, index: number) => (
                <div
                  key={index}
                  className={`${
                    question.checkboxColumns === 2 &&
                    index % 2 !== 0 &&
                    "col-span-2"
                  }`}
                >
                  {option.type === CheckBoxType.TYPE_ONE && (
                    <>
                      {option.title && (
                        <div className="text-black text-2xl font-normal mt-5 mb-2.5">
                          {isArabic ? option.translatedTitle : option.title}
                        </div>
                      )}
                      <div className="flex flex-col -space-y-2">
                        {option.options.map(
                          (
                            innerOption: CheckboxTypeOneOptions,
                            index: number
                          ) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2.5"
                            >
                              <div
                                className={`flex justify-center items-start`}
                              >
                                <Checkbox
                                  defaultChecked={isCheckboxSelected(
                                    option.title,
                                    innerOption.label
                                  )}
                                  key={`${question.id}-${index}`}
                                  className={`h-[22px] w-6 rounded-md checked:bg-white border-[3px] border-primary checked:border-primary`}
                                  color="gray"
                                  onChange={(e) => {
                                    // handleMultipleCheckbox(
                                    //   e.target.checked,
                                    //   innerOption.label,
                                    //   option.title,
                                    //   option.type.toString()
                                    // );
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
                                  disabled={true}
                                  crossOrigin={undefined}
                                />
                              </div>
                              <div className="flex space-x-1">
                                <Typography
                                  placeholder={""}
                                  color="black"
                                  className="text-base font-normal text-black-500"
                                >
                                  {isArabic
                                    ? innerOption.translatedLabel
                                    : innerOption.label}{" "}
                                </Typography>
                                <span className="text-sm font-normal text-black-500">
                                  {isArabic
                                    ? innerOption.translatedLabelDescription
                                    : innerOption.labelDescription}
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </>
                  )}
                  {option.type === CheckBoxType.TYPE_TWO && (
                    <div>
                      <div className="text-black text-2xl font-normal mt-5 mb-2.5">
                        {isArabic ? option.translatedTitle : option.title}
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <div className={`flex justify-center items-start`}>
                          <Checkbox
                            defaultChecked={question.answer.includes(
                              option.label
                            )}
                            key={`${question.id}-${index}`}
                            className={`h-[22px] w-6 rounded-md checked:bg-white border-[3px] border-primary checked:border-primary`}
                            color="gray"
                            onChange={(e) => {
                              // handleMultipleCheckbox(
                              //   e.target.checked,
                              //   option.label,
                              //   option.title,
                              //   option.type
                              // );
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
                            disabled={true}
                            crossOrigin={undefined}
                          />
                        </div>
                        <div className="flex space-x-1">
                          <Typography
                            placeholder={""}
                            color="black"
                            className="text-base font-normal text-black-500"
                          >
                            {isArabic ? option.translatedLabel : option.label}{" "}
                          </Typography>
                          <span className="text-sm font-normal text-black-500">
                            {isArabic
                              ? option.translatedOptionTitle
                              : option.optionTitle}
                          </span>
                        </div>
                      </div>
                      <div className="w-[275px] ml-16">
                        <QuestionInputText
                          placeholder=""
                          label=""
                          onInputChange={(e: any) => {
                            handleTextInputChange(
                              e,
                              option.optionTitle,
                              option.type
                            );
                          }}
                          value={getInputValue(option.optionTitle)}
                          styles={{ width: "100%", height: "32px" }}
                          key={"key"}
                        />
                      </div>
                    </div>
                  )}
                  {option.type === CheckBoxType.TYPE_THREE && (
                    <div className="flex items-center space-x-2.5 -ml-3 mt-5">
                      <div className={`flex justify-center items-start`}>
                        <Checkbox
                          defaultChecked={isCheckboxSelected(
                            option.title,
                            option.label
                          )}
                          key={`${question.id}-${index}`}
                          className={`h-[22px] w-6 rounded-md checked:bg-white border-[3px] border-primary checked:border-primary`}
                          color="gray"
                          onChange={(e) => {
                            // handleMultipleCheckbox(
                            //   e.target.checked,
                            //   option.label,
                            //   option.title,
                            //   option.type
                            // );
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
                          disabled={true}
                          crossOrigin={undefined}
                        />
                      </div>
                      <div className="flex space-x-1">
                        <Typography
                          placeholder={""}
                          color="black"
                          className="text-base font-normal text-black-500"
                        >
                          {isArabic ? option.translatedLabel : option.label}{" "}
                        </Typography>
                        <span className="text-sm font-normal text-black-500">
                          {isArabic
                            ? option.translatedLabelDescription
                            : option.labelDescription}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        {question.isYesSelected && question.yesQuestions !== null && (
          <div className="flex flex-col space-y-5" key={question.id}>
            {question.yesQuestions.map((yesQuestion: any) => (
              <ChildQuestionTwo
                key={yesQuestion.id}
                question={yesQuestion}
                parentQuestion={question}
                isYesQuestions={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionItemTwo;
