import { IconButton } from "@material-tailwind/react";
import QuestionItem from "./QuestionItem";
import QuestionButtonIcon from "../../../../assets/svg/QuestionButtonIcon";
import { type RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { type QuestionType } from "../../../../redux/types/Questions";
import { useState } from "react";
import { t } from "i18next";

const MaternalQuestionContainer = () => {
  const questions: QuestionType[] = useSelector(
    (state: RootState) => state.questionsReducer.questions
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isNextButtonVisible, setIsNextButtonVisible] = useState(false);
  return (
    <div className="container flex justify-center mt-5 mb-10">
      <div className="w-9/12 flex flex-col justify-between bg-white py-2 min-h-[50vh] rounded-[20px] shadow-md shadow-[#D3C4A0] px-5">
        <div>
          <div className="flex justify-between items-center mb-5">
            <div className="text-textPrimary font-medium text-5xl">
              Maternal Risk Questionnaire
            </div>
            <div className="flex w-5/12">
              <div className="flex items-center space-x-2">
                <div className="w-[260px]">
                  <div className="h-2.5 rounded-lg w-full bg-secondary dark:bg-neutral-600">
                    <div
                      className="h-2.5 rounded-lg bg-primary"
                      style={{
                        width: `${
                          ((currentQuestionIndex + 1) * 100) / questions.length
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
          </div>
          <QuestionItem
            question={questions[currentQuestionIndex]}
            totalQuestionCount={questions.length}
            setSelectedQuestionIndex={setCurrentQuestionIndex}
            questionIndex={currentQuestionIndex}
            setIsNextButtonVisible={setIsNextButtonVisible}
          />
        </div>{" "}
        <div className="w-full flex justify-between items-center mb-2">
          {currentQuestionIndex >= 1 &&
            currentQuestionIndex <= questions.length - 1 && (
              <div
                onClick={() =>
                  setCurrentQuestionIndex(
                    questions[currentQuestionIndex].id - 2
                  )
                }
                className="flex items-center space-x-1.5 cursor-pointer"
              >
                <span className="font-normal text-sm text-primary">
                  {t("back")}
                </span>
                <IconButton
                  size="sm"
                  className="bg-transparent shadow-none hover:shadow-none"
                  placeholder=""
                >
                  <QuestionButtonIcon />
                </IconButton>
              </div>
            )}
          <div className=""></div>
          {currentQuestionIndex >= 0 &&
            currentQuestionIndex <= questions.length - 2 &&
            isNextButtonVisible && (
              <div
                onClick={() =>
                  setCurrentQuestionIndex(questions[currentQuestionIndex].id)
                }
                className="flex items-center space-x-1.5 cursor-pointer"
              >
                <span className="font-normal text-sm text-primary">
                  {t("next")}
                </span>
                <IconButton
                  size="sm"
                  className="bg-transparent shadow-none hover:shadow-none"
                  placeholder={""}
                >
                  <QuestionButtonIcon isFlipped={true} />
                </IconButton>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MaternalQuestionContainer;
