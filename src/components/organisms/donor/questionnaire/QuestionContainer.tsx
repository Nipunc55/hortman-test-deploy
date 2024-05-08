/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, IconButton } from "@material-tailwind/react";
import QuestionItem from "./QuestionItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReviewQuestions from "./ReviewQuestions";
import { t } from "i18next";
import MaternalRiskCustomQ4 from "./MaternalRiskCustomQ4";
import i18n from "../../../../i18n";
import { type RootState } from "../../../../redux/store";
import {
  InputType,
  type QuestionType
} from "../../../../redux/types/Questions";
import QuestionButtonIcon from "../../../../assets/svg/QuestionButtonIcon";
import BasicButton from "../../../atoms/admin/buttons/BasicButton";
import {
  addSubmission,
  editSubmission,
  getSubmissionByApplicationIdAndQuestionId
  // getSubmissionByApplicationIdAndSection
} from "../../../../api/submission";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";
import { getDonorApplicationById } from "../../../../api/donor_application";
import { updateQuestions } from "../../../../redux/slices/Questions";
import {
  INPUT_TYPE_CHECKBOX,
  INPUT_TYPE_DATE,
  INPUT_TYPE_MULTIPLE_CHECKBOX,
  INPUT_TYPE_TEXT,
  INPUT_TYPE_YESANDNO,
  QUESTIONNAIRE_ONE
} from "../../../../utils/constants/common";
import { getDataFromLocalStorage } from "../../../../utils/common/accessLocalStorage";
import { ToastContainer } from "react-toastify";
// const TOTAL_QUESTION_COUNT = 45;
const QuestionContainer = () => {
  const dispatch = useDispatch();
  const questions: QuestionType[] = useSelector(
    (state: RootState) => state.questionsReducer.questions
  );
  const questionOneReviewViewed: boolean = useSelector(
    (state: RootState) =>
      state.commonValuesReducer.questionOneReviewSectionViewed
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedQuestionIndex, setCompletedQuestionIndex] = useState(0);
  const [locale, setLocale] = useState(i18n.language);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isNextButtonEnabled, setNextButtonStatus] = useState(false);
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

  const getApplicationDetails = async () => {
    const applicationId: string =
      (await getDataFromLocalStorage("donorApplicationId")) ?? "";
    const { apiSuccess }: any = await getDonorApplicationById(applicationId);
    // const submissionResult = await getSubmissionByApplicationIdAndSection(
    //   applicationId,
    //   "QUESTIONNAIRE_ONE"
    // );
    // console.log();
    // const completedQuestionCount =
    //   submissionResult?.apiSuccess?.data?.data?.length;
    // const lastSubmitedQestionIndex = apiSuccess?.data?.data?.last_submission_id;

    // if (completedQuestionCount >= TOTAL_QUESTION_COUNT) {

    // }
    // if (lastSubmitedQestionIndex == 100) {
    //   setCurrentQuestionIndex(0);
    //   setCompletedQuestionIndex(0);
    //   return;
    // }
    // if (lastSubmitedQestionIndex == completedQuestionCount) {
    //   setCurrentQuestionIndex(completedQuestionCount);
    //   setCompletedQuestionIndex(completedQuestionCount);
    //   return;
    // }
    // if (completedQuestionCount >= TOTAL_QUESTION_COUNT) {
    //   alert(1);
    //   setCurrentQuestionIndex(TOTAL_QUESTION_COUNT);
    //   setCompletedQuestionIndex(TOTAL_QUESTION_COUNT);
    //   return;
    // }
    // if (lastSubmitedQestionIndex <= completedQuestionCount) {
    //   alert(2);
    //   setCurrentQuestionIndex(TOTAL_QUESTION_COUNT);
    //   setCompletedQuestionIndex(TOTAL_QUESTION_COUNT);
    //   return;
    // }
    // setCurrentQuestionIndex(lastSubmitedQestionIndex);
    // setCompletedQuestionIndex(lastSubmitedQestionIndex);
    // return;

    if (apiSuccess && apiSuccess.status === 200) {
      // console.log(apiSuccess.data.data);

      if (
        apiSuccess?.data?.data?.last_submission_question_section ===
        QUESTIONNAIRE_ONE
      ) {
        if (apiSuccess?.data?.data?.last_submission_id !== null) {
          setCurrentQuestionIndex(
            Number(apiSuccess.data.data.last_submission_id)
          );
          setCompletedQuestionIndex(
            Number(apiSuccess.data.data.last_submission_id)
          );
        }
      }
    }
  };

  const getAnswerForQuestion = async () => {
    setIsLoading(true);
    const applicationId: string =
      (await getDataFromLocalStorage("donorApplicationId")) ?? "";
    const { apiSuccess, apiError }: any =
      await getSubmissionByApplicationIdAndQuestionId(
        applicationId,
        questions[currentQuestionIndex].id,
        QUESTIONNAIRE_ONE
      );

    if (apiSuccess && apiSuccess.status === 200) {
      const answerData =
        apiSuccess?.data?.data[apiSuccess?.data?.data?.length - 1]?.answers;
      // const answerData = apiSuccess?.data?.data?.slice(-1)[0];
      let updatedQuestion: any = questions[currentQuestionIndex];

      if (answerData && answerData.length > 0) {
        // setIsEdit(true);

        answerData.forEach((ans: any, index: number) => {
          if (ans.answerType === INPUT_TYPE_MULTIPLE_CHECKBOX) {
            const optionObj: any = updatedQuestion.yesQuestions[0].options.find(
              (_option: any, index: number) => index === ans.index
            );

            if (optionObj) {
              const ansObj = {
                options: [...ans.answer],
                title: optionObj.title ?? optionObj.optionTitle,
                type: optionObj.type
              };

              updatedQuestion = {
                ...updatedQuestion,
                yesQuestions: [
                  {
                    ...updatedQuestion.yesQuestions[0],
                    answer: [...updatedQuestion.yesQuestions[0].answer, ansObj]
                  }
                ]
              };
            }
          } else if (index === 0) {
            let answerObj;

            if (ans.answerType === INPUT_TYPE_YESANDNO) {
              answerObj = ans.answer[0];
            } else if (ans.answerType === INPUT_TYPE_CHECKBOX) {
              answerObj = [...ans.answer];
            }

            updatedQuestion = {
              ...updatedQuestion,
              isYesSelected: answerObj === "YES" ? true : null,
              answer: answerObj
            };
          } else {
            if (
              ans.answerType === INPUT_TYPE_DATE ||
              ans.answerType === INPUT_TYPE_TEXT ||
              ans.answerType === INPUT_TYPE_YESANDNO ||
              ans.answerType === INPUT_TYPE_CHECKBOX
            ) {
              if (
                updatedQuestion?.yesQuestions &&
                ans?.index - 2 <= updatedQuestion.yesQuestions.length
              ) {
                let yesQuestion = {
                  ...updatedQuestion.yesQuestions[ans?.index - 2]
                };

                let updatedYesQuestion = [
                  ...updatedQuestion.yesQuestions.filter(
                    (ques: any) => ques.question !== yesQuestion.question
                  )
                ];

                if (ans.answerType === INPUT_TYPE_CHECKBOX) {
                  yesQuestion = {
                    ...yesQuestion,
                    answer: [...ans.answer]
                  };
                } else {
                  yesQuestion = {
                    ...yesQuestion,
                    answer: ans.answer[0]
                  };
                }

                updatedYesQuestion = [...updatedYesQuestion, yesQuestion];

                updatedQuestion = {
                  ...updatedQuestion,
                  isYesSelected: true,
                  yesQuestions: [...updatedYesQuestion]
                };
              }
            }
          }
        });
        dispatch(updateQuestions(updatedQuestion));
        setIsLoading(false);
      }
    } else if (apiError) {
      setIsEdit(false);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("getting application details");

    void getApplicationDetails();
  }, []);

  useEffect(() => {
    if (currentQuestionIndex < completedQuestionIndex) {
      void getAnswerForQuestion();
    }
  }, [currentQuestionIndex]);

  const getAnswers = () => {
    let answers: any = [];
    const answerObject: QuestionType = questions[currentQuestionIndex];

    if (answerObject.inputType === InputType.YESANDNO) {
      let ans = {
        index: 1,
        answerType: INPUT_TYPE_YESANDNO,
        answer: [answerObject.answer]
      };

      answers = [...answers, ans];

      if (
        answerObject.yesQuestions &&
        answerObject.yesQuestions?.length > 0 &&
        answerObject.isYesSelected
      ) {
        answerObject.yesQuestions?.forEach((yesQuestion, index) => {
          if (
            yesQuestion.inputType === InputType.TEXT ||
            yesQuestion.inputType === InputType.DATE ||
            yesQuestion.inputType === InputType.YESANDNO
          ) {
            const ansType: string =
              yesQuestion.inputType === InputType.TEXT
                ? INPUT_TYPE_TEXT
                : yesQuestion.inputType === InputType.DATE
                  ? INPUT_TYPE_DATE
                  : INPUT_TYPE_YESANDNO;
            ans = {
              index: index + 2,
              answerType: ansType,
              answer: [yesQuestion.answer]
            };
            answers = [...answers, ans];
          }

          if (yesQuestion.inputType === InputType.MULTIPLE_CHECKBOX) {
            let answersScheme: any = yesQuestion.answer;

            if (Array.isArray(answersScheme)) {
              answersScheme = answersScheme.filter(
                (ansItem: any, index: number, self: any) => {
                  // Check if the current element's index is the first occurrence of its age in the array
                  return (
                    self.findIndex((p: any) => p.title === ansItem.title) ===
                    index
                  );
                }
              );

              answersScheme?.forEach((answerItem: any) => {
                const indexNo = yesQuestion.options?.findIndex(
                  (option) => option.title === answerItem.title
                );
                if (
                  answerItem?.type?.toString() === "0" ||
                  answerItem?.type === 0
                ) {
                  const ansItem = {
                    index: indexNo,
                    answerType: INPUT_TYPE_MULTIPLE_CHECKBOX,
                    answer: [...answerItem.options]
                  };

                  answers = [...answers, ansItem];
                } else if (
                  answerItem?.type?.toString() === "1" ||
                  answerItem?.type === 1
                ) {
                  const indexNo: any = yesQuestion.options?.findIndex(
                    (option) => option.optionTitle === answerItem.title
                  );
                  const ansItem = {
                    index: indexNo,
                    answerType: INPUT_TYPE_MULTIPLE_CHECKBOX,
                    answer: [...answerItem.options]
                  };
                  if (answerItem.options[0].length > 0) {
                    answers = [...answers, ansItem];
                  }
                }
              });
            }
          }

          if (yesQuestion.inputType === InputType.CHECKBOX) {
            let answersScheme: any = yesQuestion.answer;

            answersScheme = answersScheme.filter((yesQ: any) => yesQ !== "");

            if (Array.isArray(answersScheme)) {
              const ansItem = {
                index: 2,
                answerType: INPUT_TYPE_CHECKBOX,
                answer: [...answersScheme]
              };

              answers = [...answers, ansItem];
            }
          }
        });
      }
    }

    if (answerObject.inputType === InputType.CHECKBOX) {
      let checkboxAnswers: any = [];

      if (
        answerObject.answer.length > 0 &&
        Array.isArray(answerObject.answer) &&
        answerObject.answer.every((item) => typeof item === "string")
      ) {
        answerObject.answer.forEach((ansObject) => {
          if (ansObject !== "") {
            checkboxAnswers = [...checkboxAnswers, ansObject];
          }
        });
      } else {
        checkboxAnswers = [""];
      }

      const ans = {
        index: 1,
        answerType: INPUT_TYPE_CHECKBOX,
        answer: checkboxAnswers
      };

      answers = [...answers, ans];
      console.log("answers", answers);
    }

    if (answerObject.inputType === InputType.MULTIPLE_CHECKBOX) {
      let answersScheme: any = questions[currentQuestionIndex].answer;

      if (Array.isArray(answersScheme)) {
        answersScheme = answersScheme.filter(
          (ansItem: any, index: number, self: any) => {
            // Check if the current element's index is the first occurrence of its age in the array
            return (
              self.findIndex((p: any) => p.title === ansItem.title) === index
            );
          }
        );

        answersScheme?.forEach((answerItem: any) => {
          const indexNo = questions[currentQuestionIndex].options?.findIndex(
            (option) => option.title === answerItem.title
          );
          if (answerItem?.type?.toString() === "0" || answerItem?.type === 0) {
            const ansItem = {
              index: indexNo,
              answerType: INPUT_TYPE_MULTIPLE_CHECKBOX,
              answer: [...answerItem.options]
            };

            answers = [...answers, ansItem];
          } else if (
            answerItem?.type?.toString() === "1" ||
            answerItem?.type === 1
          ) {
            const indexNo = questions[currentQuestionIndex].options?.findIndex(
              (option) => option.optionTitle === answerItem.title
            );
            const ansItem = {
              index: indexNo,
              answerType: INPUT_TYPE_MULTIPLE_CHECKBOX,
              answer: [...answerItem.options]
            };
            answers = [...answers, ansItem];
          }
        });
      }
    }
    if (currentQuestionIndex === 41) return answers;

    return answers.filter((ansItem: any, index: number, self: any) => {
      // Check if the current element's index is the first occurrence of its age in the array
      return self.findIndex((p: any) => p.index === ansItem.index) === index;
    });
  };

  const submitQuestion = async () => {
    console.log(isLoading);
    console.log(isNextButtonEnabled);
    setIsLoading(true);

    // if (!isNextButtonEnabled) {
    //   toast.error("please fill all fields before submit!");
    //   return;
    // }
    if (
      questions[currentQuestionIndex].inputType === InputType.YESANDNO &&
      questions[currentQuestionIndex].answer === "YES" &&
      questions[currentQuestionIndex]?.yesQuestions !== null &&
      questions[currentQuestionIndex]?.yesQuestions !== undefined
    ) {
      const yesQuestions: any = questions[currentQuestionIndex]?.yesQuestions;

      const answered = yesQuestions?.filter(
        (question: any) => question.answer !== ""
      );
      if (
        answered === undefined ||
        answered === null ||
        answered.length === 0
      ) {
        setMessage("You cannot proceed without answering");
        setIsError(true);
        setIsLoading(false);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      } else {
        if (isEdit) {
          setIsLoading(true);
          const applicationId: string =
            (await getDataFromLocalStorage("donorApplicationId")) ?? "";
          const { apiSuccess, apiError }: any = await editSubmission(
            applicationId,
            questions[currentQuestionIndex].id.toString(),
            getAnswers(),
            QUESTIONNAIRE_ONE
          );

          if (apiSuccess) {
            setIsLoading(false);
            setCurrentQuestionIndex(questions[currentQuestionIndex].id);
            window.scrollTo(0, 0);
          } else if (apiError) {
            void createSubmission();
          }
        } else {
          void createSubmission();
        }
      }
    } else {
      if (questions[currentQuestionIndex].inputType === InputType.SELECT) {
        setIsLoading(false);
        setCurrentQuestionIndex(questions[currentQuestionIndex].id);
      } else {
        setIsLoading(true);
        if (isEdit) {
          const applicationId: string =
            (await getDataFromLocalStorage("donorApplicationId")) ?? "";
          const { apiSuccess, apiError }: any = await editSubmission(
            applicationId,
            questions[currentQuestionIndex].id.toString(),
            getAnswers(),
            QUESTIONNAIRE_ONE
          );

          if (apiSuccess) {
            setIsLoading(false);
            setCurrentQuestionIndex(questions[currentQuestionIndex].id);
            window.scrollTo(0, 0);
          } else if (apiError) {
            void createSubmission();
          }
        } else {
          void createSubmission();
        }
      }
    }
  };

  const createSubmission = async () => {
    const applicationId: string =
      (await getDataFromLocalStorage("donorApplicationId")) ?? "";
    const { apiSuccess, apiError }: any = await addSubmission(
      applicationId,
      QUESTIONNAIRE_ONE,
      questions[currentQuestionIndex].id.toString(),
      questions[currentQuestionIndex].id.toString(),
      getAnswers()
    );

    if (apiSuccess) {
      setIsLoading(false);
      setCurrentQuestionIndex(questions[currentQuestionIndex].id);
      window.scrollTo(0, 0);
    } else if (apiError) {
      setIsLoading(false);
      setCurrentQuestionIndex(questions[currentQuestionIndex].id);
      window.scrollTo(0, 0);
    }
  };

  const questionHandler = () => {
    return (
      <>
        {currentQuestionIndex === 3 ? (
          <>
            {isLoading ? (
              <div className="w-full flex my-10 justify-center items-center">
                <LoaderIconSvg />
              </div>
            ) : (
              <MaternalRiskCustomQ4
                question={questions[currentQuestionIndex]}
              />
            )}
          </>
        ) : (
          <>
            {isLoading ? (
              <div className="w-full flex my-10 justify-center items-center">
                <LoaderIconSvg />
              </div>
            ) : (
              <QuestionItem
                question={questions[currentQuestionIndex]}
                totalQuestionCount={questions.length}
                setSelectedQuestionIndex={setCurrentQuestionIndex}
                setIsNextButtonVisible={setNextButtonStatus}
                questionIndex={currentQuestionIndex}
              />
            )}
          </>
        )}
      </>
    );
  };
  return (
    <div className="container flex justify-center mt-5 mb-10">
      <div className="w-9/12 flex flex-col justify-between bg-white py-2 min-h-[50vh] rounded-[20px] shadow-md shadow-[#D3C4A0] px-5">
        <div>
          <div>
            <div className="flex justify-between items-center mb-5">
              <div className="text-textPrimary font-medium text-5xl">
                {currentQuestionIndex + 1 <= questions.length
                  ? `${t("maternal-risk-questionnaire")}`
                  : `${t("review-answers")}`}
              </div>

              {currentQuestionIndex + 1 <= questions.length && (
                <div className="flex w-5/12">
                  <div className="flex gap-2 items-center space-x-2">
                    <div className="w-[260px]">
                      <div className="h-2.5 rounded-lg w-full bg-secondary dark:bg-neutral-600">
                        <div
                          className="h-2.5 rounded-lg bg-primary"
                          style={{
                            width: `${
                              ((currentQuestionIndex + 1) * 100) /
                              questions.length
                            }%`
                          }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-black font-normal text-base ">
                      {currentQuestionIndex + 1}/{questions.length}
                    </span>
                  </div>
                </div>
              )}
            </div>
            {isError && (
              <Alert
                color="red"
                className="w-full container flex justify-center mb-5"
              >
                <span>{message}</span>
              </Alert>
            )}
            {currentQuestionIndex + 1 <= questions.length ? (
              questionHandler()
            ) : (
              <ReviewQuestions
                setSelectedQuestionIndex={setCurrentQuestionIndex}
                questions={questions}
                navigateTo="/quick-setup/questionnaire-2"
                questionnaire={1}
                questionType={QUESTIONNAIRE_ONE}
              />
            )}
          </div>
        </div>{" "}
        <div className="w-full flex justify-between items-center mb-2">
          {currentQuestionIndex >= 1 &&
          currentQuestionIndex <= questions.length - 1 ? (
            <div
              onClick={() => {
                if (!isLoading) {
                  setCurrentQuestionIndex(
                    questions[currentQuestionIndex].id - 2
                  );
                }
              }}
              className="flex gap-1 items-center space-x-1.5 cursor-pointer"
            >
              <span className="font-normal text-sm text-primary">
                {t("back")}
              </span>
              <IconButton
                placeholder={""}
                size="sm"
                className="bg-transparent shadow-none hover:shadow-none "
              >
                {isArabic ? (
                  <QuestionButtonIcon isFlipped={true} />
                ) : (
                  <QuestionButtonIcon />
                )}
              </IconButton>
            </div>
          ) : (
            <div className=""></div>
          )}

          {questionOneReviewViewed &&
          currentQuestionIndex < questions.length ? (
            <BasicButton
              styledBorderEnabled={false}
              onClick={() => {
                if (!isLoading) {
                  setCurrentQuestionIndex(questions.length);
                }
              }}
              text={`${t("back-to-review")}`}
            />
          ) : (
            <div className=""></div>
          )}

          {currentQuestionIndex >= 0 &&
          currentQuestionIndex <= questions.length - 1 ? (
            <div
              onClick={() => {
                if (!isLoading) {
                  void submitQuestion();
                }
              }}
              className="flex gap-1 items-center space-x-1.5 cursor-pointer"
            >
              {questionOneReviewViewed &&
              currentQuestionIndex < questions.length ? (
                <span className="font-normal text-sm text-primary">
                  Save Changes
                </span>
              ) : (
                <span className="font-normal text-sm text-primary">
                  {isLoading ? t("Saving...") : t("next")}
                </span>
              )}

              <IconButton
                placeholder={""}
                size="sm"
                className="bg-transparent shadow-none hover:shadow-none"
              >
                {isArabic ? (
                  <QuestionButtonIcon />
                ) : (
                  <QuestionButtonIcon isFlipped={true} />
                )}
              </IconButton>
            </div>
          ) : (
            <div className=""></div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default QuestionContainer;
