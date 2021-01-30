import "./styles.css";
import React from "react";
import { RecoilRoot } from "recoil";
import { Questions } from "./Questions";
import Progress from "./Progress";

export default function App() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Progress />
        <Questions />
      </React.Suspense>
    </RecoilRoot>
  );
}
