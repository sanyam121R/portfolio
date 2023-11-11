import React, { useEffect, useRef } from 'react'
import './style.scss'

const CustomCursor = () => {
  const cursorRef = useRef(null);
  
  useEffect(()=>{
    document.addEventListener('mousemove', (event) => {
      const { clientX, clientY } = event;
      
      const mouseX = clientX - cursorRef.current.clientWidth / 2;
      const mouseY = clientY - cursorRef.current.clientWidth / 2;
      
      cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      console.log("🚀 cursorRef.current.clientWidth:", cursorRef.current.clientWidth)
      console.log("🚀clientX:", clientX, clientY, mouseX, mouseY)
    })
  }, [])
  
  return (
    <div className='app-cursor' ref={cursorRef} >
      <div className='app-cursor-inside' ref={cursorRef} />
    </div>
  )
}

export default CustomCursor