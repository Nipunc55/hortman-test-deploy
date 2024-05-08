/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import ChildQuestion from "./ChildQuestion";
import { Checkbox, Typography } from "@material-tailwind/react";
import { t } from "i18next";
import i18n from "../../../../i18n";
import {
  InputType,
  type QuestionType
} from "../../../../redux/types/Questions";
import { updateQuestions } from "../../../../redux/slices/Questions";
import QuestionButton from "../../../atoms/donor/buttons/QuestionButton";
import QuestionInputText from "../../../atoms/donor/inputs/QuestionInputText";
import {
  CheckBoxType,
  type CheckboxTypeOneOptions,
  type MultipleCheckboxAnswerType
} from "../../../../redux/types/QuestionsTwo";
import ChildQuestion from "../../donor/questionnaire/ChildQuestion";
import { getSubmissionByApplicationIdAndQuestionId } from "../../../../api/submission";
import { QUESTIONNAIRE_ONE } from "../../../../utils/constants/common";
import { RootState } from "../../../../redux/store";
import ChildQuestionAdmin from "./ChildQuestion";

const QuestionItemModalBody = ({
  // totalQuestionCount,
  // setSelectedQuestionIndex,
  questionIndex,
  question
  // setIsNextButtonVisible
}: {
  // totalQuestionCount: number;
  questionIndex?: number;
  setSelectedQuestionIndex?: (value: number) => void;
  // setIsNextButtonVisible?: (value: boolean) => void;
  question: any;
}) => {
  // const questions: QuestionType[] = useSelector(
  //   (state: RootState) => state.questionsReducer.questions
  // );
  // const [question, setQuestion] = useState({});
  const dispatch = useDispatch();
  const [locale, setLocale] = useState(i18n.language);
  const [answers, setAnswers] = useState(question?.answer || [""]);
  const isArabic = locale === "ar";
  useEffect(() => {
    // setQuestion(questions[questionIndex]);
    console.log("question", question);
    const updateLocale = () => {
      setLocale(i18n.language);
    };

    i18n.on("languageChanged", updateLocale);
    getQuestionSubmission();
    return () => {
      i18n.off("languageChanged", updateLocale);
    };
  }, []);

  // const handleCheckbox = (isChecked: boolean, option: string) => {
  //   let questionAnswers: string[] = [];

  //   if (Array.isArray(question.answer)) {
  //     questionAnswers = [...question.answer];
  //   } else if (question.answer !== null && question.answer !== "") {
  //     questionAnswers = [question.answer];
  //   }

  //   if (isChecked) {
  //     if (!questionAnswers.includes(option)) {
  //       questionAnswers = [...questionAnswers, option];
  //     }

  //     if (option.toString().toLowerCase() === "none of the above") {
  //       questionAnswers = [option];
  //     }
  //   } else {
  //     questionAnswers = [
  //       ...questionAnswers.filter((questionAnswer) => questionAnswer !== option)
  //     ];
  //   }

  //   const updatedQuestion: QuestionType = {
  //     ...question,
  //     answer: questionAnswers
  //   };
  //   setAnswers(questionAnswers);
  //   // if(answers.includes('None of the above')){
  //   //   setAnswers(['None of the above'])
  //   // }
  //   dispatch(updateQuestions(updatedQuestion));
  // };

  // const handleTextInputChange = (e: any, title: string, type: CheckBoxType) => {
  //   let questionAnswers: any = [];
  //   if (Array.isArray(question.answer)) {
  //     questionAnswers = [...question.answer];
  //   } else if (question.answer !== null && question.answer !== "") {
  //     questionAnswers = [question.answer];
  //   }

  //   let questionAnswerObject: MultipleCheckboxAnswerType = questionAnswers.find(
  //     (questionAnswer: MultipleCheckboxAnswerType) =>
  //       questionAnswer.title === title
  //   );

  //   const questionAnswerObjectIndex: number =
  //     questionAnswers.findIndex(
  //       (questionAnswer: MultipleCheckboxAnswerType) =>
  //         questionAnswer.title === title
  //     ) === -1
  //       ? questionAnswers.length
  //       : questionAnswers.findIndex(
  //           (questionAnswer: MultipleCheckboxAnswerType) =>
  //             questionAnswer.title === title
  //         );

  //   if (questionAnswerObject) {
  //     questionAnswerObject = {
  //       ...questionAnswerObject,
  //       options: [e.target.value]
  //     };
  //   } else if (!questionAnswerObject) {
  //     questionAnswerObject = {
  //       title,
  //       type,
  //       options: [e.target.value]
  //     };
  //   }

  //   questionAnswers[questionAnswerObjectIndex] = questionAnswerObject;

  //   const updatedQuestion: QuestionType = {
  //     ...question,
  //     answer: questionAnswers
  //   };
  //   dispatch(updateQuestions(updatedQuestion));
  // };

  // const handleMultipleCheckbox = (
  //   isChecked: boolean,
  //   option: string,
  //   title: string,
  //   type: CheckBoxType
  // ) => {
  //   let questionAnswers: any = [];
  //   if (Array.isArray(question.answer)) {
  //     questionAnswers = [...question.answer];
  //   } else if (question.answer !== null && question.answer !== "") {
  //     questionAnswers = [question.answer];
  //   }

  //   let questionAnswerObject: MultipleCheckboxAnswerType = questionAnswers.find(
  //     (questionAnswer: MultipleCheckboxAnswerType) =>
  //       questionAnswer.title === title
  //   );

  //   const questionAnswerObjectIndex: number =
  //     questionAnswers.findIndex(
  //       (questionAnswer: MultipleCheckboxAnswerType) =>
  //         questionAnswer.title === title
  //     ) === -1
  //       ? questionAnswers.length
  //       : questionAnswers.findIndex(
  //           (questionAnswer: MultipleCheckboxAnswerType) =>
  //             questionAnswer.title === title
  //         );

  //   if (isChecked) {
  //     if (
  //       questionAnswerObject &&
  //       !questionAnswerObject.options.includes(option)
  //     ) {
  //       questionAnswerObject = {
  //         ...questionAnswerObject,
  //         options: [...questionAnswerObject.options, option]
  //       };
  //     } else if (!questionAnswerObject) {
  //       questionAnswerObject = {
  //         title,
  //         type,
  //         options: [option]
  //       };
  //     }

  //     questionAnswers[questionAnswerObjectIndex] = questionAnswerObject;
  //   } else {
  //     if (
  //       questionAnswerObject?.options.filter(
  //         (questionAnswerObjectFilter: string) =>
  //           questionAnswerObjectFilter !== option
  //       ).length === 0
  //     ) {
  //       questionAnswers = questionAnswers.filter((q: any) => q.title !== title);
  //     } else {
  //       questionAnswerObject = {
  //         ...questionAnswerObject,
  //         options: [
  //           ...questionAnswerObject?.options.filter(
  //             (questionAnswerObjectFilter: string) =>
  //               questionAnswerObjectFilter !== option
  //           )
  //         ]
  //       };
  //       questionAnswers[questionAnswerObjectIndex] = questionAnswerObject;
  //     }
  //   }

  //   const updatedQuestion: QuestionType = {
  //     ...question,
  //     answer: questionAnswers
  //   };
  //   dispatch(updateQuestions(updatedQuestion));
  // };

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
    // console.log(inputValue);

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
  const getQuestionSubmission = async () => {
    const { apiSuccess } = await getSubmissionByApplicationIdAndQuestionId(
      "6634b82388e8b81fd7e94d13",
      questionIndex + 1,
      QUESTIONNAIRE_ONE
    );

    // setAnswers(apiSuccess?.data?.data[0]?.answers);
  };
  return (
    <div className="flex flex-col space-y-4">
      <div
        className={`${
          question.inputType === InputType.YESANDNO
            ? "flex justify-between space-x-5"
            : "flex flex-col justify-between items-start space-y-5"
        }`}
      >
        <div className="flex space-x-2 pl-3">
          <div
            className={`text-2xl text-black-500 font-normal flex  gap-px ${
              isArabic ? "ml-1 flex-row-reverse" : "flex-row"
            }`}
          >
            <span>{question.id}</span>
            <span>.</span>
          </div>
          {isArabic ? (
            <div className="flex flex-col">
              <span className="text-2xl text-black-500 font-normal">
                {question.translatedQuestion}
              </span>
              {question?.translatedSubQuestion && (
                <span className="text-2xl text-black-500 font-medium">
                  {question.translatedSubQuestion}
                </span>
              )}
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="text-2xl text-black-500 font-normal">
                {question.question}
              </span>
              {question?.subQuestion && (
                <span className="text-2xl text-black-500 font-medium">
                  {question.subQuestion}
                </span>
              )}
            </div>
          )}
        </div>
        {question.inputType === InputType.YESANDNO && (
          <div className="flex space-x-2 pr-5 gap-2">
            <QuestionButton
              text={`${t("yes")}`}
              // onClick={() => {
              //   const questionUpdated: QuestionType = {
              //     ...question,
              //     isYesSelected: true,
              //     answer: "YES"
              //   };
              //   dispatch(updateQuestions(questionUpdated));
              // }}
              selected={question.answer === "YES"}
            />
            <QuestionButton
              selected={question.answer === "NO"}
              text={`${t("no")}`}
              // onClick={() => {
              //   const questionUpdated: QuestionType = {
              //     ...question,
              //     isYesSelected: false,
              //     answer: "NO"
              //   };

              //   dispatch(updateQuestions(questionUpdated));
              // }}
            />
          </div>
        )}
        {question.inputType === InputType.CHECKBOX && (
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
                        // defaultChecked={true}
                        // checked={answers.includes(option.optionTitle)}
                        key={`${question.id}-${index}`}
                        value={
                          answers.includes(option.optionTitle)
                            ? "checked"
                            : "unchecked"
                        }
                        disabled
                        // value={answers.includes(option.optionTitle)}
                        className={`h-[22px] w-6 rounded-md checked:bg-white border-[3px] border-primary checked:border-primary`}
                        color="gray"
                        // onChange={(e) => {
                        //   handleCheckbox(e.target.checked, option.optionTitle);
                        // }}
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
                      {isArabic ? (
                        <Typography
                          color="black"
                          className="text-sm font-medium text-black-500"
                          placeholder={""}
                        >
                          {option.translatedOptionTitle}
                        </Typography>
                      ) : (
                        <Typography
                          color="black"
                          className="text-sm font-medium text-black-500"
                          placeholder={""}
                        >
                          {option.optionTitle}
                        </Typography>
                      )}
                      {option.optionDescription && (
                        <Typography
                          placeholder={""}
                          color="blue-gray"
                          className="text-sm font-normal text-black-500"
                        >
                          {isArabic
                            ? `${option.translatedOptionDescription}`
                            : `${option.optionDescription}`}
                        </Typography>
                      )}
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
              {question.options?.map((option: any, index) => (
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
                          {`${
                            isArabic ? option.translatedTitle : option.title
                          }`}
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
                                  disabled
                                  defaultChecked={isCheckboxSelected(
                                    option.title,
                                    innerOption.label
                                  )}
                                  key={`${question.id}-${index}`}
                                  className={`h-[22px] w-6 rounded-md checked:bg-white border-[3px] border-primary checked:border-primary`}
                                  color="gray"
                                  // onChange={(e) => {
                                  //   handleMultipleCheckbox(
                                  //     e.target.checked,
                                  //     innerOption.label,
                                  //     option.title,
                                  //     option.type.toString()
                                  //   );
                                  // }}
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
                              <div className="flex space-x-1">
                                <Typography
                                  placeholder={""}
                                  color="black"
                                  className="text-base font-normal text-black-500"
                                >
                                  {`${
                                    isArabic
                                      ? innerOption.translatedLabel
                                      : innerOption.label
                                  }`}
                                </Typography>
                                <span className="text-sm font-normal text-black-500">
                                  {innerOption.labelDescription}
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
                      {isArabic ? (
                        <div className="text-black text-2xl font-normal mt-5 mb-2.5">
                          {option.translatedOptionTitle}
                        </div>
                      ) : (
                        <div className="text-black text-2xl font-normal mt-5 mb-2.5">
                          {option.optionTitle}
                        </div>
                      )}
                      <div className="flex items-center space-x-2.5">
                        <div className={`flex justify-center items-start`}>
                          <Checkbox
                            disabled
                            defaultChecked={question.answer.includes(
                              option.label
                            )}
                            key={`${question.id}-${index}`}
                            className={`h-[22px] w-6 rounded-md checked:bg-white border-[3px] border-primary checked:border-primary`}
                            color="gray"
                            // onChange={(e) => {
                            //   handleMultipleCheckbox(
                            //     e.target.checked,
                            //     option.label,
                            //     option.title,
                            //     option.type
                            //   );
                            // }}
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
                        <div className="flex space-x-1">
                          {isArabic ? (
                            <Typography
                              color="black"
                              className="text-base font-normal text-black-500"
                              placeholder={""}
                            >
                              {option.translatedLabel}{" "}
                            </Typography>
                          ) : (
                            <Typography
                              color="black"
                              className="text-base font-normal text-black-500"
                              placeholder={""}
                            >
                              {option.label}{" "}
                            </Typography>
                          )}
                          <span className="text-sm font-normal text-black-500">
                            {option.labelDescription}
                          </span>
                        </div>
                      </div>
                      <div className="w-[275px] ml-16">
                        <QuestionInputText
                          placeholder=""
                          label=""
                          // onInputChange={(e: any) => {
                          //   handleTextInputChange(
                          //     e,
                          //     option.optionTitle,
                          //     option.type
                          //   );
                          // }}
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
                          disabled
                          defaultChecked={isCheckboxSelected(
                            option.title,
                            option.label
                          )}
                          key={`${question.id}-${index}`}
                          className={`h-[22px] w-6 rounded-md checked:bg-white border-[3px] border-primary checked:border-primary`}
                          color="gray"
                          // onChange={(e) => {
                          //   handleMultipleCheckbox(
                          //     e.target.checked,
                          //     option.label,
                          //     option.title,
                          //     option.type
                          //   );
                          // }}
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
                      <div className="flex space-x-1">
                        {isArabic ? (
                          <Typography
                            color="black"
                            className="text-base font-normal text-black-500"
                            placeholder={""}
                          >
                            {option.translatedLabel}{" "}
                          </Typography>
                        ) : (
                          <Typography
                            color="black"
                            className="text-base font-normal text-black-500"
                            placeholder={""}
                          >
                            {option.label}{" "}
                          </Typography>
                        )}
                        <span className="text-sm font-normal text-black-500">
                          {option.labelDescription}
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
          <div className="flex flex-col space-y-5 mx-5">
            {question.yesQuestions.map((yesQuestion) => (
              <ChildQuestionAdmin
                key={yesQuestion.id}
                question={yesQuestion}
                parentQuestion={question}
                isYesQuestions={true}
              />
            ))}
          </div>
        )}
      </div>
      <>
        {question.externalLink && (
          <>
            {isArabic ? (
              <div className="flex flex-col">
                <span className="text-2xl text-black-500 font-normal">
                  {question.translatedExternalLinkDescription}
                </span>
                {question?.externalLink && (
                  <a
                    href={question.externalLink}
                    className="text-2xl text-black-500 font-normal underline"
                  >
                    {question.externalLink}
                  </a>
                )}
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="text-2xl text-black-500 font-normal">
                  {question.externalLinkDescription}
                </span>
                {question?.externalLink && (
                  <a
                    href={question.externalLink}
                    target="_blank"
                    className="text-2xl text-black-500 font-normal underline"
                    rel="noreferrer"
                  >
                    {question.externalLink}
                  </a>
                )}
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default QuestionItemModalBody;
