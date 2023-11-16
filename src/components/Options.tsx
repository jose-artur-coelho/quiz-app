import { AppAction } from "../App";
import { Dispatch } from "react";

interface OptionsProps {
  options: string[];
  dispatch: Dispatch<AppAction>;
  answer: null | number;
  correct: number;
}
export default function Options({
  options,
  dispatch,
  answer,
  correct,
}: OptionsProps) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {options.map((quest, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered ? (index === correct ? "correct" : "wrong") : ""
          }`}
          key={quest}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payLoad: index })}
        >
          {quest}
        </button>
      ))}
    </div>
  );
}
