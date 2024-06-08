import React from "react";
import BarChart from "../components/charts/BarChart";
import { AiOutlineLineChart } from "react-icons/ai";
import { AiOutlineBarChart } from "react-icons/ai";

import LineChart from "../components/charts/LineChart";
import DataTable from "../components/Table";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { scoreColumns as cols } from "../utils/columns";
import { useGetScores } from "../hooks/useSaveScore";
import ScoreSummary from "../components/ScoreSummary";

const actionColumn = {
  field: "action",
  headerName: "Action",
  minWidth: 120,
  renderCell: () => {
    return (
      <a href="#" className="underline">
        View
      </a>
    );
  },
};

const Results = () => {
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const [chartType, setChartType] = React.useState("bar");

  const { data: { results: scores } = { results: [] }, isFetching } =
    useGetScores(userId);

  const columns = React.useMemo(() => {
    return [...cols, actionColumn];
  }, []);

  const handleChangeChart = React.useCallback(() => {
    setChartType((prev) => (prev === "line" ? "bar" : "line"));
  }, [chartType, setChartType]);

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

          {chartType === "bar" ? <BarChart /> : <LineChart />}
        </div>
      </div>

      <div className="bg-[#37373e]">
        <DataTable rows={scores || []} columns={columns} />
      </div>
    </div>
  );
};

export default Results;
