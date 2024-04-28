import { type CheckboxType } from "./QuestionsTwo";

enum InputType {
  YESANDNO,
  TEXT,
  SELECT,
  CHECKBOX,
  MULTIPLE_CHECKBOX,
  DATE
}

type OptionType = {
  title?: string;
  optionTitle: string;
  translatedOptionTitle?: string;
  optionDescription?: string;
  translatedOptionDescription?: string;
  translatedLabel?: string;
};

type QuestionType = {
  id: number;
  question: string;
  translatedQuestion?: string;
  translatedQuestionTwo?: string;
  subQuestion?: string;
  translatedSubQuestion?: string;
  translatedOptionDescription?: string;
  inputType: InputType;
  externalLinkDescription?: string;
  translatedExternalLinkDescription?: string;
  externalLink?: string;
  isDateRangePast?: boolean;
  isYesSelected: boolean | null;
  yesQuestions: QuestionType[] | null;
  options?: OptionType[] | CheckboxType[];
  checkboxColumns?: number;
  noQuestions: QuestionType[] | null;
  answer: string | string[];
};

interface QuestionsInitialState {
  questions: QuestionType[];
}

const UPDATE_QUESTION_ANSWER: string = "UPDATE_QUESTION_ANSWER";

export {
  UPDATE_QUESTION_ANSWER,
  type QuestionsInitialState,
  InputType,
  type QuestionType
};
