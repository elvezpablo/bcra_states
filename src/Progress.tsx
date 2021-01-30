import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { filteredQuestionState, FilteredDataType } from "./state/Atoms";
import BCRA from "./BCRA";

const Container = styled.div`
  display: float;
  justify-content: space-between;
`;

const Counter = styled.div`
  border-bottom: 1px solid #333;
`;

const Progress = () => {
  const [questions, answers] = useRecoilValue<FilteredDataType>(
    filteredQuestionState
  );

  return (
    <Container>
      <Counter>
        {answers.size} of {questions.length}
      </Counter>
      {answers.size === questions.length && <BCRA />}
    </Container>
  );
};

export default Progress;
