import { useEffect, useState } from "react";

const formatTime = (timeInMilliseconds: number) => {
  const timeInSeconds = Math.floor(timeInMilliseconds / 1000);
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

const Timer = ({
  timeInMilliseconds,
  onTimeUp,
}: {
  timeInMilliseconds: number;
  onTimeUp: () => void;
}) => {
  const [timer, setTimer] = useState(timeInMilliseconds);

  useEffect(() => {
    if (timer <= 0) {
      onTimeUp();
      return;
    }

    const timeoutId = setTimeout(() => {
      setTimer((prev) => (prev > 0 ? prev - 1000 : 0));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [timer, onTimeUp]);

  return (
    <h2 className={timer <= 120000 ? "text-red-500" : "text-green-500"}>
      Timer: {formatTime(timer)}
    </h2>
  );
};

export default Timer;
