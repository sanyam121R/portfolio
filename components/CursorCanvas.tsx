"use client";

import { useEffect, useRef } from "react";

const CursorCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mouseMoved = false;

    const pointer = {
      x: 0.5 * window.innerWidth,
      y: 0.5 * window.innerHeight,
    };

    const params = {
      pointsNumber: 20,
      widthFactor: 0.2,
      spring: 0.4,
      friction: 0.5,
    };

    const trail = new Array(params.pointsNumber)
      .fill(0)
      .map(() => ({
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
      }));

    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    function updateMousePosition(eX: number, eY: number) {
      pointer.x = eX;
      pointer.y = eY;
    }

    const handleClick = (e: MouseEvent) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseMoved = true;
      updateMousePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      mouseMoved = true;
      const touch = e.targetTouches[0];
      if (!touch) return;
      updateMousePosition(touch.clientX, touch.clientY);
    };

    function setupCanvas() {
      if (!canvas || !ctx) return;

      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      if (lastWidth > 0 && lastHeight > 0) {
        const scaleX = newWidth / lastWidth;
        const scaleY = newHeight / lastHeight;

        pointer.x *= scaleX;
        pointer.y *= scaleY;

        trail.forEach((p) => {
          p.x *= scaleX;
          p.y *= scaleY;
        });
      }

      lastWidth = newWidth;
      lastHeight = newHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = newWidth * dpr;
      canvas.height = newHeight * dpr;
      canvas.style.width = `${newWidth}px`;
      canvas.style.height = `${newHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    setupCanvas();

    let animationFrameId: number;

    const update = (t: number) => {
      if (!canvas || !ctx) return;

      if (!mouseMoved) {
        pointer.x =
          (0.5 +
            0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) *
          window.innerWidth;
        pointer.y =
          (0.5 +
            0.2 * Math.cos(0.005 * t) +
            0.1 * Math.cos(0.01 * t)) *
          window.innerHeight;
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;

        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;

        p.dx *= params.friction;
        p.dy *= params.friction;

        p.x += p.dx;
        p.y += p.dy;
      });

      ctx.lineCap = "round";
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);

      for (let i = 1; i < trail.length - 1; i++) {
        const xc = 0.5 * (trail[i].x + trail[i + 1].x);
        const yc = 0.5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.stroke();
      }

      ctx.lineTo(
        trail[trail.length - 1].x,
        trail[trail.length - 1].y
      );
      ctx.stroke();

      animationFrameId = window.requestAnimationFrame(update);
    };

    animationFrameId = window.requestAnimationFrame(update);

    window.addEventListener("resize", setupCanvas);
    window.addEventListener("click", handleClick);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("resize", setupCanvas);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "transparent",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default CursorCanvas;
