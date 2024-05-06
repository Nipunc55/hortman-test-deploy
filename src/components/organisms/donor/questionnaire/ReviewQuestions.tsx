import { t } from "i18next";
import ReviewQuestionItem from "./ReviewQuestionItem";
import { useNavigate } from "react-router-dom";
import QuestionButton from "../../../atoms/donor/buttons/QuestionButton";
import { type QuestionTwoType } from "../../../../redux/types/QuestionsTwo";
import { type QuestionType } from "../../../../redux/types/Questions";
import { useEffect, useState } from "react";
import { type RootState } from "../../../../redux/store";
import { type CommonInitialState } from "../../../../redux/types/CommonValues";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuestionOneReviewValue,
  updateQuestionTwoReviewValue
} from "../../../../redux/slices/CommonValues";
import { getSubmissionByApplicationIdAndSection } from "../../../../api/submission";
import {
  INPUT_TYPE_CHECKBOX,
  INPUT_TYPE_DATE,
  INPUT_TYPE_TEXT,
  INPUT_TYPE_YESANDNO,
  QUESTIONNAIRE_ONE
} from "../../../../utils/constants/common";
import { Alert } from "@material-tailwind/react";
import { updateQuestions } from "../../../../redux/slices/Questions";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";
import { getDataFromLocalStorage } from "../../../../utils/common/accessLocalStorage";
import dayjs from "dayjs";
import { updateApplicationStatusByUser } from "../../../../api/donor";
import { updateQuestionsTwo } from "../../../../redux/slices/QuestionsTwo";

const ReviewQuestions = ({
  setSelectedQuestionIndex,
  questions,
  navigateTo,
  questionnaire,
  questionType
}: {
  setSelectedQuestionIndex: (value: number) => void;
  questions: QuestionType[] | QuestionTwoType[];
  navigateTo: string;
  questionnaire: number;
  questionType: string;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const commonValues: CommonInitialState = useSelector(
    (state: RootState) => state.commonValuesReducer
  );
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const getReviewData = async () => {
    setIsLoading(true);
    setIsError(false);
    const applicationId: string =
      (await getDataFromLocalStorage("donorApplicationId")) ?? "";
    const { apiSuccess, apiError }: any =
      await getSubmissionByApplicationIdAndSection(applicationId, questionType);
    setIsLoading(false);

    if (apiSuccess && apiSuccess.status === 200) {
      setIsLoading(false);
      updateQuestionnaireAnswers(apiSuccess.data.data);
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

  const updateQuestionnaireAnswers = (reviewData: any) => {
    const updatedQuestions: any = [...questions];
    let updatedAnswers: any = [];

    updatedQuestions.forEach((questionItem: any, questionItemIndex: number) => {
      const questionAnswer = reviewData.find((element: any) => {
        return element.index === questionItem.id;
      });
      updatedAnswers = [...updatedAnswers, questionAnswer];

      if (questionAnswer?.answers && questionAnswer.answers?.length > 0) {
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

              updatedQuestions[questionItemIndex] = {
                ...questionItem,
                isYesSelected: answerObj === "YES" ? true : null,
                answer: answerObj
              };
            } else {
              if (
                questionAnswerItem.answerType === INPUT_TYPE_DATE ||
                questionAnswerItem.answerType === INPUT_TYPE_TEXT ||
                questionAnswerItem.answerType === INPUT_TYPE_YESANDNO
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

                  yesQuestion = {
                    ...yesQuestion,
                    answer: questionAnswerItem.answer[0]
                  };

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
      if (questionType === QUESTIONNAIRE_ONE) {
        dispatch(updateQuestions(updatedQuestions[questionItemIndex]));
      } else {
        dispatch(updateQuestionsTwo(updatedQuestions[questionItemIndex]));
      }
    });
  };

  useEffect(() => {
    console.log(questions);

    void getReviewData();
  }, []);

  useEffect(() => {
    if (questionnaire === 1 && !commonValues.questionOneReviewSectionViewed) {
      dispatch(updateQuestionOneReviewValue(true));
    }
    if (questionnaire === 2 && !commonValues.questionTwoReviewSectionViewed) {
      dispatch(updateQuestionTwoReviewValue(true));
    }
  }, []);

  return (
    <div className="flex flex-col">
      {isError && (
        <Alert
          color="red"
          className="w-full container my-2 flex justify-center"
        >
          <span>{message}</span>
        </Alert>
      )}
      {isLoading ? (
        <div className="w-full my-10 flex justify-center items-center">
          <LoaderIconSvg />
        </div>
      ) : (
        <div className="mt-6 h-121 overflow-y-scroll px-2">
          {questions?.map((question) => (
            <ReviewQuestionItem
              key={question.id}
              question={question}
              setSelectedQuestionIndex={setSelectedQuestionIndex}
              setError={setError}
            />
          ))}
        </div>
      )}

      <div className="w-full flex justify-end py-3">
        <QuestionButton
          text={`${t("next")}`}
          onClick={async () => {
            if (error) {
              setMessage(
                "You cannot proceed to the next section without answering all the questions"
              );
              setIsError(true);
              setIsLoading(false);
              setTimeout(() => {
                setIsError(false);
              }, 3000);
            } else {
              // if (navigateTo === "/donor") {
              // }
              navigate(navigateTo);
            }
          }}
        />
      </div>
    </div>
  );
};

export default ReviewQuestions;
