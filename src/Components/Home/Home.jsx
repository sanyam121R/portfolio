import React, {useContext} from 'react'
import './style.scss'
import { MouseContext } from "../../context/mouse-context";

const Home = () => {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);

  return (
    <section 
      className="hero"
      role="region"
      aria-label="Hero section"
    >
      <div 
        className="intro" 
        onMouseEnter={() => cursorChangeHandler("hovered")}
        onMouseLeave={() => cursorChangeHandler("")}
      >
        <h1 className='designation-intro'> I am a </h1>
        <h2 className='designation'> Full-Stack Developer </h2>
        <p className='hero-description'>
          Building modern web applications and AI-powered SaaS products with React, Node.js, and cloud technologies.
        </p>
      </div>
    </section>
  )
}

export default Home
