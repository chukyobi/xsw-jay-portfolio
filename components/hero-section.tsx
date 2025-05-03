"use client";

import { useRef, useEffect, useState } from "react";
import { Rocket } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import Link from "next/link";
import { gsap } from "gsap";
import { BookingModal } from "./booking-modal";

const leftImages = [
  "/left1.png",
  "/left2.png",
  "/left3.png",
  "/left4.png",
  "/left5.png",
];

const rightImages = [
  "/right1.png",
  "/right2.png",
  "/right3.png",
  "/right4.png",
  "/right5.png",
];

const phrases = ["COMPUTER", "SOFTWARE", "RESEARCH"];

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const leftScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );

      const left = leftScrollRef.current;
      const right = rightScrollRef.current;

      gsap.to(left, {
        yPercent: -50,
        repeat: -1,
        ease: "none",
        duration: 40,
      });

      gsap.to(right, {
        yPercent: -50,
        repeat: -1,
        ease: "none",
        duration: 40,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const currentPhrase = phrases[index];

    if (subIndex === currentPhrase.length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1000);
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => (deleting ? prev - 1 : prev + 1));
        setText(currentPhrase.substring(0, subIndex));
      },
      deleting ? 30 : 100
    );

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-start text-center px-4 overflow-hidden bg-background"
    >
      {/* Scrolling Images */}
      <div className="absolute inset-0 flex justify-between px-12 pointer-events-none z-0">
        {/* Left Column */}
        <div className="w-[250px] h-[300px] overflow-hidden relative">
          <div ref={leftScrollRef} className="flex flex-col space-y-6">
            {[...leftImages, ...leftImages, ...leftImages].map((src, i) => (
              <img
                key={`left-${i}`}
                src={src}
                alt="left-project"
                className="w-full rounded-xl object-cover opacity-20"
              />
            ))}
          </div>

          {/* Fade top and bottom */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Right Column */}
        <div className="w-[250px] h-[300px] overflow-hidden relative">
          <div ref={rightScrollRef} className="flex flex-col space-y-6">
            {[...rightImages, ...rightImages, ...rightImages].map((src, i) => (
              <img
                key={`right-${i}`}
                src={src}
                alt="right-project"
                className="w-full rounded-xl object-cover opacity-20"
              />
            ))}
          </div>

          {/* Fade top and bottom */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      </div>
      <div className="absolute inset-0 bg-dot bg-repeat opacity-10 pointer-events-none" />

      {/* Top Content */}
      <div className="relative z-10 w-full px-6 pt-8">
        {/* Navbar */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-lg font-bold">
            <span>Chukwudi</span>
            <span className="text-gray-200">Obi</span>
          </div>
          <div className="flex items-center space-x-4">
            {/* Discord */}
            <a
              href="https://discord.gg/your-link"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center bg-background border px-4 py-2 rounded-full"
            >
              <FaDiscord className="text-indigo-500 w-6 h-6" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com/chukyobi_"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center bg-background border px-4 py-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white w-6 h-6"
              >
                <path d="M20.98 3H16.8L12.02 9.06 7.44 3H2l7.6 9.74L2 21h4.2l5.04-6.45L16.6 21H22l-7.95-10.12L20.98 3z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/joseph-clinton-chukwudi-obi/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center bg-background border px-4 py-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M20.452 20.452h-3.554v-5.569c0-1.327-.025-3.037-1.85-3.037-1.851 0-2.134 1.445-2.134 2.937v5.669H9.361V9h3.413v1.561h.049c.476-.9 1.637-1.85 3.368-1.85 3.6 0 4.265 2.368 4.265 5.452v6.289zM5.337 7.433a2.062 2.062 0 112.061-2.062 2.063 2.063 0 01-2.061 2.062zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.554C0 23.23.792 24 1.771 24h20.451C23.2 24 24 23.23 24 22.277V1.723C24 .771 23.2 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Hero Main Text */}
        <div className="mt-24 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight text-center">
            SENIOR
            <br />
            <span className="text-blue-500">
              {text}
              <span className="animate-pulse">|</span>
            </span>
            <br />
            ENGINEER<span className="inline-block align-top ml-2">©</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base mt-6 font-medium">
          ENGINEERING RESILIENT SOFTWARE. DRIVING COMPLEX SYSTEMS. FROM ARCHITECTURE TO EXECUTION.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 mt-16">
            <BookingModal />
            <Link href="/projects">
              <button className="flex items-center justify-center gap-1 px-8 py-4 rounded-full bg-blue-500 text-background text-lg font-semibold hover:bg-blue-600 transition-all duration-300">
                <Rocket size={20} />
                See Projects
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
