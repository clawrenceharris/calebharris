"use client";
import Image from "next/image";
import { Mail, MapPin, Menu, NotebookPen } from "lucide-react";
import { Button, InfoItem, ItemGroup, Navbar } from "@/components";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useMenu } from "@/app/providers";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import TypingText from "./typing-text";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
type SidebarContentProps = {
  isMobile?: boolean;
  onTabChange: (value: string) => void;
};
function SidebarContent({ isMobile, onTabChange }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="relative mt-10 flex flex-col items-center gap-3">
        <div className="relative">
          <div className="border-primary-500 relative size-30 overflow-hidden rounded-full border-4 bg-black md:size-40">
            <Image
              src="/images/me.png"
              loading="eager"
              alt="Caleb Harris"
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="bg-primary-500 absolute right-5 bottom-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#1a1a1a] font-bold text-white">
            CH
          </div>
        </div>
        <div className="mt-2 text-center text-2xl font-bold">
          {isMobile ? (
            <SheetTitle>
              <TypingText
                text="Caleb Harris"
                startOnVisible
                showCursor={false}
              />
            </SheetTitle>
          ) : (
            <TypingText
              role="heading"
              text="Caleb Harris"
              startOnVisible
              showCursor={false}
            />
          )}
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <Link href="https://github.com/clawrenceharris">
            <Image
              src="/icons/github-icon.svg"
              alt="Github"
              width={24}
              height={24}
            />
          </Link>

          <Link
            href="https://www.linkedin.com/in/caleb-harris-ba4169209/"
            target="_blank"
            rel="noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <Image
              src="/icons/linkedin-icon.svg"
              alt="LinkedIn"
              width={30}
              height={30}
            />
          </Link>
        </div>
      </div>

      <div>
        {/* Contact Information */}
        <ItemGroup className="flex flex-col gap-3">
          <Link href="mailto:clawrenceharris@gmail.com">
            <InfoItem
              title="Email"
              icon={<Mail />}
              description="clawrenceharris@gmail.com"
            />
          </Link>
          <Link href="/resume">
            <InfoItem
              icon={<NotebookPen />}
              title="Resume"
              description="View Resume"
            />
          </Link>
          <InfoItem
            icon={<MapPin />}
            title="Location"
            description="Glen Burnie, MD"
          />
        </ItemGroup>
      </div>
    </div>
  );
}

type AppSidebarProps = {
  className?: string;
  onTabChange: (value: string) => void;
};
export function AppSidebar({ className, onTabChange }: AppSidebarProps) {
  const { isMenuOpen, toggleMenu } = useMenu();
  const isMobile = useIsMobile();

  return (
    <Sheet open={isMenuOpen} onOpenChange={toggleMenu}>
      {!isMobile ? (
        <aside
          className={cn(
            "border-muted bg-primary-foreground flex h-full w-full max-w-65 shrink-0 flex-col justify-between overflow-auto rounded-2xl border p-4 text-white shadow-md shadow-black/50 md:px-5 md:py-3 lg:max-w-70",
            className,
          )}
        >
          <SidebarContent onTabChange={onTabChange} />
        </aside>
      ) : (
        <>
          <div className="border-muted bg-primary-foreground fixed top-0 left-0 w-full justify-baseline rounded-none border-b px-3">
            <SheetTrigger asChild>
              <Button
                className="hover:bg-transparent"
                size="icon"
                variant="ghost"
              >
                <Menu />
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent
            side="left"
            className="border-input z-99 bg-[#1a1a1a] p-4"
          >
            <SheetDescription className="sr-only">
              Caleb Harris
            </SheetDescription>
            <SidebarContent isMobile onTabChange={onTabChange} />
          </SheetContent>
        </>
      )}
    </Sheet>
  );
}
