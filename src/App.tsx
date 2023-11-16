/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useReducer, Dispatch } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Button from "./components/Button";
import FinalScreen from "./components/FinalScreen";
import Progress from "./components/Progress";

export interface QuestionObject {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

interface AppState {
  questions: QuestionObject[];
  status: string;
  index: number;
  answer: null | number;
  points: number;
  highscore: number;
  progress: number;
}

interface DataReceivedAction {
  type: string;
  payLoad?: any;
}

export type AppAction = DataReceivedAction;

const initialState: AppState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  progress: 0,
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payLoad, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payLoad,
        points:
          action.payLoad === question.correctOption
            ? state.points + question.points
            : state.points,
        progress: state.progress + 1,
      };
    case "nextQuestion":
      return {
        ...state,

        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "inactive",
        answer: null,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...state, status: "ready", points: 0, index: 0 };
    default:
      return state;
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, progress },
    dispatch,
  ]: [AppState, Dispatch<AppAction>] = useReducer(reducer, initialState);

  const hasFinished = questions.length - 1 === index;
  const numQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payLoad: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress numQuestion={index} points={points} progress={progress} />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
          </>
        )}
        {answer !== null && (
          <Button
            dispatch={dispatch}
            content={hasFinished ? "Finalizar" : "Próxima"}
            type={hasFinished ? "finished" : "nextQuestion"}
          />
        )}
        {status == "inactive" && (
          <FinalScreen
            points={points}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
