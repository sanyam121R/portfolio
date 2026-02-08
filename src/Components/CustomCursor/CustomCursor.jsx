import React, { useContext } from 'react'
import './style.scss'
import useMousePosition from "../../hooks/useMousePosition";
import { MouseContext } from "../../context/mouse-context";

const CustomCursor = () => {
  const { cursorType } = useContext(MouseContext);
  const { x, y } = useMousePosition();

  return (
    <>
      <div
        style={{ transform: `translate(${x}px, ${y}px)` }}
        className={`ring ${cursorType}`}
      />
      <div
        style={{ transform: `translate(${x}px, ${y}px)` }}
        className={`dot ${cursorType}`}
      />
    </>
  );
}

export default CustomCursor