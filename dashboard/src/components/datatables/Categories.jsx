import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

const Categories = () => {

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
      field: "name",
      headerName: "Category Name",
      width: 230
    }
  ];

  const [ categories , setCategories] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/categories').then((res,err)=>{
      if(res){
        setCategories(res.data)
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
            <Link to={`/categories/${params.row.id}`} style={{ textDecoration: "none" }}>
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
        Categories
        <Link to="/categories/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={categories}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Categories;