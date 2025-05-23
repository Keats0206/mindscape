"use client";

import { useState, useEffect } from "react";
import { cn } from "@/utils/cn";

interface TypingAnimationProps {
  children: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export const TypingAnimation = ({ 
  children, 
  className, 
  speed = 50, 
  delay = 0 
}: TypingAnimationProps) => {
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        startTyping();
      }, delay);
      
      return () => clearTimeout(delayTimer);
    } else {
      startTyping();
    }
  }, []);

  const startTyping = () => {
    const interval = setInterval(() => {
      if (currentIndex >= children.length) {
        clearInterval(interval);
        setIsFinished(true);
        return;
      }
      
      setText((prev) => prev + children[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, speed);
    
    return () => clearInterval(interval);
  };

  return (
    <div className={cn("inline-block", className)}>
      {text}
      {!isFinished && (
        <span className="ml-0.5 inline-block h-4 w-0.5 animate-blink bg-current" />
      )}
    </div>
  );
}; 