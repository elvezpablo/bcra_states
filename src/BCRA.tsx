import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { answersState } from "./Atoms";
import transform from "./transform";

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

  return <div>{`risk: ${result ? parseInt(result, 10) : 0}%`}</div>;
};

export default BCRA;
