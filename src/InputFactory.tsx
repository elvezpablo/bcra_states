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
  const { current } = useRecoilValue(formState);

  const setAnswer = (value: string | undefined) => {
    const newMap = new Map(answers);
    if (value) {
      newMap.set(id, value);
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

  return <Container>{`No input of type ${type}`}</Container>;
};

export default InputFactory;
