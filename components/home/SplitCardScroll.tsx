/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "./SplitCardScroll.css"; 
import { Signal, Users, Wand2 } from 'lucide-react';

export default function SplitCardScroll() {
  const componentRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<any[]>([]);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'split-card-scroll-styles';
    document.head.appendChild(styleElement);

    return () => {
      const style = document.getElementById('split-card-scroll-styles');
      if (style) {
        document.head.removeChild(style);
      }
    };
  }, []); 

  useEffect(() => {
    if (!componentRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cardContainer = componentRef.current?.querySelector('.split-card-container');
      const stickyHeader = componentRef.current?.querySelector('.split-sticky-header h1');

      let isGapAnimationCompleted = false;
      let isFlipAnimationCompleted = false;

      function initAnimations() {
        const mm = gsap.matchMedia();

        mm.add('(max-width: 999px)', () => {
          componentRef.current
            ?.querySelectorAll('.split-card, .split-card-container, .split-sticky-header h1')
            .forEach((el: any) => (el.style.cssText = ''));
          return {};
        });

        mm.add('(min-width: 1000px)', () => {
          const trigger = ScrollTrigger.create({
            trigger: componentRef.current?.querySelector('.split-sticky'),
            start: 'top top',
            end: `+=${window.innerHeight * 4}px`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
              const progress = self.progress;

              if (progress >= 0.1 && progress <= 0.25) {
                const headerProgress = gsap.utils.mapRange(0.1, 0.25, 0, 1, progress);
                const yValue = gsap.utils.mapRange(0, 1, 40, 0, headerProgress);
                const opacityValue = gsap.utils.mapRange(0, 1, 0, 1, headerProgress);
                if(!stickyHeader) return;
                gsap.set(stickyHeader, {
                  y: yValue,
                  opacity: opacityValue,
                });
              } else if (progress < 0.1) {
                if(!stickyHeader) return;
                gsap.set(stickyHeader, { y: 40, opacity: 0 });
              } else if (progress > 0.25) {
                if(!stickyHeader) return;
                gsap.set(stickyHeader, { y: 0, opacity: 1 });
              }

              if (progress <= 0.25) {
                const widthPercentage = gsap.utils.mapRange(0, 0.25, 75, 70, progress);
                if(!cardContainer) return;
                gsap.set(cardContainer, { width: `${widthPercentage}%` });
              } else {
                if(!cardContainer) return;

                gsap.set(cardContainer, { width: `70%` });
              }

              if (progress >= 0.35 && !isGapAnimationCompleted) {
                gsap.to(cardContainer, {
                  gap: '20px',
                  duration: 0.5,
                  ease: 'power3.out',
                });

                const allCards = componentRef.current?.querySelectorAll<HTMLElement>('.split-card');
                if (allCards && allCards.length > 0) {
                  gsap.to(Array.from(allCards), {
                    borderRadius: '20px',
                    duration: 0.5,
                    ease: 'power3.out',
                  });
                }

                isGapAnimationCompleted = true;
              } else if (progress < 0.35 && isGapAnimationCompleted) {
                if (cardContainer) {
                  gsap.to(cardContainer, {
                    gap: '0px',
                    duration: 0.5,
                    ease: 'power3.out',
                  });
                }

                const card1 = componentRef.current?.querySelector('#split-card-1');
                if (card1) {
                  gsap.to(card1, {
                    borderRadius: '20px 0 0 20px',
                    duration: 0.5,
                    ease: 'power3.out',
                  });
                }
                const card2 = componentRef.current?.querySelector('#split-card-2');
                if (card2) {
                  gsap.to(card2, {
                    borderRadius: '0px',
                    duration: 0.5,
                    ease: 'power3.out',
                  });
                }
                const card3 = componentRef.current?.querySelector('#split-card-3');
                if (card3) {
                  gsap.to(card3, {
                    borderRadius: '0 20px 20px 0',
                    duration: 0.5,
                    ease: 'power3.out',
                  });
                }
                isGapAnimationCompleted = false;
              }

              if (progress >= 0.7 && !isFlipAnimationCompleted) {
                gsap.to(componentRef.current?.querySelectorAll('.split-card'), {
                  rotationY: 180,
                  duration: 0.75,
                  ease: 'power3.inOut',
                  stagger: 0.1,
                });

                gsap.to([
                  componentRef.current?.querySelector('#split-card-1'),
                  componentRef.current?.querySelector('#split-card-3'),
                ], {
                  y: 30,
                  rotationZ: (i: number) => [-15, 15][i],
                  duration: 0.75,
                  ease: 'power3.inOut',
                });
                isFlipAnimationCompleted = true;
              } else if (progress < 0.7 && isFlipAnimationCompleted) {
                gsap.to(componentRef.current?.querySelectorAll('.split-card'), {
                  rotationY: 0,
                  duration: 0.75,
                  ease: 'power3.inOut',
                  stagger: -0.1,
                });
                gsap.to([
                  componentRef.current?.querySelector('#split-card-1'),
                  componentRef.current?.querySelector('#split-card-3'),
                ], {
                  y: 0,
                  rotationZ: 0,
                  duration: 0.75,
                  ease: 'power3.inOut',
                });

                isFlipAnimationCompleted = false;
              }
            },
          });

          animationsRef.current.push(trigger);
        });
      }

      initAnimations();

      let resizeTimer: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          initAnimations();
        }, 250);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, componentRef);

    return () => {
      ctx.revert();
      animationsRef.current.forEach((anim) => anim?.kill?.());
      animationsRef.current = [];
    };
  }, []);

  return (
    <>
      <div 
        ref={componentRef} 
        className="split-card-scroll-wrapper bg-white dark:bg-black text-gray-900 dark:text-white"
      >
        <section className="split-sticky">
          <div className="split-sticky-header">
            <h1 className="text-5xl font-medium leading-none">
              Our Three Pillars for Accessible Education
            </h1>
          </div>

          <div className="split-card-container">
            <div className="split-card" id="split-card-1">
              <div className="split-card-front">
                <img 
                  src="image/image_part_001.png" 
                  alt="" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="split-card-back bg-gray-200 dark:bg-gray-200 text-black">
                <div className="split-card-back-content">
                  <Signal className="card-back-icon" size={32} />
                  <div className="card-back-title">
                    Built for
                    <br />
                    Low-Bandwidth
                  </div>
                  <p className="card-back-text">
                    Our audio-first platform is optimized for unstable networks, ensuring clear, stable lectures on any entry-level smartphone.
                  </p>
                </div>
              </div>
            </div>

            <div className="split-card" id="split-card-2">
              <div className="split-card-front">
                <img 
                  src="image/image_part_002.png" 
                  alt="" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="split-card-back bg-[#d93a30] dark:bg-[#d93a30] text-white">
                <div className="split-card-back-content">
                  <Users className="card-back-icon" size={32} />
                  <div className="card-back-title">
                    Interactive
                    <br />
                    & Engaging
                  </div>
                  <p className="card-back-text">
                    Keep students engaged with real-time tools like live chat, polls, quizzes, and a digital whiteboard, all designed to function at low speeds.
                  </p>
                </div>
              </div>
            </div>

            <div className="split-card" id="split-card-3">
              <div className="split-card-front">
                <img 
                  src="image/image_part_003.png" 
                  alt="" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="split-card-back bg-[#1c1c1c] dark:bg-[#1c1c1c] text-white">
                <div className="split-card-back-content">
                  <Wand2 className="card-back-icon" size={32} />
                  <div className="card-back-title">
                    Offline-First
                    <br />
                    & AI-Powered
                  </div>
                  <p className="card-back-text">
                    Never miss a class. Download compressed recordings for offline viewing, and get AI-generated smart notes and translations for any lecture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}