import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { type QuestionTwoType } from "../../../../redux/types/QuestionsTwo";
import { updateQuestionsTwo } from "../../../../redux/slices/QuestionsTwo";
import { InputType } from "../../../../redux/types/Questions";
import QuestionInputText from "../../../atoms/donor/inputs/QuestionInputText";
import i18n from "../../../../i18n";

const InnerChildQuestion = ({
  question,
  parentQuestion,
  isYesQuestions
}: {
  question: QuestionTwoType;
  parentQuestion: QuestionTwoType;
  isYesQuestions: boolean;
}) => {
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

  const handleTextInputChange = (e: any) => {
    if (isYesQuestions && parentQuestion.yesQuestions) {
      const yesQuestions: QuestionTwoType[] = parentQuestion.yesQuestions?.map(
        (yesQuestion) => {
          if (question.id === yesQuestion.id) {
            return { ...yesQuestion, answer: e.target.value };
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
            return { ...noQuestion, answer: e.target.value };
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
                onInputChange={handleTextInputChange}
                value={question.answer.toString()}
                styles={{ width: "100%", height: "40px" }}
                key={"key"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InnerChildQuestion;
