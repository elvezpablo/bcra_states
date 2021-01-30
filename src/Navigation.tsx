import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { formState, filteredQuestionState } from "./state/Atoms";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button``;

const Navigation = ({ id }: { id: string }) => {
  const [{ current }, setFormState] = useRecoilState(formState);
  const [questions, answers] = useRecoilValue(filteredQuestionState);

  const previousDisabled = () => {
    if (current !== id) {
      return true;
    }
    if (current === questions[0].id) {
      return true;
    }
    return false;
  };

  const setPrevious = () => {
    const currentIndex = Math.max(
      questions.findIndex(({ id }) => id === current),
      0
    );
    setFormState({ current: questions[currentIndex - 1].id });
  };

  const nextDisabled = () => {
    // disable if we are not on the current question
    if (current !== id) {
      return true;
    }
    //
    if (!answers.has(id)) {
      return true;
    }
    // if it's the last one disable next
    if (current === questions[questions.length - 1].id) {
      return true;
    }
    return false;
  };

  const setNext = () => {
    const currentIndex = Math.min(
      questions.findIndex(({ id }) => id === current),
      questions.length - 1
    );
    setFormState({ current: questions[currentIndex + 1].id });
  };

  return (
    <Container>
      <Button
        disabled={previousDisabled()}
        onClick={() => {
          setPrevious();
        }}
      >
        {"<"}
      </Button>
      <Button
        onClick={() => {
          setNext();
        }}
        disabled={nextDisabled()}
      >
        {">"}
      </Button>
    </Container>
  );
};

export default Navigation;
