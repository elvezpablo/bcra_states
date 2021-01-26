import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { answersState, questionsState } from "./Atoms";
import BCRA from "./BCRA";

const Progress = () => {
  const answers = useRecoilValue(answersState);
  const questions = useRecoilValue(questionsState);
  return (
    <>
      <div>
        {answers.size} of {questions.length}
      </div>
      {answers.size === questions.length && <BCRA />}
    </>
  );
};

export default Progress;
