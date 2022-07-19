import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SubCategories({CatId}) {
  const [ isDataLoaded , setIsDataLoaded] = useState(false);

  const [ subCategories , setSubCategories] = useState();

  useEffect(()=>{
    axios.get(`http://localhost:5000/getSubCategories/${CatId}`).then((res,err)=>{
      if(res){
        setSubCategories(res.data);
        setIsDataLoaded(true)
      }
    })
  },[CatId])
  
  return (
    <>
    <div className="category">
      <div className='sub-cat-header'>
      <div className='fa-solid fa-border-all'></div>
      <div>Sub Categories</div>
      </div>
        {isDataLoaded ?
          subCategories.length > 0 ?
            subCategories.map((value,index)=>{
                return(
                  <Link to={`/subcategories/${value.id}`} key={index}>
                    <div className="box f_flex" >
                        <img src={value.imgUrl} alt="cat1" />
                        <span>{value.name}</span>
                    </div>
                 </Link>
                    
                )
            }) : <div className='no-sub-cats'>No Sub categories to show</div> : <div>Data Loading...</div>
        }
    </div>
    </>
  )
}

export default SubCategories