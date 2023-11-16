interface ProgressProps {
  numQuestion: number;
  points: number;
  progress: number;
}

export default function Progress({
  numQuestion,
  points,
  progress,
}: ProgressProps) {
  return (
    <header className="progress">
      <progress max={15} value={progress}></progress>
      <p>
        Questão <strong>{numQuestion + 1}</strong>/15
      </p>
      <p>
        <strong>{points}</strong>/280
      </p>
    </header>
  );
}
