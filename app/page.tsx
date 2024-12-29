'use client'

import Link from "next/link";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function page() {

  const text = "Visualize Your Thoughts Like Never Before. Start Building Your Mind Map Today";

  const wrapperRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const image = imageRef.current;

    // Animate the text (scale and bounce)
    const letters = wrapper.querySelectorAll("span");
    const textTimeline = gsap.timeline({ defaults: { ease: "power4.out", duration: 0.6 } });

    textTimeline.fromTo(
      letters,
      { y: 50, opacity: 0, scale: 0.5 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
      }
    );

    // Add animation for the image (slide in from the right)
    gsap.fromTo(
      image,
      { x: 300, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
    );
  }, []);

  // Split text into spans for animation
  const splitText = text.split("").map((char, i) => (
    <span key={i} className="inline-block">
      {char === " " ? "\u00A0" : char} {/* Handle spaces */}
    </span>
  ));

  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col">
      <div className="sticky top-0 bg-black bg-opacity-60 z-50 py-4 px-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold">AsHlAnOTe</h1>


        </div>
      </div>
      <div className="flex items-center justify-center p-12 gap-16 max-w-7xl mx-auto">
        {/* Text Section */}
        <div ref={wrapperRef} className="overflow-hidden text-5xl font-bold w-1/2 space-y-4 text-justify">
          {splitText}
        </div>
        {/* Image Section */}
        <div ref={imageRef} className="w-1/2">
          <Image src="/homepage.png" alt="Mind Map" width={1200} height={1200} className="rounded-lg shadow-xl" />
        </div>
      </div>
      <div className="p-20 flex justify-center items-center">
        <Link href="/home" className="relative text-4xl font-semibold group transition-all">
          Start Taking Notes
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>
    </div>
  );
}
