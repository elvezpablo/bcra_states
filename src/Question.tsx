import React from "react";
import styled from "styled-components";
import InputFactory from "./InputFactory";
import Navigation from "./Navigation";
import { useRecoilValue } from "recoil";
import { formState } from "./Atoms";

const Container = styled.div`
  border: 1px solid rgba(33, 33, 33, 0.4);
  margin-bottom: 8px;
  padding: 4px;
  background-color: ${(props: { current: boolean }) =>
    props.current ? "rgba(120,120,120,.3)" : "white"};
  position: relative;
`;

const Heading = styled.h2`
  font-size: 14px;
  text-align: center;
  margin-top: 18px;
  margin-bottom: 8px;
`;

const ConditionalQuestion = styled(Container)`
  border-left: 12px solid rgba(33, 33, 33, 0.4);
`;

const Id = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(33, 33, 33, 0.5);
  font-size: 12px;
  color: white;
  padding: 2px 6px;
`;

type QuestionProps = {
  id: string;
  question: string;
  tooltip: string | null;
  inputType: string;
  values: string[] | undefined;
};

const Question = ({ question, id, values, inputType }: QuestionProps) => {
  const form = useRecoilValue(formState);

  return (
    <>
      <Container current={form.current === id}>
        <Id>{id}</Id>
        <Heading>{question}</Heading>
        <InputFactory id={id} type={inputType} values={values} />
        <Navigation id={id} />
      </Container>
    </>
  );
};

export default Question;
