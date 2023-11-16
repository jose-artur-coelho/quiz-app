/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "react";
import { AppAction } from "../App";
import Button from "./Button";

interface StartScreenProps {
  numQuestions: number;
  dispatch: Dispatch<AppAction>;
}

export default function StartScreen({
  numQuestions,
  dispatch,
}: StartScreenProps) {
  return (
    <div className="start">
      <h2>Esse é o QUIZ DO REACT!</h2>
      <h3>{numQuestions} questões para testar seu conhecimento.</h3>
      <Button dispatch={dispatch} content="Começar" type="start" />
    </div>
  );
}
