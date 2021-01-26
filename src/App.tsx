import "./styles.css";
import { RecoilRoot } from "recoil";
import { Questions } from "./Questions";
import Progress from "./Progress";

export default function App() {
  return (
    <RecoilRoot>
      <Progress />
      <Questions />
    </RecoilRoot>
  );
}
