import React from 'react'

function Head() {
  return (
    <>
        <section className="head">
            <div className="container d_flex">
                <div className="left row">
                    <i className='fa fa-phone'></i>
                    <label>+9412 345 67 89</label>
                    <i className='fa fa-envelope'></i>
                    <label>hello@gmail.com</label>
                </div>  
                <div className="right row Rtext">
                    <label>Theme FAQ's</label>
                    <label>Need Helps</label>
                    <span>+</span>
                    <label>EN</label>
                    <span>-</span>
                    <label>USD</label>
                    <span>$</span>
                </div>
            </div>
        </section>
    </>
  )
}

export default Head