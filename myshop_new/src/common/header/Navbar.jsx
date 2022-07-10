import {React , useState} from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    const [MobileMenu,setMobileMenu] = useState(false)
  return (
    <>
        <header className='header'>
            <div className="container d_flex">
                <div className="categories d_flex">
                    
                </div>
                <div className='navlink'>
                    <ul className={ MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"} onClick={()=>setMobileMenu(false)}>
                        <li>
                            <Link to='/'>home</Link>
                        </li>
                        <li>
                            <Link to='/pages'>cart</Link>
                        </li>
                        <li>
                            <Link to='/account'>user account</Link>
                        </li>
                        <li>
                            <Link to='/track'>about</Link>
                        </li>
                        <li>
                            <Link to='/contact'>contact</Link>
                        </li>
                    </ul>

                    <button className='toggle' onClick={()=> setMobileMenu(!MobileMenu)}>
                        {
                            MobileMenu ? <i className='fas fa-times close home-bth'></i> : 
                            <i className='fa-solid fa-bars open'></i>
                        }

                    </button>
                </div>
            </div>
        </header>
    </>
  )
}

export default Navbar