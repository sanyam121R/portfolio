import React, {useContext} from 'react'
import './style.scss'
import { MouseContext } from "../../context/mouse-context";

const Home = () => {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);

  return (
    <>
      <div 
        className="intro" 
        onMouseEnter={() => cursorChangeHandler("hovered")}
        onMouseLeave={() => cursorChangeHandler("")}
      >
        <h1 className='designation-intro'> I am a </h1>
        <h1 className='designation'> Full-Stack Developer </h1>
      </div>
    </>
  )
}

export default Home
