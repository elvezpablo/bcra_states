import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  display: block;
  margin: 2px auto;
  > span {
    border-bottom: 1px solid #ccc;
  }
`;

const Radio = ({
  value,
  values,
  setAnswer,
  disabled
}: {
  value: string | boolean | undefined;
  values: string[] | undefined;
  setAnswer: (value: string) => {} | void;
  disabled: boolean;
}) => {
  return (
    <Container>
      {values &&
        values.map((v) => (
          <span key={`radio_${v}`}>
            <input
              type="radio"
              disabled={disabled}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              checked={value === v}
              value={v}
            />
            <label>{v}</label>
          </span>
        ))}
    </Container>
  );
};

export default Radio;
