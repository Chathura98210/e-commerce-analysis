import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";

const Customers = () => {

  const userColumns = [
    { 
      field: "id", 
      headerName: "ID", 
      width: 70 
    },
    {
      field: "UserName",
      headerName: "User Name",
      width: 230
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    }
  ];
  const [data, setData] = useState(userRows);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Customers;