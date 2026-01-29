import Image from "next/image";
import React from "react";
import { ScrollArea, SkillsSection } from ".";

export function AboutSection() {
  return (
    <div className="space-y-7">
      <section>
        <h2 className="mb-5">About Me</h2>

        <p className="text-sm leading-6 md:text-md text-[#ADB7BE]">
          I am a motivated Computer Science student with hands-on experience
          through a range of personal and academic projects. Driven by curiosity
          and a passion for technology, I've cultivated strong skills in C#,
          Unity, React, and other JavaScript frameworks. My approach to every
          project is user-focused, prioritizing intuitive and visually engaging
          solutions that effectively address real-world challenges. I thrive on
          learning new tools and collaborating to turn ideas into impactful
          results, and I am eager to bring my energy and dedication to a
          professional team.
        </p>
      </section>

      <section>
        <h2 className="mb-5">Skills</h2>
        <SkillsSection />
      </section>
    </div>
  );
}
