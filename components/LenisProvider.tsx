/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      //@ts-expect-error
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    // Advanced scroll speed handler
    function handleAdvancedScrollEffects() {
      const scrollY = lenis.scroll;
      const windowHeight = window.innerHeight;
      
      // Handle fast scroll elements
      const fastScrollElements = document.querySelectorAll('[data-scroll-fast]');
      fastScrollElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        const speed = parseFloat(htmlElement.getAttribute('data-scroll-fast') || '2');
        
        // Create a "catching up" effect - the element moves faster as you scroll
        const transform = -scrollY * (speed - 1) * 0.3;
        htmlElement.style.transform = `translate3d(0, ${transform}px, 0)`;
      });

      // Handle slow scroll elements
      const slowScrollElements = document.querySelectorAll('[data-scroll-slow]');
      slowScrollElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        const speed = parseFloat(htmlElement.getAttribute('data-scroll-slow') || '0.5');
        
        // Create a "lagging behind" effect
        const transform = -scrollY * (1 - speed) * 0.5;
        htmlElement.style.transform = `translate3d(0, ${transform}px, 0)`;
      });

      // Handle parallax elements with viewport awareness
      const parallaxElements = document.querySelectorAll('[data-scroll-parallax]');
      parallaxElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        const speed = parseFloat(htmlElement.getAttribute('data-scroll-parallax') || '0.5');
        const rect = htmlElement.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        
        // Only apply parallax when element is near viewport
        if (scrollY + windowHeight > elementTop - 200 && scrollY < elementTop + rect.height + 200) {
          const relativePos = scrollY - elementTop + windowHeight;
          const transform = relativePos * (speed - 1) * 0.1;
          htmlElement.style.transform = `translate3d(0, ${transform}px, 0)`;
        }
      });
    }

    // Listen to Lenis scroll events
    lenis.on('scroll', handleAdvancedScrollEffects);

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.off('scroll', handleAdvancedScrollEffects);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}