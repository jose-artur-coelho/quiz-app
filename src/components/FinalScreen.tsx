import { Dispatch } from "react";
import { AppAction } from "../App";
import Button from "./Button";

interface FinalScreenProps {
  points: number;
  highscore: number;
  dispatch: Dispatch<AppAction>;
}
const MAX_POINTS = 280;

export default function FinalScreen({
  points,
  highscore,
  dispatch,
}: FinalScreenProps) {
  const percentage = ((points / MAX_POINTS) * 100).toFixed(0);

  return (
    <>
      <p className="result">
        <span>🥇</span> fez <strong>{points}</strong> pontos de um máximo de{" "}
        {MAX_POINTS} {`(${percentage}%)`}
      </p>
      <p className="highscore">Melhor pontuação: {highscore} pontos</p>
      <Button dispatch={dispatch} content="Reiniciar quiz" type="restart" />
    </>
  );
}
