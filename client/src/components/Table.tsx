"use client";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Data<T> = T;
interface Props {
  rows: Data<Rows>[];
  columns: GridColDef[];
  title?: string;
  isLoading?: boolean;
}
export interface Rows {
  id: number;
  lastName: string;
  firstName: string;
  age: number;
  username: string;
  email: string;
  gender: string;
  lastlogin: Date;
}

const DataTable = ({ rows, columns,isLoading }: Props) => {
  let updatedTableColumns = [...columns];

  return (
    <Box>
      <DataGrid
        getRowId={(row) => row._id}
        sx={{
          color: "white",
          ".MuiTablePagination-displayedRows": { color: "white" },
          ".MuiTablePagination-actions": { color: "white" },
          ".MuiDataGrid-columnHeaders": {
            backgroundColor: "#a6abff",
            fontSize: "16px",
            fontWeight: "900",
            color: "#000",
          },
        }}
        rows={rows}
        columns={updatedTableColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        loading={isLoading}
        //pageSizeOptions={[10]}
      />
    </Box>
  );
};

export default DataTable;
