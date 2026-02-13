"use client";
import Image from "next/image";
import { Calendar, Mail, MapPin, Menu, NotebookPen } from "lucide-react";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  InfoItem,
  ItemGroup,
  Navbar,
} from "@/components";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useMenu } from "@/app/providers";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { useRef } from "react";
import TypingText from "./typing-text";

function SidebarContent({ isMobile }: { isMobile?: boolean }) {
  return (
    <div className="flex flex-col justify-between h-full">
      {isMobile && <Navbar />}
      <div className="relative  items-center gap-3 flex flex-col">
        <div className="relative">
          <div className="rounded-full relative size-30 md:size-50 overflow-hidden border-4 border-primary-500 bg-black">
            <Image
              src="/images/hero-image.png"
              alt="Caleb Harris"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-primary-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold border-2 border-[#1a1a1a]">
            CH
          </div>
        </div>
        <div className="text-2xl font-bold mt-2 text-center">
          {isMobile ? (
            <DrawerTitle>Caleb Harris</DrawerTitle>
          ) : (
            <TypingText role="heading" text="Caleb Harris" startOnVisible />
          )}{" "}
        </div>

        {/* Social Links */}
        <div className="flex gap-4  items-center">
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
            className="hover:opacity-80 transition-opacity"
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
        <ItemGroup className="flex gap-3 flex-col">
          <Link href="mailto:chlaw104@gmail.com">
            <InfoItem
              title="Email"
              icon={<Mail />}
              description="chlaw104@gmail.com"
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
export function AppSidebar({ className }: { className?: string }) {
  const isMobile = useIsMobile();
  const { isMenuOpen, closeMenu, toggleMenu } = useMenu();

  return (
    <Sheet open={isMenuOpen} onOpenChange={toggleMenu}>
      {!isMobile ? (
        <div className="p-6 pt-15 pr-0 md:pt-6 flex-1">
          <aside
            className={cn(
              "shadow-md h-full p-4 border-muted border md:p-5 md:py-7 w-full md:min-w-70  shadow-black/50   bg-primary-foreground rounded-2xl flex  text-white justify-between flex-col",
              className,
            )}
          >
            <SidebarContent />
          </aside>
        </div>
      ) : (
        <>
          <div className="fixed w-full border-b border-muted justify-baseline px-3 bg-primary-foreground top-0 rounded-none left-0">
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
            className="z-9999 border-input p-4  bg-[#1a1a1a] "
          >
            <SidebarContent isMobile />
          </SheetContent>
        </>
      )}
    </Sheet>
  );
}
