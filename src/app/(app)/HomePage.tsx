"use client";

import React, { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  AboutSection,
  AppSidebar,
  ContactSection,
  Navbar,
  Tabs,
} from "@/components";
import { TabsContent } from "@/components/ui";
import { ProjectModal, ProjectsSection } from "@/features/project/components";
import { useIsMobile } from "@/hooks";
import { useMenu } from "@/app/providers";

const VALID_TABS = ["about", "projects", "contact"] as const;
type TabValue = (typeof VALID_TABS)[number];

function isValidTab(value: string | null): value is TabValue {
  return value !== null && VALID_TABS.includes(value as TabValue);
}

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { closeMenu, isMenuOpen } = useMenu();

  const activeTab: TabValue = isValidTab(searchParams.get("tab"))
    ? (searchParams.get("tab") as TabValue)
    : "about";

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsModalOpen(true);
  };

  const handleModalClose = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setSelectedProjectId(null);
    }
  };

  const handleTabChange = useCallback(
    (value: string) => {
      if (isValidTab(value)) {
        if (isMenuOpen) closeMenu();
        const params = new URLSearchParams(searchParams.toString());
        if (value === "about") {
          params.delete("tab");
        } else {
          params.set("tab", value);
        }
        const query = params.toString();
        router.replace(query ? `?${query}` : "/", { scroll: false });
      }
    },
    [isMenuOpen, closeMenu, searchParams, router],
  );

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-full h-full flex flex-row"
    >
      <AppSidebar />
      <div className="w-full h-full p-6 pt-15 md:pt-6">
        <main className="shadow-md border-muted border flex-1 w-full shadow-black/50 bg-primary-foreground rounded-2xl h-full overflow-y-auto">
          {!isMobile && <Navbar />}
          <TabsContent className="container" value="about">
            <AboutSection />
          </TabsContent>

          <TabsContent className="container" value="projects">
            <ProjectsSection onProjectClick={handleProjectClick} />
          </TabsContent>

          <TabsContent className="container" value="contact">
            <ContactSection />
          </TabsContent>
          {selectedProjectId && (
            <ProjectModal
              projectId={selectedProjectId}
              open={isModalOpen}
              onOpenChange={handleModalClose}
            />
          )}
        </main>
      </div>
    </Tabs>
  );
}
