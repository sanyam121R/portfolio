import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

const Menu = (props) => {  
  const {menuOpen, setMenuOpen} = props

  return (
    <div className='menu'>
      <div className='closeMenuButton' onClick={()=>setMenuOpen(!menuOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <line x1="24.9753" y1="25.4561" x2="2.34787" y2="2.82864" stroke="white" stroke-width="4" stroke-linecap="round"/>
          <line x1="2" y1="24.9997" x2="24.6274" y2="2.37228" stroke="white" stroke-width="4" stroke-linecap="round"/>
        </svg>
      </div>
      
      <div className='nav-name'>
        <span className='name'><Link style={{textDecoration:"none", color:"#f3f3f3"}} to="/">sanyam.</Link></span>
      </div>

      <div className='details'>
        <div className='contact'>
          <span>+91-9752117992</span>
          <span>sanyam.12rathore@gmail.com</span>
        </div>

        <div className='visit-resume menuOpened'>
          <div>visit my resume</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="241" height="2" viewBox="0 0 241 2" fill="none">
              <path d="M240 1.50002C240.276 1.50002 240.5 1.27616 240.5 1.00002C240.5 0.723879 240.276 0.500021 240 0.500021L240 1.50002ZM-4.37114e-08 1.5L240 1.50002L240 0.500021L4.37114e-08 0.5L-4.37114e-08 1.5Z" fill="#AAAAAA"/>
          </svg>
        </div>
      </div>

      <div className="menuIntro">
        <h3 className='menu-designation-intro'> I am a </h3>
        <h3 className='menu-designation'> Full-Stack Developer </h3>
      </div>

      <div className="menuOptions">
        
        <div> <Link className='text-link' to="/"> about <span>01</span> </Link> </div>
        <div> <Link className='text-link' to="/projects"> projects <span>02</span> </Link>  </div>
        <div> <Link className='text-link' to="/experience"> experiences <span>02</span> </Link> </div>
        <div> <Link className='text-link' to="/skills"> skills <span>03</span> </Link>  </div>
        {/* <div> <Link className='text-link' to="/gallery"> gallery <span>04</span> </Link>  </div> */}
      </div>
    </div>
  )
}

export default Menu
