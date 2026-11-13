import React from "react";
import { SkillsSection } from "..";
import { useAbout } from "@/hooks";
import Link from "next/link";
export function AboutSection() {
  const { about } = useAbout();

  return (
    <div className="space-y-7">
      <section>
        <h2 className="mb-5">About Me</h2>

        <p className="md:text-md max-w-lg text-sm leading-6 text-[#ADB7BE]">
          {about.description.split("\\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
              <br />
            </React.Fragment>
          ))}
        </p>
        <Link
          href="/resume"
          className="text-primary-500 hover:text-primary-600 underline"
        >
          View My Resume
        </Link>
      </section>

      <section>
        <h2 className="mb-5">Skills</h2>
        <SkillsSection />
      </section>
    </div>
  );
}
