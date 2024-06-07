"use client";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

type Data<T> = T;
interface Props {
  rows: Data<Rows>[];
  columns: GridColDef[];
  title?: string;
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

const DataTable = ({ rows, columns, title }: Props) => {
  let updatedTableColumns = [...columns];
  /*  if (user?.isAdmin) {
    let action = deleteProduct;
    let path = "products";
    updatedTableColumns.push({
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      width: 170,
      renderCell: (params: GridRenderCellParams) => {
        if (params.row.email) {
          action = deleteUser;
          path = "users";
        } else if (params.row.invoice) {
          action = deleteTransaction;
          path = "transactions";
        }
        return (
          <span className="flex justify-between gap-4">
            <Link href={`/${path}/${params.id}`}>
              <button className="bg-green-500 px-3 py-1 rounded-md">
                View
              </button>
            </Link>

            <form action={action}>
              <input type="hidden" value={params.id} name="id" />
              <button className="bg-red-500 px-3 py-1 rounded-md" type="submit">
                Delete
              </button>
            </form>
          </span>
        );
      },
    });
  } */
/*   updatedTableColumns.forEach((column) => {
    if (column.field === "createdAt") {
      column.renderCell = (params: GridRenderCellParams) => {
        const date = new Date(params.row.createdAt).toDateString();
        if (date === "Invalid Date") return "Unknown Date";
        return <span>{new Date(params.row.createdAt).toDateString()}</span>;
      };
    }
    if (column.field === "isAdmin") {
      column.renderCell = (params: GridRenderCellParams) => {
        return <span>{params.row.isAdmin ? "Administrator" : "User"}</span>;
      };
    }
    if (column.field === "isActive") {
      column.renderCell = (params: GridRenderCellParams) => {
        return <span>{params.row.isActive ? "Active" : "Inactive"}</span>;
      };
    }
  }); */

  return (
    <>
      <h1 className="p-2 text-lg font-bold">{title}</h1>
      <Box
        sx={{ height: 500, width: "100%" }}
        className="bg-softBg overflow-y-scroll"
      >
        <DataGrid
          getRowId={(row) => row._id}
          sx={{
            color: "var(--textSoft)",
            ".MuiTablePagination-displayedRows": { color: "var(--text)" },
            ".MuiTablePagination-actions": { color: "var(--text)" },
            ".MuiDataGrid-columnHeaders": {
              backgroundColor: "var(--mainBg)",
              fontSize: "16px",
              fontWeight: "900",
              color: "rgb(183, 186, 193)",
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
          //pageSizeOptions={[10]}
        />
      </Box>
    </>
  );
};

export default DataTable;
