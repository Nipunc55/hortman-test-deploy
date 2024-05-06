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
// @ts-expect-error This will ignore the type of the library below

// import { status } from "../../../../types/userTypes";

interface UserCreateModalModalProps {
  open: boolean;
  handleOpen: (value: boolean) => void;
  question: any;
}

const QuestionView = ({
  open,
  handleOpen,
  question
}: UserCreateModalModalProps) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  console.log(question);

  return (
    <>
      <Dialog open={open} size={"l"} handler={handleOpen} placeholder={""}>
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
        <DialogBody placeholder={""}>
          <QuestionItemModalBody
            questionIndex={question?.id - 1}
            question={question}
          />
        </DialogBody>

        <DialogFooter placeholder={""}></DialogFooter>
      </Dialog>
    </>
  );
};

export default QuestionView;
