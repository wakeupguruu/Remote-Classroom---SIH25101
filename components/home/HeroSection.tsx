"use client"
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Mouse } from 'lucide-react';
import gsap from 'gsap';

const HeroSection = () => {
  
  
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useLayoutEffect(() => {

    const ctx = gsap.context(() =>{
      const HeroSection = ".hero-section";

      gsap.fromTo(HeroSection,{
        opacity: 0,
        scale: 0.90,
      },{
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out"
      })
    })
    return () => {
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getLocation = () => {
    return "IND";
  };

  return (
    <div
      className="hero-section w-full h-full bg-center bg-no-repeat bg-cover rounded-xl px-5 py-1 flex flex-col z-10 bg-[url('/image/hero-light.png')] dark:bg-[url('/image/hero.png')]"
      style={{ backgroundSize: 'cover', borderRadius: '0.75rem' }}
    >
        
        <div className="flex flex-col items-center justify-center h-full">
        <h1 className="hero-text text-2xl md:text-5xl  text-gray-900 dark:text-white text-center leading-tight mb-4"
        style={{
          fontFamily: "Georgia"
        }}
        >
            <span className="block">Imagine a space</span>
            <span className="block">between vision & impact</span>
        </h1>
        <p className="text-gray-700 dark:text-white/70 text-xl mt-4">
            {`That's where we thrive.`}
        </p>
        </div>

        <div className="flex items-center justify-between">
        <div className="text-gray-300 dark:text-white/60">
            <h4 className="text-sm font-mono">{currentTime ? formatTime(currentTime) : "--:--"}</h4>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-gray-300 dark:text-white/60 text-sm">Scroll to Explore</span>
            <Mouse className="w-5 h-5 animate-bounce text-gray-600 dark:text-white/60" />
        </div>

        <div className="text-gray-300 dark:text-white/60">
            <h4 className="text-sm font-mono">{getLocation()}</h4>
        </div>
        </div>

    </div>
  )
}
export default HeroSection