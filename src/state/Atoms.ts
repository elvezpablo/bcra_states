import { atom, selector } from "recoil";

// try https://github.com/pmndrs/jotai at some point
// React Generics
// https://www.youtube.com/watch?v=nViEqpgwxHE

const isQuestionList = (response: any): response is Question[] => {
  return (
    Array.isArray(response) &&
    response.length > 0 &&
    (response[0] as Question).id !== undefined
  );
};

let questions: Question[];

const loadQuestions = async () => {
  if (questions) {
    return questions;
  }
  const JSON_BIN = "https://api.jsonbin.io/b/60156d6caafcad2f59619a94";
  const headers = {
    "secret-key": "$2b$10$b9bGJXhT8r1ztNrWys50..xr2yN1dVyjbT9.iiYTCtvcyYQHZ2gB6"
  };
  const response = await fetch(JSON_BIN, { headers });
  questions = (await response.json()) as Question[];

  if (isQuestionList(questions)) {
    return questions;
  }
};

type Question = {
  id: string;
  question: string;
  tooltip: string;
  inputType: string;
  values: string[];
  displayIf?: { [key: string]: string[] };
};

type FilteredDataType = [Question[], Map<string, boolean | string>];

const answersState = atom<Map<string, boolean | string>>({
  key: "answersState",
  default: new Map()
});

const questionsState = atom<Question[]>({
  key: "questionsState",
  default: selector({
    key: "defaultQuestions",
    get: async () => {
      const response = await loadQuestions();

      return response || [];
    }
  })
});

const formState = atom({
  key: "formState",
  default: selector({
    key: "defaultQuestion",
    get: ({ get }) => {
      const questions = get(questionsState);
      return {
        current: questions[0].id
      };
    }
  })
});

const filteredQuestionState = selector<FilteredDataType>({
  key: "filteredQuestionState",
  get: ({ get }) => {
    const answers = get(answersState);

    const loaded = get(questionsState);

    const questions = loaded.filter(({ id, displayIf }) => {
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
  questionsState,
  FilteredDataType,
  answersState,
  filteredQuestionState
};
