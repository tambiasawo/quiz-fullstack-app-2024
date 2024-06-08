import { GridColDef } from "@mui/x-data-grid";
import dateFormatter from "./dateFormatter";

export const scoreColumns: GridColDef[] = [
  {
    field: "createdAt",
    headerName: "Date",
    minWidth: 200,
    valueFormatter(params) {
      return dateFormatter(params.value);
    },
  },
  { field: "category", headerName: "Category", minWidth: 200 },
  { field: "type", headerName: "Type", minWidth: 120 },
  { field: "score", headerName: "Score", minWidth: 120 },
  {
    field: "questionsCount",
    align: "center",
    headerName: "Total Questions",
    minWidth: 190,
  },
  {
    field: "percentage",
    headerName: "Percentage (%)",
    minWidth: 170,
    align: "center",
    valueGetter: (params) =>
      (params.row.score / params.row.questionsCount) * 100,
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 120,
    valueGetter: (params) => {
      const percentage = params.row.score / params.row.questionsCount;
      return percentage > 0.5 ? "Passed" : "Failed";
    },
  },
];

export const LeaderboardColumns: GridColDef[] = [
  { field: "name", headerName: "Name", minWidth: 200 },
  { field: "category", headerName: "Category", minWidth: 200 },
  { field: "score", headerName: "Score", minWidth: 120 },
];
