"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("magnetic")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-[100] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue mix-blend-screen transition-transform duration-100",
          isHovering ? "scale-[3]" : "scale-100"
        )}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
      <motion.div
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-[99] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-blue opacity-50 mix-blend-screen transition-transform duration-300",
          isHovering ? "scale-150" : "scale-100"
        )}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
      />
    </>
  );
}
