import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;

const Radio = ({
  value,
  setAnswer,
  disabled
}: {
  value: string | boolean | undefined;
  setAnswer: (value: string) => {} | void;
  disabled: boolean;
}) => {
  return (
    <Container>
      <input
        type="text"
        disabled={disabled}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
      />
    </Container>
  );
};

export default Radio;
