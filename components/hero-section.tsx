import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";

const HeroSection = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-background text-white">
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none z-0" />

      {/* Floating Navbar */}
      <FloatingNav />

      {/* Spotlight Effect */}
      <Spotlight className="absolute -top-10 left-0 z-10 h-[80vh] w-full" />

      <div className="relative z-20 grid grid-cols-12 h-full w-full">
        {/* Left Icons */}
        <div className="col-span-1 flex flex-col items-center justify-center gap-6">
          <Github className="text-blue-500" />
          <Twitter className="text-purple-500" />
          <Linkedin className="text-yellow-500" />
        </div>

        {/* Main Text Section */}
        <div className="col-span-6 flex flex-col justify-center px-6">
          <TextGenerateEffect
            words="Building the Future of Decentralized Intelligence."
            className="text-4xl md:text-6xl font-bold text-blue-accent"
          />
          <p className="mt-6 text-muted-foreground text-lg">
            We create secure, scalable, and intelligent systems that empower real-world solutions across healthcare, finance, and education.
          </p>
          <div className="mt-8 flex gap-4">
            <Button>Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>

        {/* Hero Image Dialog */}
        <div className="col-span-3 flex items-center justify-center">
          <Dialog>
            <DialogTrigger>
              <Image
                src="/founder.png"
                alt="founder"
                width={300}
                height={500}
                className="rounded-xl hover:scale-105 transition-transform duration-300 shadow-xl"
              />
            </DialogTrigger>
            <DialogContent>
              <Image
                src="/founder.png"
                alt="founder dialog"
                width={400}
                height={600}
                className="rounded-xl"
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Right Floating Info Icons */}
        <div className="col-span-2 flex flex-col justify-center gap-4">
          <div className="p-4 rounded-xl bg-background/30 border border-white/10 shadow-md">
            <p className="text-purple-accent font-semibold">Blockchain-Powered</p>
            <p className="text-muted-foreground text-sm">Immutable and secure data systems</p>
          </div>
          <div className="p-4 rounded-xl bg-background/30 border border-white/10 shadow-md">
            <p className="text-yellow-highlight font-semibold">AI-Driven</p>
            <p className="text-muted-foreground text-sm">Predictive analytics & automation</p>
          </div>
        </div>
      </div>

      {/* Footer Social Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 z-30">
        <Link href="https://github.com">
          <Github className="text-muted-foreground hover:text-white transition" />
        </Link>
        <Link href="https://twitter.com">
          <Twitter className="text-muted-foreground hover:text-white transition" />
        </Link>
        <Link href="https://linkedin.com">
          <Linkedin className="text-muted-foreground hover:text-white transition" />
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
