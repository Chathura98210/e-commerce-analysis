import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

const Items = () => {
  const userColumns = [
    { 
      field: "id", 
      headerName: "ID", 
      width: 50 
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.imgUrl} alt="avatar" />
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Item Name",
      width: 200
    },
    { 
      field: "description", 
      headerName: "Description", 
      width: 200 
    },
    { 
      field: "category", 
      headerName: "Category", 
      width: 100 
    },
    {
      field: "subCategory",
      headerName: "Sub Category",
      width: 150
    },
    {
      field: "price",
      headerName: "Price",
      width: 150
    }
  ];

  const [ items , setItems] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/items').then((res,err)=>{
      if(res){
        setItems(res.data)
        console.log(res.data);
      }
    })
  },[]) 

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Items
        <Link to="/items/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={items}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Items;