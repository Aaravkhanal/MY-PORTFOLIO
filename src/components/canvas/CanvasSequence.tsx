"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const frameCount = 61;
  const currentFrame = (index: number) =>
    `/frames/frame_${index.toString().padStart(3, "0")}.jpg`;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas dimensions
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    let tween: gsap.core.Tween | null = null;

    const frameObj = { frame: 0 };

    function render() {
      if (!context || !canvas || images.length === 0) return;
      const img = images[Math.round(frameObj.frame)];
      if (!img || !img.complete) return;

      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const cx = (canvas.width - img.width * ratio) / 2;
      const cy = (canvas.height - img.height * ratio) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
    }

    function onAllLoaded() {
      render();
      tween = gsap.to(frameObj, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
        onUpdate: render,
      });
    }

    // Preload all frames
    for (let i = 1; i <= frameCount; i++) {
      const img = new window.Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          onAllLoaded();
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) onAllLoaded();
      };
      images.push(img);
    }

    const handleResize = () => {
      setSize();
      render();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      tween?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      {/* Canvas frame sequence — full opacity so animation is visible */}
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Very subtle vignette only at edges — keeps text readable without dimming animation */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)" }} />
    </div>
  );
}
