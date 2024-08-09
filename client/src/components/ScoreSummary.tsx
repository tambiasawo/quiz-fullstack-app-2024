import React from "react";
import dateFormatter from "../utils/dateFormatter";
import { Scores } from "../hooks/useScores";
import { Tooltip } from "@mui/material";

type ReducedAccParamType = {
  percentValue: number;
  category?: string;
  createdAt?: string;
};

const ScoreSummary = ({
  scores,
}: {
  scores: Scores[];
  isFetching: boolean;
}) => {
  const [scoreType, setScoreType] = React.useState("recent");

  const bestScore = scores?.slice()?.reduce(
    (acc: ReducedAccParamType, curr) => {
      const { score, questionsCount, category, createdAt } = curr;
      const percentValue = (score / questionsCount) * 100;
      if (
        typeof acc["percentValue"] === "number" &&
        percentValue > acc["percentValue"]
      ) {
        acc = { percentValue, category, createdAt };
      }
      return acc;
    },
    { percentValue: 0 }
  );

  const worstScore = scores?.slice()?.reduce(
    (acc: ReducedAccParamType, curr) => {
      const { score, questionsCount, category, createdAt } = curr;
      const percentValue = (score / questionsCount) * 100;
      if (
        typeof acc["percentValue"] === "number" &&
        percentValue < acc["percentValue"]
      ) {
        acc = { percentValue, category, createdAt };
      }
      return acc;
    },
    { percentValue: 100 }
  );

  const averageScore = scores?.slice()?.reduce((acc: number, curr: Scores) => {
    const { score, questionsCount } = curr;
    const percentValue = (score / questionsCount) * 100;
    return acc + percentValue;
  }, 0);

  const recentScore =
    {
      percentValue: (scores[0]?.score / scores[0]?.questionsCount) * 100,
      category: scores[0]?.category,
      createdAt: scores[0]?.createdAt,
    } || "--";

  const displayScore =
    scoreType === "average"
      ? {
          value: Math.floor(averageScore / scores.length),
          category: "All",
          date: "From Date",
        }
      : scoreType === "recent"
      ? {
          value: recentScore?.percentValue,
          category: recentScore?.category,
          date: dateFormatter(recentScore?.createdAt),
        }
      : scoreType === "best"
      ? {
          value: bestScore.percentValue,
          category: bestScore.category || "--",
          date: dateFormatter(bestScore.createdAt as string) || "--",
        }
      : {
          value: worstScore.percentValue,
          category: worstScore.category || "--",
          date: dateFormatter(worstScore.createdAt as string) || "--",
        };

  /*   if (isFetching) {
    return (
      <Skeleton
        variant="rounded"
        width={272}
        height={290}
        animation="wave"
        className="mx-auto"
      />
    );
  } */
  return (
    <div className="main-box bg-[#a6abff]  gap-[30px]">
      <div className="flex gap-2 items-center">
        <select
          name="score_type"
          value={scoreType}
          onChange={(e) => {
            setScoreType(e.target.value);
          }}
          className="py-1 text-sm rounded-md outline-none text-black"
          disabled={scores.length === 0}
        >
          <option value="recent">Most Recent</option>
          <option value="best">Highest</option>
          <option value="average">Average</option>
          <option value="worst">Lowest</option>
        </select>
      </div>
      <div className="max-w-lg mx-auto flex flex-col gap-1 items-center">
        <div className="bg-[#fe9d73] w-[190px] h-[190px] md:w-[140px] md:h-[140px] lg:w-[190px] lg:h-[190px] rounded-full flex justify-center items-center p-3">
          {displayScore.value >= 0 ? (
            <h1 className="text-black text-6xl text-center ">
              {Math.floor(displayScore.value) + "%"}
            </h1>
          ) : (
            <Tooltip title="No Quiz Taken yet. Take a Quiz Now" placement="top">
              <p className="text-6xl text-black cursor-default">-- </p>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-0 w-full text-black">
        {displayScore.category && displayScore.date && (
          <>
            <h6 className="text-black">{displayScore.category}</h6>
            <h6 className="text-black">{displayScore.date}</h6>
          </>
        )}
      </div>
    </div>
  );
};

export default ScoreSummary;
