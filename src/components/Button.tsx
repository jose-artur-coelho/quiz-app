import { Dispatch } from "react";
import { AppAction } from "../App";
interface ButtonProps {
  dispatch: Dispatch<AppAction>;
  type: string;
  content: string;
}

export default function Button({ dispatch, type, content }: ButtonProps) {
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: `${type}` })}
    >
      {content}
    </button>
  );
}
