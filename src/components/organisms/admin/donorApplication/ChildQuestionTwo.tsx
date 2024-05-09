/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { useEffect, useRef, useState } from "react";
import {
  CheckBoxType,
  type CheckboxTypeOneOptions,
  type MultipleCheckboxAnswerType,
  type QuestionTwoType
} from "../../../../redux/types/QuestionsTwo";
import { updateQuestionsTwo } from "../../../../redux/slices/QuestionsTwo";
import { InputType } from "../../../../redux/types/Questions";
import QuestionInputText from "../../../atoms/donor/inputs/QuestionInputText";
import { Checkbox, Typography } from "@material-tailwind/react";
import QuestionButton from "../../../atoms/donor/buttons/QuestionButton";
import DateIcon from "../../../../assets/svg/DateIcon";
import i18n from "../../../../i18n";
import { t } from "i18next";

const ChildQuestionTwo = ({
  question,
  parentQuestion,
  isYesQuestions,
  isInnerChild,
  innerChildParent
}: {
  question: QuestionTwoType;
  parentQuestion: QuestionTwoType;
  isYesQuestions: boolean;
  isInnerChild?: boolean;
  innerChildParent?: QuestionTwoType;
}) => {
  const dispatch = useDispatch();
  const datePickerRef = useRef<any>(null);
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

  const handleTextInputChange = (e: any) => {
    if (isInnerChild) {
      innerChildTextHandle(e.target.value);
    } else {
      childTextHandle(e.target.value);
    }
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
      ...parentQuestion,
      yesQuestions: [{ ...question, answer: [...questionAnswers] }]
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

  const handleMultipleTextInputChange = (
    e: any,
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
      ...parentQuestion,
      yesQuestions: [
        {
          ...question,
          answer: [...questionAnswers]
        }
      ]
    };

    dispatch(updateQuestionsTwo(updatedQuestion));
  };

  const childTextHandle = (value: any) => {
    if (isYesQuestions && parentQuestion.yesQuestions) {
      const yesQuestions: QuestionTwoType[] = parentQuestion.yesQuestions?.map(
        (yesQuestion) => {
          if (question.id === yesQuestion.id) {
            return { ...yesQuestion, answer: value };
          } else {
            return yesQuestion;
          }
        }
      );
      const updatedQuestion: QuestionTwoType = {
        ...parentQuestion,
        yesQuestions
      };
      dispatch(updateQuestionsTwo(updatedQuestion));
    }

    if (!isYesQuestions && parentQuestion.noQuestions) {
      const noQuestions: QuestionTwoType[] = parentQuestion.noQuestions?.map(
        (noQuestion) => {
          if (question.id === noQuestion.id) {
            return { ...noQuestion, answer: value };
          } else {
            return noQuestion;
          }
        }
      );
      const updatedQuestion: QuestionTwoType = {
        ...parentQuestion,
        noQuestions
      };
      dispatch(updateQuestionsTwo(updatedQuestion));
    }
  };

  const innerChildTextHandle = (value: any) => {
    let mainQuestion: any = innerChildParent;

    let innerQuestionParent: any = parentQuestion;

    const innerQuestion: QuestionTwoType = {
      ...question,
      answer: value
    };

    const innerQuestionParentYesQuestions: any = [
      ...innerQuestionParent?.yesQuestions?.filter(
        (item: any) => item.id !== question.id
      ),
      innerQuestion
    ];

    innerQuestionParent = {
      ...innerQuestionParent,
      yesQuestions: [...innerQuestionParentYesQuestions]
    };

    const mainYesQuestions: any = [
      ...mainQuestion?.yesQuestions?.filter(
        (item: any) => item.id !== parentQuestion.id
      ),
      innerQuestionParent
    ];

    mainQuestion = {
      ...mainQuestion,
      yesQuestions: [...mainYesQuestions]
    };

    dispatch(updateQuestionsTwo(mainQuestion));
  };

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

  const handleDateChange = (date: any) => {
    if (isYesQuestions && parentQuestion.yesQuestions) {
      const yesQuestions: QuestionTwoType[] = parentQuestion.yesQuestions?.map(
        (yesQuestion) => {
          if (question.id === yesQuestion.id) {
            return { ...yesQuestion, answer: date.toString() };
          } else {
            return yesQuestion;
          }
        }
      );
      const updatedQuestion: QuestionTwoType = {
        ...parentQuestion,
        yesQuestions
      };
      dispatch(updateQuestionsTwo(updatedQuestion));
    }

    if (!isYesQuestions && parentQuestion.noQuestions) {
      const noQuestions: QuestionTwoType[] = parentQuestion.noQuestions?.map(
        (noQuestion) => {
          if (question.id === noQuestion.id) {
            return { ...noQuestion, answer: date.toString() };
          } else {
            return noQuestion;
          }
        }
      );
      const updatedQuestion: QuestionTwoType = {
        ...parentQuestion,
        noQuestions
      };
      dispatch(updateQuestionsTwo(updatedQuestion));
    }

    closeDatePicker();
  };

  const handleCheckbox = (isChecked: boolean, option: string) => {
    let questionAnswers: any = [];
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
        ...questionAnswers.filter(
          (questionAnswer: any) => questionAnswer !== option
        )
      ];
    }

    if (isYesQuestions && parentQuestion.yesQuestions) {
      const yesQuestions: QuestionTwoType[] = parentQuestion.yesQuestions?.map(
        (yesQuestion) => {
          if (question.id === yesQuestion.id) {
            return { ...yesQuestion, answer: questionAnswers };
          } else {
            return yesQuestion;
          }
        }
      );
      const updatedQuestion: QuestionTwoType = {
        ...parentQuestion,
        yesQuestions
      };
      dispatch(updateQuestionsTwo(updatedQuestion));
    }

    if (!isYesQuestions && parentQuestion.noQuestions) {
      const noQuestions: QuestionTwoType[] = parentQuestion.noQuestions?.map(
        (noQuestion) => {
          if (question.id === noQuestion.id) {
            return { ...noQuestion, answer: questionAnswers };
          } else {
            return noQuestion;
          }
        }
      );
      const updatedQuestion: QuestionTwoType = {
        ...parentQuestion,
        noQuestions
      };
      dispatch(updateQuestionsTwo(updatedQuestion));
    }
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

  return (
    <div>
      <div>
        {question.inputType === InputType.TEXT && (
          <div className="flex gap-2 justify-between w-full">
            {isArabic ? (
              <div className="text-2xl text-black-500 font-normal">
                {question.translatedQuestionTwo}
              </div>
            ) : (
              <div className="text-2xl text-black-500 font-normal">
                {question.question}
              </div>
            )}
            <div className="w-[275px] mr-5">
              <QuestionInputText
                placeholder=""
                label={""}
                // onInputChange={handleTextInputChange}
                onInputChange={() => {}}
                value={question.answer.toString()}
                styles={{ width: "100%", height: "40px" }}
                key={"key"}
              />
            </div>
          </div>
        )}
      </div>
      <div>
        {question.inputType === InputType.CHECKBOX && (
          <div className="mb-10">
            <div className="text-2xl text-black-500 font-normal mb-5">
              {question.question}
            </div>
            <div
              className={`${
                question.checkboxColumns === 1
                  ? "flex flex-col w-full"
                  : "grid grid-cols-3"
              }`}
            >
              {question.options?.map((option: any, index) => (
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
                    <div className="flex flex-col space-y-1">
                      <Typography
                        color="black"
                        className="text-sm font-medium text-black-500"
                        placeholder=""
                      >
                        {option.optionTitle}
                      </Typography>
                      {option.optionDescription && (
                        <Typography
                          color="blue-gray"
                          className="text-sm font-normal text-black-500"
                          placeholder=""
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
        )}
      </div>
      <div>
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
                            handleMultipleTextInputChange(
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
        {question.inputType === InputType.DATE && (
          <div>
            <div className="flex justify-between w-full">
              <div className="text-2xl text-black-500 font-normal">
                {question.question}
              </div>
              <div className="w-[275px] relative">
                <DatePicker
                  ref={datePickerRef}
                  selected={
                    new Date(question.answer.toString()).toString() ===
                    "Invalid Date"
                      ? null
                      : new Date(question.answer.toString()) || null
                  }
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  // onBlur={openDatePicker}
                  placeholderText="DD/MM/YYYY"
                  className="w-full h-10 px-3 mt-1 rounded-md outline-none"
                  wrapperClassName="full-width-datepicker-wrapper gold-gradient-input-border"
                />
                <div
                  onClick={openDatePicker}
                  // onBlur={openDatePicker}
                  className="absolute top-2 right-2.5 cursor-pointer"
                >
                  <DateIcon />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {question.inputType === InputType.YESANDNO && (
        <div>
          <div className="flex justify-between gap-2">
            {isArabic ? (
              <div className="text-2xl text-black-500 font-normal mb-5 pr-10">
                {question.translatedQuestionTwo}
              </div>
            ) : (
              <div className="text-2xl text-black-500 font-normal mb-5">
                {" "}
                {question.question}
              </div>
            )}
            <div className="flex space-x-2 pr-5 gap-2">
              <QuestionButton
                text={`${t("yes")}`}
                onClick={() => {
                  let updatedYesQuestion = null;
                  if (parentQuestion.yesQuestions !== null) {
                    updatedYesQuestion = [
                      ...parentQuestion.yesQuestions.filter(
                        (ques) => ques.question !== question.question
                      )
                    ];
                  }

                  const yesQuestion = {
                    ...question,
                    isYesSelected: true,
                    answer: "YES"
                  };

                  if (Array.isArray(updatedYesQuestion)) {
                    updatedYesQuestion = [...updatedYesQuestion, yesQuestion];

                    const updatedQuestion = {
                      ...parentQuestion,
                      isYesSelected: true,
                      yesQuestions: [...updatedYesQuestion]
                    };

                    dispatch(updateQuestionsTwo(updatedQuestion));
                  }
                }}
                selected={question.answer === "YES"}
              />
              <QuestionButton
                text={`${t("no")}`}
                onClick={() => {
                  let updatedYesQuestion = null;
                  if (parentQuestion.yesQuestions !== null) {
                    updatedYesQuestion = [
                      ...parentQuestion.yesQuestions.filter(
                        (ques) => ques.question !== question.question
                      )
                    ];
                  }

                  const yesQuestion = {
                    ...question,
                    isYesSelected: false,
                    answer: "NO"
                  };

                  if (Array.isArray(updatedYesQuestion)) {
                    updatedYesQuestion = [...updatedYesQuestion, yesQuestion];

                    const updatedQuestion = {
                      ...parentQuestion,
                      isYesSelected: true,
                      yesQuestions: [...updatedYesQuestion]
                    };

                    dispatch(updateQuestionsTwo(updatedQuestion));
                  }
                }}
                selected={question.answer === "NO"}
              />
            </div>
          </div>
          {question.isYesSelected && question.yesQuestions !== null && (
            <div className="flex flex-col space-y-5">
              {question.yesQuestions.map((yesQuestion) => (
                <ChildQuestionTwo
                  key={yesQuestion.id}
                  question={yesQuestion}
                  parentQuestion={question}
                  innerChildParent={parentQuestion}
                  isYesQuestions={true}
                  isInnerChild={yesQuestion?.yesQuestions?.length !== null}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChildQuestionTwo;
