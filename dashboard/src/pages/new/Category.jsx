import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";

const Category = ({ title }) => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");

  const formik = useFormik({
    initialValues:{
      category_name : ''
    },
    onSubmit : values=>{
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);
      axios.post('http://localhost:5000/uploadfile',formData,{   
        headers: { "Content-Type": "multipart/form-data" } 
      }).then((res,err)=>{
        console.log(res);
        axios.post('http://localhost:5000/addCategory',
        {
          name:values.category_name,
          img_url:`http://localhost:5000/images/${fileName}`
        }
        ).then((res,err)=>{
          console.log(res);
        })
      })
    }
  });

  
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={formik.handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  name="img_url"
                  type="file"
                  id="file"
                  onChange={(e) => {setFile(e.target.files[0]); setFileName(e.target.files[0].name)}}
                  style={{ display: "none" }}
                />
              </div>

                <div className="formInput">
                  <label>Category name</label>
                  <input 
                    type='text' 
                    placeholder='Mobile Phones'
                    name="category_name"
                    onChange={formik.handleChange}
                    value={formik.values.category_name}
                    />
                </div>
              <button>Add Category</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;