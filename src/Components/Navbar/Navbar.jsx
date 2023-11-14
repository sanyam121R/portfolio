import React, { useState } from 'react'
import './style.scss'
import Menu from './Menu';
import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
    const prop = false;
    
    const [menuOpen, setMenuOpen] = useState(false);

    const next_project_no = 2;
    const next_project_name = "Financial Dashboard";


  return (
    <div style={{position:'relative'}}>
        <div className='navbar' style={{display:menuOpen?"none":"flex"}}>
            <div className='nav-left'>
                <span className='name'><Link style={{textDecoration:"none", color:"#f3f3f3"}} to="/">sanyam.</Link></span>
            </div>
            { prop &&
                <div className='nav-center'>
                    <div className='next-nav'> Up next </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="57" height="2" viewBox="0 0 56 2" fill="none">
                        <path className='line' d="M1 1H55" stroke="#CBCBCB" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <div className='next-project'>{next_project_no} <span style={{padding:"0 5px 0 5px"}}>&</span> {next_project_name}</div>
                </div>
            }
            <div className='nav-right'>
                <div className='visit-resume'>
                    <div>visit my resume</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="241" height="2" viewBox="0 0 241 2" fill="none">
                        <path d="M240 1.50002C240.276 1.50002 240.5 1.27616 240.5 1.00002C240.5 0.723879 240.276 0.500021 240 0.500021L240 1.50002ZM-4.37114e-08 1.5L240 1.50002L240 0.500021L4.37114e-08 0.5L-4.37114e-08 1.5Z" fill="#AAAAAA"/>
                    </svg>
                </div>
                <div className='burger-menu' onClick={()=>{setMenuOpen(!menuOpen)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="39" height="21" viewBox="0 0 39 21" fill="none">
                        <line x1="3.66675" y1="10.5" x2="35.3334" y2="10.5" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                        <line x1="9.08325" y1="19.5" x2="28.8333" y2="19.5" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                        <line x1="9.08325" y1="1.5" x2="28.8333" y2="1.5" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                </div>
            </div>
        </div>

        {menuOpen && <Menu setMenuOpen={setMenuOpen} menuOpen={menuOpen}/>}
    </div>
  )
}

export default Navbar