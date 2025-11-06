// import { ThemeToggle } from "@/app/components/ThemeToggle";

// import { Mouse } from "lucide-react"

// const page = () => {
//   return (
//     <div className="min-h-screen p-8">
//       <div className="max-w-4xl mx-auto space-y-6">
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-title font-bold">Remote Classroom</h1>
//           <ThemeToggle />
//         </div>
        
        
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
//           <h2 className="text-2xl font-title font-semibold mb-4">Welcome!</h2>
//           <p className="text-text-secondary-light dark:text-text-secondary-dark font-body">
//             Click the theme toggle button in the top right to switch between light and dark modes.
//           </p>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
//             <h3 className="font-title font-semibold mb-2">Light Mode Elements</h3>
//             <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
//               This card should have a white background in light mode and dark background in dark mode.
//             </p>
//           </div>
//           <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
//             <h3 className="font-title font-semibold mb-2">Contrast Test</h3>
//             <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
//               Different shades to test the theme switching.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;


"use client"

import { useLayoutEffect, useRef } from "react";
import HeroSection from "@/components/home/HeroSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Navbar from "@/components/home/Navbar";
import VisionSection from "@/components/home/VisionSection";
import SplitCardScroll from "@/components/home/SplitCardScroll";
import FeatureGrid from "@/components/home/FeatureGrid";

gsap.registerPlugin(ScrollTrigger);


const Page = () => {
  
  const containerRef = useRef(null);
  
  useLayoutEffect(() => {

    const ctx = gsap.context(() =>{
      const HeroSectionMain = ".hero-section-main";
      const VisionSectionMain = ".vision-section-main";

       const HeroSection = ".hero-section";

 


      ScrollTrigger.create({
        trigger: VisionSectionMain,
        start: "top bottom",
        end: "top top",
        pin: HeroSectionMain,
        pinSpacing: false,
        scrub: 1,
      });

     gsap.fromTo(HeroSection, 
        {
          scale: 1,
        },
        {
          scale: 0.95,
          rotateX: 10,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: VisionSectionMain,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          }
        }
      );

    },containerRef)
    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-black transition-colors font-body">
      <div className="fixed top-12 left-1/2 transform -translate-x-1/2 w-full  px-36 z-30">
        <Navbar/>
      </div>
      <div className="hero-section-main z-10 w-full h-screen py-8 px-10">
        <HeroSection/>
      </div>
      <div className="vision-section-main relative z-20 w-full min-h-screen bg-white dark:bg-[#000000]  px-10  transition-colors">
          <div className="w-full h-full relative bg-white dark:bg-[#000000]">
            <VisionSection/>
          </div>
      </div>
      <div className="w-full h-full relative bg-white dark:bg-[#000000]">
        <SplitCardScroll />
      </div>
      <FeatureGrid />
    </div>
  );
};

export default Page;