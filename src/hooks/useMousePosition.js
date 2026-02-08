import { useEffect, useState, useRef } from "react";

export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = () => {
      setMousePosition({ x: posRef.current.x, y: posRef.current.y });
      rafRef.current = null;
    };

    const mouseMoveHandler = (event) => {
      posRef.current.x = event.clientX;
      posRef.current.y = event.clientY;

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };

    document.addEventListener("mousemove", mouseMoveHandler, { passive: true });

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return mousePosition;
}