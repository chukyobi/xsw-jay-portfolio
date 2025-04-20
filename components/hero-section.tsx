import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, MousePointerClick, Sparkles } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect } from "react";
import gsap from "gsap";

export default function HeroSection() {
  useEffect(() => {
    gsap.from(".animate-fade", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
    });
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background text-white">
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:16px_16px] z-0" />

      {/* Content Layout */}
      <div className="relative z-10 grid grid-cols-5 gap-4 h-full items-center px-6 lg:px-20">
        {/* Left Icons */}
        <div className="flex flex-col items-center space-y-6">
          <MousePointerClick className="text-purple-accent w-6 h-6" />
          <Sparkles className="text-yellow-highlight w-6 h-6" />
        </div>

        {/* Text Content */}
        <div className="col-span-2 space-y-6 animate-fade">
          <h1 className="text-4xl lg:text-6xl font-bold text-blue-accent">
            Your Creative Tagline Here
          </h1>
          <p className="text-muted-foreground text-lg">
            Building intuitive interfaces with powerful backends. Let’s craft something extraordinary.
          </p>
          <Button className="bg-purple-accent text-white hover:bg-purple-700 transition">Get Started</Button>
        </div>

        {/* Floating Hero Image */}
        <div className="col-span-1 flex justify-center items-center relative">
          <Dialog>
            <DialogTrigger asChild>
              <Image
                src="/images/hero-image.png"
                alt="Hero"
                width={300}
                height={500}
                className="rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent>
              <Image
                src="/images/hero-image.png"
                alt="Hero Dialog"
                width={500}
                height={800}
                className="rounded-lg"
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Social Sidebar */}
        <div className="flex flex-col items-center space-y-6">
{/*           <a href="https://github.com" target="_blank">
            <Github className="text-blue-accent hover:text-white w-6 h-6" />
          </a> */}
{/*           <a href="https://linkedin.com" target="_blank">
            <Linkedin className="text-blue-accent hover:text-white w-6 h-6" />
          </a>
          <a href="https://twitter.com" target="_blank">
            <Twitter className="text-blue-accent hover:text-white w-6 h-6" />
          </a> */}
          <div className="w-px h-16 bg-muted-foreground" />
        </div>
      </div>

      {/* Scattered Accent Icons */}
      <div className="absolute top-10 left-10 animate-fade">
        <Sparkles className="text-purple-accent w-5 h-5" />
      </div>
      <div className="absolute bottom-20 right-16 animate-fade">
        <MousePointerClick className="text-yellow-highlight w-5 h-5" />
      </div>
    </section>
  );
}
