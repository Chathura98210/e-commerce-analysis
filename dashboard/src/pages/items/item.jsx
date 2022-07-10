import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ItemChart from "../../components/chart/ItemChart";
import List from "../../components/table/Table";
import Widget from "../../components/widget/Widget";
import { useParams } from "react-router-dom"
import { useState,useEffect } from "react";
import axios from "axios";

const Item = () => {
  const params = useParams();
  console.log(params.itemId)

  const [ isDataLoaded , setIsDataLoaded] = useState(false);

  const [ item , setItem] = useState();
  // /itemviewed/:id
  useEffect(()=>{
    axios.get(`http://localhost:5000/items/${params.itemId}`).then((res,err)=>{
      if(res){
        setItem(res.data[0]);
        console.log(res.data[0]);
        axios.get(`http://localhost:5000/itemviewed/${params.itemId}`).then((resp,errp)=>{
          if(resp){
            setIsDataLoaded(true)
            console.log(resp.data);
          }
        })
      }
    })
  },[params.itemId])

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
                src={item.imgUrl}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{item.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Item Id:</span>
                  <span className="itemValue">{item.id}</span>
                </div>
                
              </div>
              
            </div>
            <br />
                <div className="detailItem">
                  <span className="itemKey">Category : </span>
                  <span className="itemValue">{item.category}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Sub Category : </span>
                  <span className="itemValue">{item.subCategory}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price : </span>
                  <span className="itemValue">{item.price} LKR</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Stock : </span>
                  <span className="itemValue">{item.stock}</span>
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
            { isDataLoaded ?
              <ItemChart aspect={3 / 1} title="Item clicks in past week" id={item.id}/>
              :
              <div className="item">
              data loading...
            </div>
            }
            
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Items List</h1>
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        {/* {isDataLoaded ? (
          <List catId={item.id}/>
        ): <div>data loading...</div>} */}
        </div>
      </div>
    </div>
  );
};

export default Item;