import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/SubCategories";
import { useParams } from "react-router-dom"
import { useState,useEffect } from "react";
import axios from "axios";

const SubCategory = () => {
  const params = useParams();
  console.log(params.subCatId)

  const [ isDataLoaded , setIsDataLoaded] = useState(false);

  // const [ category , setCategory] = useState();
  const [ subCategory , setSubCategory] = useState();

  useEffect(()=>{
    axios.get(`http://localhost:5000/getSubCategory/${params.subCatId}`).then((res,err)=>{
      if(res){
        setSubCategory(res.data[0]);
        console.log(res.data[0]);
        // axios.get(`http://localhost:5000/getSubCategories/${params.catId}`).then((resp,errp)=>{
        // if(resp){
        //   setSubCategories(resp.data)
        //   console.log(resp.data);
          setIsDataLoaded(true);
        // }
        // })
      }
    })
  },[params.subCatId])

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
        {isDataLoaded ? (
          <div className="left">
            <h1 className="title">Information</h1>
            
            <div className="item">
              <img
                src={subCategory.imgUrl}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{subCategory.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Sub Category Id:</span>
                  <span className="itemValue">{subCategory.id}</span>
                </div>
              </div>
            </div>
            </div>
            ) : 
            <div className="left">
            <h1 className="title">Information</h1>
            
            <div className="item">
              data loading...
            </div>
            </div>}
          
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Items List</h1>
        {isDataLoaded ? (
          <List subCatId={subCategory.id}/>
        ): <div>data loading...</div>}
        </div>
      </div>
    </div>
  );
};

export default SubCategory;