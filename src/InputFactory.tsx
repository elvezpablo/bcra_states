import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  answersState,
  formState,
  questionsState,
  theQuestions
} from "./state/Atoms";
import Radio from "./inputs/Radio";
import Select from "./inputs/Select";
import Input from "./inputs/Input";

const Container = styled.div`
  text-align: center;
`;

const InputFactory = ({
  id,
  type,
  values
}: {
  id: string;
  type: string;
  values: string[] | undefined;
}) => {
  const [answers, setAnswersState] = useRecoilState(answersState);
  const [, setQuestionsState] = useRecoilState(questionsState);
  const { current } = useRecoilValue(formState);

  const setAnswer = (value: string | undefined) => {
    const newMap = new Map(answers);
    if (value) {
      newMap.set(id, value);
      /**
       * Uses the original set of questions as a base. Tried reset and it didn't work.
       *
       * filters out the questions with conditions that do not match the
       * desplayIf criteria
       */
      const newQuestions = theQuestions.filter(({ id, displayIf }) => {
        if (displayIf) {
          return (
            Object.keys(displayIf).filter((k) => {
              const questionHasMatchingAnswer = (displayIf as any)[k].includes(
                newMap.get(k)
              );
              if (!questionHasMatchingAnswer) {
                newMap.delete(id);
              }
              return questionHasMatchingAnswer;
            }).length > 0
          );
        }
        return true;
      });
      setQuestionsState(newQuestions);
    }

    setAnswersState(newMap);
  };

  if (type === "radio") {
    return (
      <Radio
        value={answers.get(id)}
        disabled={current !== id}
        values={values}
        setAnswer={setAnswer}
      />
    );
  }
  if (type === "dropdown") {
    return (
      <Select
        value={answers.get(id)}
        disabled={current !== id}
        values={values}
        setAnswer={setAnswer}
      />
    );
  }
  if (type === "input") {
    return (
      <Input
        value={answers.get(id)}
        disabled={current !== id}
        setAnswer={setAnswer}
      />
    );
  }

  return (
    <Container>
      <button
        disabled={current !== id}
        onClick={() => {
          setAnswer("true");
        }}
      >
        {answers.has(id) ? "set" : "not set"}
      </button>
    </Container>
  );
};

export default InputFactory;
