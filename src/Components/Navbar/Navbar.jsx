import React, { useEffect, useState } from 'react'
import './style.scss'
import Menu from './Menu';
import { Link } from "react-router-dom";

const Navbar = ({ showNextProject = false, nextProjectNo, nextProjectName }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    useEffect(() => {
        if (!menuOpen) {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            return;
        }

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [menuOpen]);

    return (
        <div className='navbar-wrapper'>
            <div className={`navbar ${menuOpen ? 'menu-open' : ''}`}>
                <div className='nav-left'>
                    <span className='name'>
                        <Link to="/">sanyam.</Link>
                    </span>
                </div>

                {showNextProject && nextProjectNo && nextProjectName && (
                    <div className='nav-center'>
                        <div className='next-nav'>Up next</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="57" height="2" viewBox="0 0 56 2" fill="none">
                            <path className='line' d="M1 1H55" stroke="#CBCBCB" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <div className='next-project'>
                            {nextProjectNo} <span>&</span> {nextProjectName}
                        </div>
                    </div>
                )}

                <div className='nav-right'>
                    <div className='visit-resume'>
                        <a href='/Sanyam Rathore - Full Stack.pdf' target="_blank" rel="noopener noreferrer">
                            visit my resume
                        </a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="241" height="2" viewBox="0 0 241 2" fill="none">
                            <path d="M240 1.50002C240.276 1.50002 240.5 1.27616 240.5 1.00002C240.5 0.723879 240.276 0.500021 240 0.500021L240 1.50002ZM-4.37114e-08 1.5L240 1.50002L240 0.500021L4.37114e-08 0.5L-4.37114e-08 1.5Z" fill="#AAAAAA" />
                        </svg>
                    </div>
                </div>
            </div>

            <button
                type="button"
                className={`wrapper-menu ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <span className="line-menu half start"></span>
                <span className="line-menu"></span>
                <span className="line-menu half end"></span>
            </button>

            {menuOpen && <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
        </div>
    )
}

export default Navbar