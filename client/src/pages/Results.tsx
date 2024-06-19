import React from "react";
import { AiOutlineLineChart } from "react-icons/ai";
import { AiOutlineBarChart } from "react-icons/ai";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";

import DataTable from "../components/Table";
import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";
import { scoreColumns as cols } from "../utils/columns";
import { useGetScores } from "../hooks/useScores";
import ScoreSummary from "../components/ScoreSummary";

import { useGetMark } from "../hooks/useMarks";
import ScoreBreakdownModal from "../components/ScoreBreakdownModal";

interface ModalData {
  category: string;
  score: number;
  questionCount: number;
}

interface TableRow {
  row: {
    marksId: string;
    score: number;
    questionsCount: number;
    category: string;
  };
}

const Results = () => {
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const [chartType, setChartType] = React.useState("bar");
  const [open, setOpen] = React.useState(false);
  const [markId, setMarkId] = React.useState("");
  const quizData = React.useRef<ModalData>({
    score: 0,
    questionCount: 0,
    category: "",
  });

  const { data: { results: scores } = { results: [] }, isFetching } =
    useGetScores(userId);
  const { data: quizMarks, isFetching: isFetchingMarks } = useGetMark(markId);

  const handleOpen = (
    markId: string,
    score: number,
    questionCount: number,
    category: string
  ) => {
    setMarkId(markId);
    setOpen(true);
    quizData.current = { score, questionCount, category };
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    minWidth: 120,
    renderCell: (params: TableRow) => {
      return (
        <a
          href="#"
          className="underline text-blue-400"
          onClick={() =>
            handleOpen(
              params.row.marksId,
              params.row.score,
              params.row.questionsCount,
              params.row.category
            )
          }
        >
          View
        </a>
      );
    },
  };

  const handleChangeChart = React.useCallback(() => {
    setChartType((prev) => (prev === "line" ? "bar" : "line"));
  }, [chartType, setChartType]);

  const handleClose = () => setOpen(false);

  const columns = React.useMemo(() => {
    return [...cols, actionColumn];
  }, []);
  console.log({ quizMarks });
  return (
    <div className="space-y-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ScoreSummary scores={scores} isFetching={isFetching} />
        <div className="rounded-lg bg-[#37373e] flex flex-col items-end relative lg:col-span-2 h-[350px]">
          <div className="flex justify-between items-center mt-0 border-t border-[#242528]">
            <div
              className={`${
                chartType === "bar" ? "bg-[#242528]" : ""
              }  px-3 py-1`}
            >
              <button
                onClick={handleChangeChart}
                disabled={chartType === "bar"}
              >
                <AiOutlineBarChart size={20} className="" />
              </button>
            </div>
            <div
              className={`${
                chartType === "line" ? "bg-[#242528]" : ""
              }  px-3 py-1`}
            >
              {" "}
              <button
                onClick={handleChangeChart}
                disabled={chartType === "line"}
              >
                <AiOutlineLineChart size={20} />{" "}
              </button>
            </div>
          </div>

          {scores.length === 0 ? (
            <h3 className="absolute top-[50%] left-[40%] text-center text-white">
              No Graphs to Show
            </h3>
          ) : chartType === "bar" ? (
            <BarChart />
          ) : (
            <LineChart />
          )}
        </div>
      </div>

      <div className="bg-[#37373e]">
        <DataTable rows={scores || []} columns={columns} />
      </div>
      <ScoreBreakdownModal
        isFetching={isFetchingMarks}
        open={open}
        handleClose={handleClose}
        marks={quizMarks}
        quizData={{
          score: quizData.current.score,
          category: quizData.current.category,
          questionCount: quizData.current.questionCount,
        }}
      />
    </div>
  );
};

export default Results;
