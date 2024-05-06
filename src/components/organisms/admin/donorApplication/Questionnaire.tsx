import { useEffect, useState } from "react";
import { t } from "i18next";
import { type QuestionType } from "../../../../redux/types/Questions";
import { type RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSubmissionByApplicationIdAndSection } from "../../../../api/submission";
import {
  ELIGIBILITYASSESSMENT,
  INPUT_TYPE_CHECKBOX,
  INPUT_TYPE_DATE,
  INPUT_TYPE_MULTIPLE_CHECKBOX,
  INPUT_TYPE_TEXT,
  INPUT_TYPE_YESANDNO,
  QUESTIONNAIRE_ONE,
  QUESTIONNAIRE_TWO
} from "../../../../utils/constants/common";
import {
  resetState,
  updateQuestions
} from "../../../../redux/slices/Questions";
import ReviewQuestionItem from "../../donor/questionnaire/ReviewQuestionItem";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";
import { type QuestionTwoType } from "../../../../redux/types/QuestionsTwo";
import {
  resetStateTwo,
  updateQuestionsTwo
} from "../../../../redux/slices/QuestionsTwo";
import BasicButton from "../../../atoms/admin/buttons/BasicButton";
import { Alert } from "@material-tailwind/react";

const Questionnaire = ({ onTabChange }: { onTabChange: any }) => {
  const questions: QuestionType[] = useSelector(
    (state: RootState) => state.questionsReducer.questions
  );
  const questionsTwo: QuestionTwoType[] = useSelector(
    (state: RootState) => state.questionsTwoReducer.questionsTwo
  );
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTwoLoading, setIsTwoLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [err, setError] = useState(false);
  const dispatch = useDispatch();
  const { name } = useParams();
  useEffect(() => {
    // Dispatch reset actions when the component mounts
    // dispatch(resetState());
    // dispatch(resetStateTwo());

    // Return a cleanup function to reset the states
    return () => {
      dispatch(resetState());
      dispatch(resetStateTwo());
    };
  }, []);
  const getReviewData = async () => {
    setIsLoading(true);
    setIsError(false);
    const applicationId: string = name ?? "";
    const { apiSuccess, apiError }: any =
      await getSubmissionByApplicationIdAndSection(
        applicationId,
        QUESTIONNAIRE_ONE
      );
    setIsLoading(false);

    if (apiSuccess && apiSuccess.status === 200) {
      setIsLoading(false);
      updateQuestionnaireAnswers(apiSuccess.data.data, QUESTIONNAIRE_ONE);
    } else if (apiError) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setMessage(apiError.response.data.message);
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const getReviewDataTwo = async () => {
    setIsTwoLoading(true);
    setIsError(false);
    const applicationId: string = name ?? "";
    const { apiSuccess, apiError }: any =
      await getSubmissionByApplicationIdAndSection(
        applicationId,
        QUESTIONNAIRE_TWO
      );
    setIsTwoLoading(false);

    if (apiSuccess && apiSuccess.status === 200) {
      setIsTwoLoading(false);

      updateQuestionnaireAnswers(apiSuccess?.data?.data, QUESTIONNAIRE_TWO);
    } else if (apiError) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setMessage(apiError.response.data.message);
      setIsError(true);
      setIsTwoLoading(false);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };
  const updateQuestionnaireAnswers = (
    reviewData: any,
    questionnaireType: string
  ) => {
    // const updatedQuestions: any = [...questions];
    // let updatedAnswers: any = [];
    let updatedQuestions: any;
    if (questionnaireType === QUESTIONNAIRE_ONE) {
      updatedQuestions = [...questions];
    } else if (questionnaireType === QUESTIONNAIRE_TWO) {
      updatedQuestions = [...questionsTwo];
    }
    let updatedAnswers: any = [];

    updatedQuestions.forEach((questionItem: any, questionItemIndex: number) => {
      const questionAnswer = reviewData.find((element: any) => {
        return element.index === questionItem.id;
      });
      updatedAnswers = [...updatedAnswers, questionAnswer];

      if (questionAnswer?.answers && questionAnswer.answers?.length > 0) {
        console.log(questionAnswer);
        questionAnswer.answers.forEach(
          (questionAnswerItem: any, index: number) => {
            if (index === 0) {
              let answerObj;

              if (questionAnswerItem.answerType === INPUT_TYPE_YESANDNO) {
                answerObj = questionAnswerItem.answer[0];
              } else if (
                questionAnswerItem.answerType === INPUT_TYPE_CHECKBOX
              ) {
                answerObj = [...questionAnswerItem.answer];
              }
              console.log(answerObj);

              updatedQuestions[questionItemIndex] = {
                ...questionItem,
                isYesSelected: answerObj === "YES" ? true : null,
                answer: answerObj
              };
            } else {
              if (
                questionAnswerItem.answerType === INPUT_TYPE_MULTIPLE_CHECKBOX
              ) {
                console.log(questionItem);

                const optionObj: any =
                  questionItem.yesQuestions[0].options.find(
                    (_option: any, index: number) =>
                      index === questionAnswerItem.index
                  );

                if (optionObj) {
                  const ansObj = {
                    options: [...questionAnswerItem.answer],
                    title: optionObj.title ?? optionObj.optionTitle,
                    type: optionObj.type
                  };

                  updatedQuestions[questionItemIndex] = {
                    ...updatedQuestions[questionItemIndex],
                    yesQuestions: [
                      {
                        ...updatedQuestions[questionItemIndex].yesQuestions[0],
                        answer: [
                          ...updatedQuestions[questionItemIndex].yesQuestions[0]
                            .answer,
                          ansObj
                        ]
                      }
                    ]
                  };
                }
              }

              if (
                questionAnswerItem.answerType === INPUT_TYPE_DATE ||
                questionAnswerItem.answerType === INPUT_TYPE_TEXT ||
                questionAnswerItem.answerType === INPUT_TYPE_YESANDNO ||
                questionAnswerItem.answerType === INPUT_TYPE_CHECKBOX
                // questionAnswerItem.answerType === INPUT_TYPE_MULTIPLE_CHECKBOX
              ) {
                if (
                  questionItem?.yesQuestions &&
                  questionAnswerItem?.index - 2 <=
                    questionItem.yesQuestions.length
                ) {
                  let yesQuestion = {
                    ...questionItem.yesQuestions[questionAnswerItem?.index - 2]
                  };

                  let updatedYesQuestion = [
                    ...questionItem.yesQuestions.filter(
                      (ques: any) => ques.question !== yesQuestion.question
                    )
                  ];

                  if (questionAnswerItem.answerType === INPUT_TYPE_CHECKBOX) {
                    yesQuestion = {
                      ...yesQuestion,
                      answer: questionAnswerItem.answer
                    };
                  } else {
                    yesQuestion = {
                      ...yesQuestion,
                      answer: questionAnswerItem.answer[0]
                    };
                  }

                  updatedYesQuestion = [...updatedYesQuestion, yesQuestion];

                  updatedQuestions[questionItemIndex] = {
                    ...questionItem,
                    answer: "YES",
                    isYesSelected: true,
                    yesQuestions: [...updatedYesQuestion]
                  };
                }
              }
            }
          }
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      if (questionnaireType === QUESTIONNAIRE_ONE) {
        dispatch(updateQuestions(updatedQuestions[questionItemIndex]));
      } else {
        dispatch(updateQuestionsTwo(updatedQuestions[questionItemIndex]));
      }
    });
  };
  // const updateQuestionnaireAnswers = (
  //   reviewData: any,
  //   questionnaireType: string
  // ) => {
  //   let updatedQuestions: any;
  //   if (questionnaireType === QUESTIONNAIRE_ONE) {
  //     updatedQuestions = [...questions];
  //   } else if (questionnaireType === QUESTIONNAIRE_TWO) {
  //     updatedQuestions = [...questionsTwo];
  //   }

  //   let updatedAnswers: any = [];

  //   updatedQuestions.forEach((questionItem: any, questionItemIndex: number) => {
  //     const questionAnswer = reviewData.find((element: any) => {
  //       return element.index === questionItem.id;
  //     });
  //     updatedAnswers = [...updatedAnswers, questionAnswer];

  //     if (questionAnswer?.answers && questionAnswer.answers?.length > 0) {
  //       questionAnswer.answers.forEach(
  //         (questionAnswerItem: any, index: number) => {
  //           if (index === 0) {
  //             let answerObj;

  //             if (questionAnswerItem.answerType === INPUT_TYPE_YESANDNO) {
  //               answerObj = questionAnswerItem.answer[0];
  //             } else if (
  //               questionAnswerItem.answerType === INPUT_TYPE_CHECKBOX
  //             ) {
  //               answerObj = [...questionAnswerItem.answer];
  //             }

  //             updatedQuestions[questionItemIndex] = {
  //               ...questionItem,
  //               isYesSelected: answerObj === "YES" ? true : null,
  //               answer: answerObj
  //             };
  //           } else {
  //             if (
  //               questionAnswerItem.answerType === INPUT_TYPE_DATE ||
  //               questionAnswerItem.answerType === INPUT_TYPE_TEXT ||
  //               questionAnswerItem.answerType === INPUT_TYPE_YESANDNO
  //             ) {
  //               if (
  //                 questionItem?.yesQuestions &&
  //                 questionAnswerItem?.index - 2 <=
  //                   questionItem.yesQuestions.length
  //               ) {
  //                 let yesQuestion = {
  //                   ...questionItem.yesQuestions[questionAnswerItem?.index - 2]
  //                 };

  //                 let updatedYesQuestion = [
  //                   ...questionItem.yesQuestions.filter(
  //                     (ques: any) => ques.question !== yesQuestion.question
  //                   )
  //                 ];

  //                 yesQuestion = {
  //                   ...yesQuestion,
  //                   answer: questionAnswerItem.answer[0]
  //                 };

  //                 updatedYesQuestion = [...updatedYesQuestion, yesQuestion];

  //                 updatedQuestions[questionItemIndex] = {
  //                   ...questionItem,
  //                   answer: "YES",
  //                   isYesSelected: true,
  //                   yesQuestions: [...updatedYesQuestion]
  //                 };
  //               }
  //             }
  //           }
  //         }
  //       );
  //     }
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //     if (questionnaireType === QUESTIONNAIRE_ONE) {
  //       dispatch(updateQuestions(updatedQuestions[questionItemIndex]));
  //     } else if (questionnaireType === QUESTIONNAIRE_TWO) {
  //       // console.log(updatedQuestions);
  //       dispatch(updateQuestionsTwo(updatedQuestions[questionItemIndex]));
  //     }
  //   });
  // };

  useEffect(() => {
    void getReviewData();
  }, []);

  useEffect(() => {
    void getReviewDataTwo();
  }, []);

  return (
    <div className="p-5">
      {isError && (
        <Alert
          color="red"
          className="w-full container flex justify-center mt-5"
        >
          <span>{message}</span>
        </Alert>
      )}
      {isLoading || isTwoLoading ? (
        <div className="my-10 w-full flex justify-center items-center">
          <LoaderIconSvg />
        </div>
      ) : (
        <>
          {questions?.map((question) => {
            return (
              <ReviewQuestionItem
                key={question.id}
                question={question}
                setError={setError}
              />
            );
          })}

          <h3 className="text-primary mt-10 mb-5 font-medium text-2xl">
            Family Medical History - Review Answers
          </h3>
          {questionsTwo?.map((question) => {
            return (
              <ReviewQuestionItem
                key={question.id}
                question={question}
                setError={setError}
              />
            );
          })}
        </>
      )}
      <div className="w-full flex justify-end px-5 pt-8">
        <BasicButton
          text={`${t("next")}`}
          onClick={() => {
            onTabChange(ELIGIBILITYASSESSMENT);
          }}
          styledBorderEnabled={false}
        />
      </div>
    </div>
  );
};

export default Questionnaire;
