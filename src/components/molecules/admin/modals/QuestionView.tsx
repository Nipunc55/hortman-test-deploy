/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
  Input,
  Alert
} from "@material-tailwind/react";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

import ReviewQuestions from "../../../organisms/donor/questionnaire/ReviewQuestions";
import CloseIcon from "../../../../assets/svg/notificationIcon";
import QuestionItemModalBody from "../../../organisms/admin/donorApplication/QuestionItem";
import QuestionItemTwo from "../../../organisms/admin/donorApplication/QuestionItemTwo";
// @ts-expect-error This will ignore the type of the library below

// import { status } from "../../../../types/userTypes";

interface UserCreateModalModalProps {
  open: boolean;
  handleOpen: (value: boolean) => void;
  question: any;
  type?: number;
}

const QuestionView = ({
  open,
  handleOpen,
  question,
  type
}: UserCreateModalModalProps) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <Dialog open={open} size={"lg"} handler={handleOpen} placeholder={""}>
        <DialogHeader placeholder={""}>
          <div className="w-full flex justify-between items-center">
            <div className="text-5xl text-textPrimary font-medium">
              Question View
            </div>
            <IconButton
              placeholder={""}
              onClick={() => handleOpen(false)}
              className="bg-transparent outline-none shadow-none hover:shadow-none"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogHeader>
        <hr className="border border-secondary" />
        {isError && (
          <div className="w-full flex justify-center items-center">
            <Alert color="red" className="w-11/12 p-2 mt-4">
              <span>{message}</span>
            </Alert>
          </div>
        )}
        <DialogBody className="overflow-y-auto max-h-96" placeholder={""}>
          {type === 1 ? (
            <QuestionItemModalBody
              questionIndex={question?.id - 1}
              question={question}
            />
          ) : (
            <QuestionItemTwo
              // questionIndex={question?.id - 1}
              question={question}
            />
          )}
        </DialogBody>

        <DialogFooter placeholder={""}></DialogFooter>
      </Dialog>
    </>
  );
};

export default QuestionView;

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
