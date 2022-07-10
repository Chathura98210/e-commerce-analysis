import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

const SubCats = () => {
  const userColumns = [
    { 
      field: "id", 
      headerName: "ID", 
      width: 70 
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
      field: "catName",
      headerName: "Category Name",
      width: 230
    },
    {
      field: "name",
      headerName: "Sub Category Name",
      width: 230
    }
  ];

  const [ subcategories , setSubCategories] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/subcategories').then((res,err)=>{
      if(res){
        setSubCategories(res.data)
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
            <Link to={`/subcategories/${params.row.id}`} style={{ textDecoration: "none" }}>
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
        Sub Categories
        <Link to="/subcategories/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={subcategories}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default SubCats;