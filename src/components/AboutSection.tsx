import Image from "next/image";
import React from "react";
import { ScrollArea } from ".";

export function AboutSection() {
  return (
    <ScrollArea>
      <h2 className="sticky top-0 text-3xl font-bold text-white">About Me</h2>

      <div className=" flex flex-col lg:flex-row gap-8 items-center">
        <Image
          src={"/images/about-image.png"}
          width={300}
          height={300}
          alt="bitmoji"
          className="rounded-lg"
        />
        <p className="text-sm md:text-md text-[#ADB7BE]">
          A detail-oriented developer and student with strong interest in
          building code that doesn&apos;t just &quot;work&quot;, but can grow to
          do even more than originally expected.
          <br />
          <br />
          My interests began with a fascination for invention which eventually
          drove me to focus my time developing websites, apps and games.
          I&apos;ve developed most my skills in C#, Java, JavaScript, HTML and
          CSS.
          <br />
          <br />
          When given any project, my creative process always starts with a
          user-first approach—every design decision I make is aimed towards the
          end user to deliver intuitive, visually compelling, and effective
          technical solutions.
        </p>
      </div>
    </ScrollArea>
  );
}
