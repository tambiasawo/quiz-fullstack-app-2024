import React from "react";
import BarChart from "../components/charts/BarChart";
import { AiOutlineLineChart } from "react-icons/ai";
import { AiOutlineBarChart } from "react-icons/ai";

import LineChart from "../components/charts/LineChart";
import DataTable from "../components/Table";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { scoreColumns as cols } from "../utils/columns";
import { useGetScores } from "../hooks/useScores";
import ScoreSummary from "../components/ScoreSummary";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  //border: "2px solid #000",
  //boxShadow: 24,
  p: 4,
};

const Results = () => {
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const [chartType, setChartType] = React.useState("bar");
  const [open, setOpen] = React.useState(false);

  const { data: { results: scores } = { results: [] }, isFetching } =
    useGetScores(userId);

  const actionColumn = {
    field: "action",
    headerName: "Action",
    minWidth: 120,
    renderCell: () => {
      return (
        <a
          href="#"
          className="underline text-blue-400"
          onClick={() => setOpen(true)}
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style}}>
          <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </Box>
      </Modal>
    </div>
  );
};

export default Results;
