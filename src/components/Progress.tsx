interface ProgressProps {
  numQuestion: number;
  points: number;
  answer: null | number;
}

export default function Progress({
  numQuestion,
  points,
  answer,
}: ProgressProps) {
  return (
    <header className="progress">
      <progress
        max={15}
        value={numQuestion + Number(answer !== null)}
      ></progress>
      <p>
        Questão <strong>{numQuestion + 1}</strong>/15
      </p>
      <p>
        <strong>{points}</strong>/280
      </p>
    </header>
  );
}
