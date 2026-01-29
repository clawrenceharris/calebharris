import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume PDF",
};

export default function ResumePage() {
  return (
    <main className="flex-1 w-full h-full overflow-hidden">
      <section className="mx-auto w-full max-w-5xl h-full overflow-hidden bg-primary-foreground rounded-2xl shadow-md shadow-black/50 flex flex-col">
        <header className="shrink-0 px-4 py-4 md:px-8 md:py-6 border-b border-border/30 bg-primary-foreground/70 backdrop-blur-md">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-border/30 bg-secondary-foreground/60 px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary-foreground/80 transition-colors"
              >
                <ArrowLeft className="size-4" />
                Back
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Resume</h1>
                <p className="text-sm text-muted-foreground">
                  View or download the PDF.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/CalebHarris.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-border/30 bg-black/30 px-4 py-2 text-sm font-bold text-foreground hover:bg-black/40 transition-colors"
              >
                <Download className="size-4" />
                Download
              </Link>
              <Link
                href="/Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/30 bg-primary-500 px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary-600 transition-colors"
              >
                <ExternalLink className="size-4" />
                Open
              </Link>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden p-4 md:p-8">
          <div className="h-full w-full overflow-hidden rounded-xl border border-border/30 bg-black/10">
            <object
              data="/Resume.pdf#view=FitH&toolbar=0&navpanes=0"
              type="application/pdf"
              className="h-full w-full"
            >
              <div className="p-6 text-sm text-muted-foreground">
                <p className="mb-3">
                  Your browser couldn&apos;t display the PDF inline.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border/30 bg-primary-500 px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary-600 transition-colors"
                  >
                    <ExternalLink className="size-4" />
                    Open PDF
                  </Link>
                  <Link
                    href="/Resume.pdf"
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-border/30 bg-black/30 px-4 py-2 text-sm font-bold text-foreground hover:bg-black/40 transition-colors"
                  >
                    <Download className="size-4" />
                    Download PDF
                  </Link>
                </div>
              </div>
            </object>
          </div>
        </div>
      </section>
    </main>
  );
}
