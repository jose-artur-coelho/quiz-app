import { QuestionObject } from "../App";
import Options from "./Options";
import { AppAction } from "../App";
import { Dispatch } from "react";

interface QuestionProps {
  question: QuestionObject;
  dispatch: Dispatch<AppAction>;
  answer: null | number;
}

export default function Question({
  question,
  dispatch,
  answer,
}: QuestionProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        options={question.options}
        dispatch={dispatch}
        answer={answer}
        correct={question.correctOption}
      />
    </div>
  );
}
