"use client";

import { useEffect, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MouseParallaxProps {
  children: ReactNode;
  intensity?: number;
  className?: string;
}

export function MouseParallax({
  children,
  intensity = 20,
  className = "",
}: MouseParallaxProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), springConfig);
  const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-intensity, intensity]), springConfig);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    const handleMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mouseX.set(nx);
      mouseY.set(ny);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}
