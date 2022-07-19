import React from 'react';
import { useParams } from "react-router-dom";
import SubCategoryPage from '../components/mainpage/SubCategoryPage';

function SubCategory() {
  const params = useParams();

  return (
    <>
        <SubCategoryPage subCatId={params.id}/>
    </>
  )
}

export default SubCategory