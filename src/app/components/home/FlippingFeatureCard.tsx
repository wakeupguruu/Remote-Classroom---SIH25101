"use client"

import React, { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { Plus } from 'lucide-react'

interface CardProps {
  title: string;
  frontDescription: string; 
  description: string;
  mainIcon: React.ReactNode;   
  backIcon: React.ReactNode;   
  idNumber: string;
  backId: string;           
  hoverColor: string;         
  backTextColor: string;      
}

const FlippingFeatureCard: React.FC<CardProps> = ({
  title,
  frontDescription,
  description,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mainIcon,
  backIcon,
  idNumber,
  backId,
  hoverColor,
  backTextColor,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const cardFrontRef = useRef<HTMLDivElement>(null);
  const cardBackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    const cardInner = cardInnerRef.current;
    const cardFront = cardFrontRef.current;
    const cardBack = cardBackRef.current;

    if (!card || !cardInner || !cardFront || !cardBack) return;

    gsap.set(card, { perspective: 1000 });
    gsap.set(cardInner, { transformStyle: "preserve-3d" });
    gsap.set(cardFront, { backfaceVisibility: "hidden" });
    gsap.set(cardBack, { 
      backfaceVisibility: "hidden", 
      rotationY: 180 
    });

    const onEnter = () => {
      gsap.to(cardInner, { rotateY: 180, duration: 0.7, ease: 'power3.out' });
    };

    const onLeave = () => {
      gsap.to(cardInner, { rotateY: 0, duration: 0.7, ease: 'power3.out' });
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={cardRef}
        className="w-full aspect-3/4 bg-transparent"
      >
        <div
          ref={cardInnerRef}
          className="relative w-full h-full"
        >
          <div
            ref={cardFrontRef}
            className={`absolute w-full h-full p-5 flex flex-col font-sans
                       bg-[#222222] text-white 
                       dark:bg-white dark:text-black
                       `}
          >
            <div className="w-full border-b border-white dark:border-black my-0.5"></div>
            
            <div className="flex justify-between items-center">
              <p className="font-medium text-md">{title}</p>
              <p className="font-mono text-sm opacity-60">[{backId}]</p>
            </div>
            
            
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-full flex items-end justify-between border-b-2 border-white/20 dark:border-black/20 pb-6 mb-1">
                <h2 className='text-7xl'
                style={{
                  fontFamily: "Georgia"
                }}
                >{backId}</h2>
                <h4 className='text-sm font-semibold'>[{backId}]</h4>
              </div>

              <div className="w-full flex items-center justify-start">
              <h4 className="text-md font-medium">{frontDescription}</h4>
            </div>
            </div>
            
            <div className="flex justify-between items-end ">
              <div>
                <p className="font-mono text-sm font-medium">{idNumber}</p>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/40 dark:border-black/40 flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div
            ref={cardBackRef}
            className={`flipping-card-back absolute w-full h-full 
                       border-r border-b border-black/10 overflow-hidden 
                       p-7 flex flex-col ${backTextColor}`}
            style={{ backgroundColor: hoverColor }}
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="bg-black/10 dark:bg-white/10 p-3 rounded-md self-start">
                <div className="flex items-center gap-3">
                  <span className="opacity-70">{backIcon}</span>
                  <span className="font-mono text-sm">{idNumber}</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-montserrat text-4xl font-bold leading-tight">
                  {title.split(', ').map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </h3>
              </div>
              
              <div className="flex justify-between items-end">
                <p className="font-rubik text-lg opacity-80 max-w-[70%]">
                  {description}
                </p>
                <div className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .flipping-card-back::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.07'/%3E%3C/svg%3E");
          z-index: 0;
          pointer-events: none;
        }
        .font-montserrat {
          font-family: var(--font-montserrat), sans-serif;
        }
        .font-rubik {
          font-family: var(--font-rubik), sans-serif;
        }
      `}</style>
    </>
  );
}

export default FlippingFeatureCard;