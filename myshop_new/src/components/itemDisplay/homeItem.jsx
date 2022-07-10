import React from 'react'
import SlideCard from '../mainpage/SlideCard'
import {useState,useEffect} from 'react';
import axios from 'axios';

function HomeItem() {

  const [ isDataLoaded , setIsDataLoaded] = useState(false);

  const [ items , setItems] = useState();

  useEffect(()=>{
    axios.get(`http://localhost:5000/featuredItems`).then((res,err)=>{
      if(res){
        setItems(res.data);
        setIsDataLoaded(true);
        console.log(res.data);  
      }
    })
  },[]);

  return (
    <>  
        <div className='home-page-items-sec'>
        <div className='home-featured-header'>Featured Items</div>
        <div className='items-container'>
          { 
        isDataLoaded ?
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
            : <div className='no-items-to-display'>No Featured items to display</div>
          : <div className='no-items-to-display'>Data loading...</div>
          }
        </div>
        </div>  
    </>
  )
}

export default HomeItem