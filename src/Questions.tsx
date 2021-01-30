import styled from "styled-components";
import { useRecoilValue } from "recoil";
import {
  filteredQuestionState,
  formState,
  FilteredDataType
} from "./state/Atoms";
import Question from "./Question";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 0 auto;
`;

const ScrollContainer = styled.div`
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
`;

export const Questions = () => {
  // const questions = useRecoilValue(questionsState);
  const [questions] = useRecoilValue<FilteredDataType>(filteredQuestionState);
  const { current } = useRecoilValue(formState);
  return (
    <ScrollContainer>
      <Container>
        {questions.map((q) => {
          return (
            <Question
              key={q.id}
              question={q.question}
              id={q.id}
              current={current}
              tooltip={q.tooltip}
              values={q.values}
              inputType={q.inputType}
            />
          );
        })}
      </Container>
    </ScrollContainer>
  );
};
