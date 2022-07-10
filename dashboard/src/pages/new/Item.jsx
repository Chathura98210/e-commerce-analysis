import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import { useState,useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Item = ({ title }) => {

  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");

  const [ categories , setCategories] = useState([]);
  const [ subCategories , setSubCategories] = useState([]);

  const [ category , setCategory] = useState(0);
  const [ subCategory , setSubCategory] = useState(0);
  const [ isFeatured , setIsFeatured] = useState(false);

  const [ isUploading , setIsUploading] = useState(false);

  const handleCatChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubCatChange = (e) => {
    setSubCategory(e.target.value);
  };

  const handleisFeatured = (e) => {
    setIsFeatured(true);
  };
  


  useEffect(()=>{
    axios.get('http://localhost:5000/categories').then((res,err)=>{
      if(res){
        setCategories(res.data);
        console.log(res.data);
      }
    });
    axios.get('http://localhost:5000/subcategories').then((res,err)=>{
      if(res){
        setSubCategories(res.data);
        console.log(res.data);
      }
    });
  },[]);

  const formik = useFormik({
    initialValues:{
      name : '',
      price:'',  
      description:'',    
      stock:''
    },
    onSubmit : values=>{
      if(!isUploading){
        setIsUploading(true)
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        axios.post('http://localhost:5000/uploadfile',formData,{   
          headers: { "Content-Type": "multipart/form-data" } 
        }).then((res,err)=>{
          setIsUploading(false)
          if(err){
            toast.error('Something went wrong!')
          }else{
            console.log(res);
            axios.post('http://localhost:5000/addItem',
            {
              name:values.name, 
              price:values.price,  
              description:values.description,  
              catId:category, 
              subCatId:subCategory, 
              imgUrl:`http://localhost:5000/images/${fileName}`, 
              stock:values.stock,
              isFeatured : (isFeatured ? 1 : 0)
            }
            ).then((res,err)=>{
              console.log(res);
              setIsUploading(false)
              toast.success('Item data saved!');
              window.location.reload();
            })
          }
          
        })
      }else{
        toast.warn('data uploading...')
      }
    }
  });

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <ToastContainer/>
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "http://localhost:5000/images/empty.jpg"
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
                  type="file"
                  id="file"
                  onChange={(e) => {setFile(e.target.files[0]);setFileName(e.target.files[0].name)}}
                  style={{ display: "none" }}
                />
              </div>
                <div className="formInput">
                  <label>Name</label>
                  <input 
                    type='text' 
                    name='name'
                    onChange={formik.handleChange}
                    value={formik.values.name} 
                  />
                </div>
                <div className="formInput">
                  <label>Price</label>
                  <input 
                    type='text' 
                    name='price'
                    onChange={formik.handleChange}
                    value={formik.values.price} 
                  />
                </div>
                <div className="formInput">
                  <label>Description</label>
                  <input 
                    type='text' 
                    name='description'
                    onChange={formik.handleChange}
                    value={formik.values.description} 
                  />
                </div>
                <div className="formInput">
                  <label>Stock</label>
                  <input 
                    type='text' 
                    name='stock'
                    onChange={formik.handleChange}
                    value={formik.values.stock} 
                  />
                </div>
                <div className="formInput">
              
                  <label>Is this a Featured Item ?</label>
                  <Toggle
                    id='cheese-status'
                    defaultChecked={isFeatured}
                    onChange={handleisFeatured} />
                </div>
                <div className="formInput">
                <label>Category</label>
                  <select name="category_name" id="category_name" value={category} onChange={handleCatChange}>
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
                  <label>Sub Category</label>
                  <select name="sub_category_name" id="sub_category_name" value={subCategory} onChange={handleSubCatChange}>
                  <option value=''>Select Sub Category</option>
                    {
                      subCategories.map((val)=>{
                        return(
                          <option value={val.id}>{val.name}</option>
                        );
                      })
                    }
                  </select>
                </div>
              <button disabled={isUploading}>Add Item</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;