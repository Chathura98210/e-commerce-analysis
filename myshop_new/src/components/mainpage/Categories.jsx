import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Categories() {
  const [ isDataLoaded , setIsDataLoaded] = useState(false);

  const [ categories , setCategories] = useState();

  useEffect(()=>{
    axios.get(`http://localhost:5000/categories`).then((res,err)=>{
      if(res){
        setCategories(res.data);
        setIsDataLoaded(true)
        console.log(res.data);
      }
    })
  },[])
  
  return (
    <>
    <div className="category">
      <div className='cat-header'>
      <div className='fa-solid fa-border-all'></div>
      <div>Categories</div>
      </div>
                    
        {isDataLoaded ?
            categories.map((value,index)=>{
                return(
                  <Link to={`/categories/${value.id}`} key={index}>
                    <div className="box f_flex" >
                        <img src={value.imgUrl} alt="cat1" />
                        <span>{value.name}</span>
                    </div>
                 </Link>
                    
                )
            }) : <div>Data Loading...</div>
        }
    </div>
    </>
  )
}

export default Categories