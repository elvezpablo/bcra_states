import questions from "../questions.json";
import { atom, selector } from "recoil";

// try https://github.com/pmndrs/jotai at some point
// React Generics
// https://www.youtube.com/watch?v=nViEqpgwxHE

const theQuestions = questions as Question[];

const formState = atom({
  key: "formState",
  default: {
    current: theQuestions[0].id
  }
});

type Question = {
  id: string;
  question: string;
  tooltip: string;
  inputType: string;
  values: string[];
  placeholder: string;
  displayIf?: { [key: string]: string[] };
};

type FilteredDataType = [Question[], Map<string, boolean | string>];

const answersState = atom<Map<string, boolean | string>>({
  key: "answersState",
  default: new Map()
});

const questionsState = atom<Question[]>({
  key: "questionsState",
  default: theQuestions
});

const filteredQuestionState = selector<FilteredDataType>({
  key: "filteredQuestionState",
  get: ({ get }) => {
    const answers = get(answersState);
    // const questions = get(questionsState);
    const questions = theQuestions.filter(({ id, displayIf }) => {
      if (displayIf) {
        return (
          Object.keys(displayIf).filter((k) => {
            const questionHasMatchingAnswer = (displayIf as any)[k].includes(
              answers.get(k)
            );
            if (!questionHasMatchingAnswer) {
              answers.delete(id);
            }
            return questionHasMatchingAnswer;
          }).length > 0
        );
      }
      return true;
    });
    return [questions, answers];
  }
});

export {
  formState,
  answersState,
  questionsState,
  filteredQuestionState,
  theQuestions
};
