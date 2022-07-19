import React from 'react';
import { useParams } from "react-router-dom";
import CategoryPage from '../components/mainpage/CategoryPage';

function Category() {
  const params = useParams();

  return (
    <>
        <CategoryPage catId={params.id}/>
    </>
  )
}

export default Category