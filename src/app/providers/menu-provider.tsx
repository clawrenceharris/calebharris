"use client";
import { useIsMobile } from "@/hooks";
import { FormspreeProvider } from "@formspree/react";
import React, { createContext, useCallback, useContext, useState } from "react";

interface MenuContextType {
  isMenuOpen: boolean;
  closeMenu: () => void;
  openMenu: () => void;
  toggleMenu: () => void;
}
const MenuContext = createContext<MenuContextType | undefined>(undefined);
export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);
  return (
    <MenuContext.Provider
      value={{ openMenu, closeMenu, toggleMenu, isMenuOpen }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used inside a MenuProvider");
  }
  return context;
}
