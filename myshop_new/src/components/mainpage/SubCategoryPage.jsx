import React from 'react'
import SubCategoryItems from '../itemDisplay/subCategoryItem'

function SubCategoryPage({subCatId}) {
  return (
    <>
        <section className='home'>
            <div className="container d_flex">
                <SubCategoryItems SubCatId={subCatId}/>
            </div>
        </section>
    </>
  )
}

export default SubCategoryPage