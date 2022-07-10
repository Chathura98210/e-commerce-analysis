import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState,useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";

const SubCategory = ({ title }) => {

  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [ categories , setCategories] = useState([]);
  const [ category , setCategory] = useState(0);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(()=>{
    axios.get('http://localhost:5000/categories').then((res,err)=>{
      if(res){
        setCategories(res.data);
        console.log(res.data);
      }
    })
  },[]) 

  const formik = useFormik({
    initialValues:{
      category_name : '',
      sub_category_name: ''
    },
    onSubmit : values=>{
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);
      axios.post('http://localhost:5000/uploadfile',formData,{   
        headers: { "Content-Type": "multipart/form-data" } 
      }).then((res,err)=>{
        console.log(res);
        axios.post('http://localhost:5000/addSubCategory',
        {
          catid:category,
          name:values.sub_category_name,
          imgUrl:`http://localhost:5000/images/${fileName}`
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
                  <label>Category</label>
                  <select name="category_name" id="category_name" value={category} onChange={handleChange}>
                  <option value=''>Select Category</option>
                    {
                      categories.map((val)=>{
                        return(
                          <option value={val.id}>{val.name}</option>
                        );
                      })
                    }
                  </select>
              </div>
              <div className="formInput">
                <label>Sub Category Name</label>
                <input 
                  type='text' 
                  placeholder='Mobile Phones'
                  name="sub_category_name"
                  onChange={formik.handleChange}
                  value={formik.values.sub_category_name} 
                />
              </div>
              <button>Add SubCategory</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategory;