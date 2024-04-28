import { type InputType } from "./Questions";

enum CheckBoxType {
  TYPE_ONE,
  TYPE_TWO,
  TYPE_THREE
}

type OptionType = {
  title?: string;
  optionTitle: string;
  optionDescription?: string;
  translatedOptionTitle?: string;
  translatedOptionDescription?: string;
};

type CheckboxTypeOneOptions = {
  label: string;
  labelDescription?: string;
  translatedLabel?: string;
  translatedLabelDescription?: string;
  translatedOptionDescription?: string;
};

type CheckboxType = {
  title?: string;
  translatedTitle?: string;
  translatedOptionTitle?: string;
  translatedOptionDescription?: string;
  type: CheckBoxType;
  options?: CheckboxTypeOneOptions[];
  label?: string;
  optionDescription?: string;
  optionTitle: string;
  translatedLabel?: string;
};

type MultipleCheckboxAnswerType = {
  title: string;
  type: CheckBoxType;
  options: string[];
};

type QuestionTwoType = {
  id: number;
  question?: string;
  translatedQuestion?: string;
  translatedQuestionTwo?: string;
  inputType: InputType;
  isYesSelected: boolean | null;
  yesQuestions: QuestionTwoType[] | null;
  options?: OptionType[] | CheckboxType[];
  checkboxColumns?: number;
  noQuestions: QuestionTwoType[] | null;
  answer: string | string[] | MultipleCheckboxAnswerType[];
};

interface QuestionsTwoInitialState {
  questionsTwo: QuestionTwoType[];
}

const UPDATE_QUESTION_TWO_ANSWER: string = "UPDATE_QUESTION_TWO_ANSWER";

export {
  UPDATE_QUESTION_TWO_ANSWER,
  type QuestionsTwoInitialState,
  type QuestionTwoType,
  type OptionType,
  CheckBoxType,
  type CheckboxType,
  type CheckboxTypeOneOptions,
  type MultipleCheckboxAnswerType
};
