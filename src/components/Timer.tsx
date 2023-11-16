import { Dispatch, useEffect } from "react";
import { AppAction } from "../App";

interface TimerProps {
  dispatch: Dispatch<AppAction>;
  seconds: number;
}

export default function Timer({ dispatch, seconds }: TimerProps) {
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;

  return <div className="timer">{formattedTime}</div>;
}
