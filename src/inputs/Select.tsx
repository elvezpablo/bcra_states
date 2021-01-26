import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
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
      <select
        disabled={disabled}
        defaultValue={typeof value !== "string" ? value + "" : value}
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
      >
        <option key="no_option" value="">{`select...`}</option>
        {values && values.map((v) => <option key={v}>{v}</option>)}
      </select>
    </Container>
  );
};

export default Radio;
