import React from 'react'
import CategoryItems from '../itemDisplay/categoryItem'
import SubCategories from './SubCategories'

function CategoryPage({catId}) {
  return (
    <>
        <section className='home'>
            <div className="container d_flex">
                <SubCategories CatId={catId}/> 
                <CategoryItems CatId={catId}/>
            </div>
        </section>
    </>
  )
}

export default CategoryPage