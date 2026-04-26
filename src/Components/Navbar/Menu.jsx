// import React from 'react'
// import './style.scss'
// import { Link } from 'react-router-dom'

// const Menu = (props) => {  
//   const { setMenuOpen } = props

//   return (
//     <div className='menu'>
//       <div className='nav-name'>
//         <span className='name'><Link style={{textDecoration:"none", color:"#f3f3f3"}} to="/">sanyam.</Link></span>
//       </div>

//       <div className='details'>
//         <div className='contact'>
//           <span>+91-9752117992</span>
//           <span>sanyam.12rathore@gmail.com</span>
//         </div>

//         <div className='visit-resume menuOpened'>
//           <a href='/Sanyam Rathore - Full Stack.pdf' target="_blank" rel="noopener noreferrer">
//               visit my resume
//           </a>
//           <svg xmlns="http://www.w3.org/2000/svg" width="241" height="2" viewBox="0 0 241 2" fill="none">
//               <path d="M240 1.50002C240.276 1.50002 240.5 1.27616 240.5 1.00002C240.5 0.723879 240.276 0.500021 240 0.500021L240 1.50002ZM-4.37114e-08 1.5L240 1.50002L240 0.500021L4.37114e-08 0.5L-4.37114e-08 1.5Z" fill="#AAAAAA"/>
//           </svg>
//         </div>
//       </div>

//       <div className="menuIntro">
//         <h3 className='menu-designation-intro'> I am a </h3>
//         <h3 className='menu-designation'> Full-Stack Developer </h3>
//       </div>

//       <div className="menuOptions">
        
//         <div> <Link className='text-link' to="/" onClick={() => setMenuOpen(false)}> about <span>01</span> </Link> </div>
//         <div> <Link className='text-link' to="/projects" onClick={() => setMenuOpen(false)}> projects <span>02</span> </Link>  </div>
//         <div> <Link className='text-link' to="/experience" onClick={() => setMenuOpen(false)}> experiences <span>03</span> </Link> </div>
//         <div> <Link className='text-link' to="/skills" onClick={() => setMenuOpen(false)}> skills <span>04</span> </Link>  </div>
//         <div> <Link className='text-link' to="/contact" onClick={() => setMenuOpen(false)}> contact <span>05</span> </Link>  </div>
//         {/* <div> <Link className='text-link' to="/gallery"> gallery <span>04</span> </Link>  </div> */}
//       </div>
//     </div>
//   )
// }

// export default Menu


import React, { useEffect, useMemo, useRef } from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import gsap from 'gsap';

const Menu = (props) => {  
  const {menuOpen, setMenuOpen} = props
  const optionsTrackRef = useRef(null);
  const optionsGroupRef = useRef(null);
  const currentYRef = useRef(0);

  const menuItems = useMemo(() => ([
    { label: 'about', to: '/', index: '01' },
    { label: 'projects', to: '/projects', index: '02' },
    { label: 'experiences', to: '/experience', index: '03' },
    { label: 'skills', to: '/skills', index: '04' },
    { label: 'contact', to: '/contact', index: '05' },
  ]), []);

  useEffect(() => {
    if (!menuOpen || !optionsTrackRef.current || !optionsGroupRef.current) return undefined;

    const track = optionsTrackRef.current;
    const groupHeight = optionsGroupRef.current.getBoundingClientRect().height;

    if (!groupHeight) return undefined;

    const wrapY = gsap.utils.wrap(-groupHeight, 0);

    gsap.set(track, { y: 0 });
    currentYRef.current = 0;

    const handleWheel = (event) => {
      event.preventDefault();
      currentYRef.current = wrapY(currentYRef.current - event.deltaY * 0.9);

      gsap.to(track, {
        y: currentYRef.current,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: true,
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      gsap.killTweensOf(track);
    };
  }, [menuOpen]);

  return (
    <div className='menu'>
      <div className='nav-name'>
        <span className='name'><Link style={{textDecoration:"none", color:"#f3f3f3"}} to="/">sanyam.</Link></span>
      </div>

      <div className='details'>
        <div className='contact'>
          <span>+91-9752117992</span>
          <span>sanyam.12rathore@gmail.com</span>
        </div>

        <div className='visit-resume menuOpened'>
          <a href='/Sanyam Rathore - Full Stack.pdf' target="_blank" rel="noopener noreferrer">
              visit my resume
          </a>
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
        <div className='menuOptions-track' ref={optionsTrackRef}>
          <div className='menuOptions-group' ref={optionsGroupRef}>
            {menuItems.map((item) => (
              <div key={`primary-${item.index}`}>
                <Link className='text-link' to={item.to} onClick={() => setMenuOpen(false)}>
                  {item.label} <span>{item.index}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className='menuOptions-group menuOptions-group--duplicate' aria-hidden="true">
            {menuItems.map((item) => (
              <div key={`duplicate-${item.index}`}>
                <Link className='text-link' to={item.to} onClick={() => setMenuOpen(false)} tabIndex={-1}>
                  {item.label} <span>{item.index}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
