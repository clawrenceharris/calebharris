import React from "react";
import { SkillsSection } from ".";

export function AboutSection() {
  return (
    <div className="space-y-7">
      <section>
        <h2 className="mb-5">About Me</h2>

        <p className="text-sm leading-6 md:text-md text-[#ADB7BE]">
          {`
          I’m a Frontend UI Developer focused on building clean, responsive, and user-centered interfaces that translate designs into real, production-ready experiences.
         `}
       
          {` I specialize in HTML, CSS, Tailwind, and React/Next.js, with a strong emphasis on layout, responsiveness, and visual consistency across devices. My approach is detail-oriented — I care about proximity, hierarchy, and interaction states just as much as I do functionality.`}
          <br />
          <br />
          {`Through my projects, I’ve built full UI systems including educational platforms, and multi-device experiences. I enjoy taking a design or concept and turning it into an interface that feels polished and cohesive.`}
        
          {` I’m currently looking to contribute to a team where I can focus on building high-quality UI and continue refining my craft as a frontend developer.`}
        </p>
      </section>

      <section>
        <h2 className="mb-5">Skills</h2>
        <SkillsSection />
      </section>
    </div>
  );
}
