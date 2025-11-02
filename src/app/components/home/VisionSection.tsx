"use client"

import type React from "react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Badge: React.FC<{ children: React.ReactNode; color: "purple" | "orange" }> = ({
  children,
  color,
}) => {
  const bgColor = color === "purple" ? "bg-purple-500" : "bg-orange-500"
  return (
    <span className={`${bgColor} px-2 py-1 rounded-md font-bold text-white inline-block`}>
      {children}
    </span>
  )
}

const VisionSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const skeletonRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const skeletonRef2 = useRef<HTMLDivElement>(null)
  const contentRef2 = useRef<HTMLDivElement>(null)
  const [skeletonRects, setSkeletonRects] = useState<{
    left: number
    top: number
    width: number
    height: number
    borderRadius: number
  }[]>([])
  const [skeletonRects2, setSkeletonRects2] = useState<{
    left: number
    top: number
    width: number
    height: number
    borderRadius: number
  }[]>([])

  const words = [
    "We",
    "build",
    "an",
    <Badge color="purple" key="b1">audio-first</Badge>,
    "virtual",
    "classroom",
    "for",
    "rural",
    "colleges",
    ",",
    "blending",
    "live",
    "interaction",
    "with",
    <Badge color="orange" key="b2">offline-first</Badge>,
    "access",
    ".",
  ]

  const words2 = [
    "Powered",
    "by",
    "WebRTC",
    "Mediasoup",
    "and",
    "adaptive",
    "downloads",
    ",",
    "it",
    "works",
    "on",
    "entry-level",
    "phones",
    "with",
    "chat",
    ",",
    "polls",
    ",",
    "quizzes",
    ",",
    "and",
    <Badge color="purple" key="b3">low-bandwidth</Badge>,
    "optimizations",
    "plus",
    <Badge color="orange" key="b4">AI smart notes</Badge>,
    ".",
  ]
 
  
  const renderSkeletons = () =>
    skeletonRects.map((
      r: { left: number; top: number; width: number; height: number; borderRadius: number },
      i: number,
    ) => (
      <span
        key={i}
        className="bg-gray-300 dark:bg-gray-600 opacity-60 absolute rounded-full"
        style={{
          left: r.left,
          top: r.top,
          width: r.width,
          height: r.height,
        }}
      />
    ))

  const renderSkeletons2 = () =>
    skeletonRects2.map((
      r: { left: number; top: number; width: number; height: number; borderRadius: number },
      i: number,
    ) => (
      <span
        key={`p2-${i}`}
        className="bg-gray-300 dark:bg-gray-600 opacity-60 absolute rounded-full"
        style={{
          left: r.left,
          top: r.top,
          width: r.width,
          height: r.height,
        }}
      />
    ))


  useLayoutEffect(() => {
    if (!containerRef.current || !contentRef.current || !contentRef2.current) return

    const updateRects = () => {
      if (!containerRef.current || !contentRef.current || !contentRef2.current) return
      const containerBox = containerRef.current.getBoundingClientRect()
      const nodes = Array.from(contentRef.current.querySelectorAll<HTMLElement>(".word"))
      const rects = nodes.map((el) => {
        const box = el.getBoundingClientRect()
        return {
          left: box.left - containerBox.left,
          top: box.top - containerBox.top,
          width: box.width,
          height: box.height * 0.9,
          borderRadius: Math.min(box.height, 28) / 2,
        }
      })
      setSkeletonRects(rects)
      const nodes2 = Array.from(contentRef2.current.querySelectorAll<HTMLElement>(".word"))
      const rects2 = nodes2.map((el) => {
        const box = el.getBoundingClientRect()
        return {
          left: box.left - containerBox.left,
          top: box.top - containerBox.top,
          width: box.width,
          height: box.height * 0.9,
          borderRadius: Math.min(box.height, 28) / 2,
        }
      })
      setSkeletonRects2(rects2)
  
      ScrollTrigger.refresh()
    }

    updateRects()

    const ro = new ResizeObserver(() => updateRects())
    ro.observe(document.documentElement)
    window.addEventListener("resize", updateRects)

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", updateRects)
    }
  }, [])

  useEffect(() => {
    if (!skeletonRef.current || !contentRef.current) return

    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 70%",
        end: "top 40%",
        scrub: 1,
      },
    })

    tl1.to(skeletonRef.current, { opacity: 0, duration: 0.6 }, 0)
    tl1.to(contentRef.current, { opacity: 1, duration: 0.6 }, 0)

    const wordsAnimated1 = contentRef.current.querySelectorAll(".word")
    wordsAnimated1.forEach((word, i) => {
      gsap.set(word, { clipPath: "inset(0 100% 0 0)", y: 10 })
      tl1.to(
        word,
        { clipPath: "inset(0 0% 0 0)", y: 0, duration: 0.45, ease: "power3.out" },
        0.2 + i * 0.05,
      )
    })

    let tl2: gsap.core.Timeline | undefined
    if (skeletonRef2.current && contentRef2.current) {
      tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef2.current,
          start: "top 70%",
          end: "top 40%",
          scrub: 1,
        },
      })
      tl2.to(skeletonRef2.current, { opacity: 0, duration: 0.6 }, 0)
      tl2.to(contentRef2.current, { opacity: 1, duration: 0.6 }, 0)

      const wordsAnimated2 = contentRef2.current.querySelectorAll(".word")
      wordsAnimated2.forEach((word, i) => {
        gsap.set(word, { clipPath: "inset(0 100% 0 0)", y: 10 })
        tl2!.to(
          word,
          { clipPath: "inset(0 0% 0 0)", y: 0, duration: 0.45, ease: "power3.out" },
          0.2 + i * 0.05,
        )
      })
    }

    return () => {
      tl1.kill()
      if (tl2) tl2.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const textStyle =
    "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight"

  return (
    <section id="vision" className="w-full min-h-[160vh] px-4 sm:px-8 py-20 relative">
      <div ref={containerRef} className="max-w-4xl mx-auto text-center mt-40 relative">

 
        <div ref={skeletonRef} className="opacity-100 absolute inset-0 pointer-events-none">
          {renderSkeletons()}
        </div>
        <div ref={skeletonRef2} className="opacity-100 absolute inset-0 pointer-events-none">
          {renderSkeletons2()}
        </div>

  
        <div
          ref={contentRef}
          className={`${textStyle} opacity-0 flex flex-wrap justify-start gap-3`}
        >
          {words.map((word, index) => (
            <span key={index} className="word inline-block">
              {word}
            </span>
          ))}
        </div>

        <div className="h-5 sm:h-8" />

        <div
          ref={contentRef2}
          className={`${textStyle} opacity-0 flex flex-wrap justify-start gap-3 mt-20`}
        >
          {words2.map((word, index) => (
            <span key={`w2-${index}`} className="word inline-block">
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VisionSection
