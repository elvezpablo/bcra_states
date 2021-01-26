import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { answersState } from "./state/Atoms";
import transform from "./transform";

const Container = styled.div`
  display: inline-block;
  border: 3px solid red;
  border-radius: 3px;
`;

const request = axios.create({
  baseURL: "https://limitless-eyrie-26993.herokuapp.com"
});

const BCRA = () => {
  const answers = useRecoilValue(answersState);
  const [result, setResult] = useState<string | undefined>("0");

  useEffect(() => {
    async function fetchData() {
      const transformed = transform(Object.fromEntries(answers));
      const riskResults = await request.post<any, any>(
        "/risk.summary",
        JSON.stringify(transformed)
      );
      const AbsRisk = riskResults?.data[0].AbsRisk;
      setResult(AbsRisk);
    }
    fetchData();
  }, [answers]);

  return <Container>{`risk: ${result ? parseInt(result, 10) : 0}%`}</Container>;
};

export default BCRA;
