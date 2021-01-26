import questions from "./questions.json";
import { atom } from "recoil";

// try https://github.com/pmndrs/jotai at some point
// React Generics
// https://www.youtube.com/watch?v=nViEqpgwxHE

const theQuestions = questions;

const formState = atom({
  key: "formState",
  default: {
    current: theQuestions[0].id
  }
});

const answersState = atom<Map<string, boolean | string>>({
  key: "answersState",
  default: new Map()
});

const questionsState = atom({
  key: "questionsState",
  default: theQuestions
});

export { formState, answersState, questionsState, theQuestions };
