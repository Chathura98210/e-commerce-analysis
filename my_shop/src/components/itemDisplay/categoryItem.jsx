import React from 'react'
import SlideCard from '../mainpage/SlideCard'
import {useState,useEffect} from 'react';
import axios from 'axios';

function CategoryItems({CatId}) {

  const [ isDataLoaded , setIsDataLoaded] = useState(false);

  const [ category , setCategory] = useState();
  const [ items , setItems] = useState();

  useEffect(()=>{
    axios.get(`http://localhost:5000/getCategory/${CatId}`).then((res,err)=>{
      if(res){
        setCategory(res.data[0]);
        axios.get(`http://localhost:5000/ItemsInCat/${CatId}`).then((resp,errp)=>{
          if(resp){
            setItems(resp.data);
            setIsDataLoaded(true);
            console.log(resp.data);
          }
        })
      }
    })
  },[CatId]);

  return (
    <>
      {
        isDataLoaded ?
        <div className='home-page-items-sec'>
        <div className='home-featured-header'>{category.name}</div>
        <div className='items-container'>
          { 
          items.length > 0 ?
            items.map((item)=>{
              return (
                <SlideCard 
                name = {item.name}
                description = {item.description}
                imgUrl= {item.imgUrl}
                price = {item.price}
                key = {item.id}
                itemId = {item.id}
                />
              )
            })
            : <div className='no-items-to-display'>No Items to display</div>
          }
        </div>
      </div>
      : <div className='home-page-items-sec'><div className='home-featured-header'>Data Loading...</div></div>}
        
    </>
  )
}

export default CategoryItems