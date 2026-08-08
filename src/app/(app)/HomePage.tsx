"use client";

import React, { useState } from "react";

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

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const VALID_TABS = ["about", "projects", "contact"] as const;

type TabValue = (typeof VALID_TABS)[number];

function isValidTab(value: string | null): value is TabValue {
  return value !== null && VALID_TABS.includes(value as TabValue);
}

export default function HomePage() {
  const router = useRouter();

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const searchParams = useSearchParams();
  const activeTab: TabValue = isValidTab(searchParams.get("tab"))
    ? (searchParams.get("tab") as TabValue)
    : "about";
  const handleTabChange = useCallback(
    (value: string) => {
      if (isValidTab(value)) {
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
    [searchParams, router],
  );

  return (
    <Tabs
      value={activeTab}
      className="flex h-full w-full flex-row gap-5 pt-10 pb-17"
    >
      <Navbar onTabChange={handleTabChange} />

      <AppSidebar onTabChange={handleTabChange} />
      <div className="h-full w-full">
        <main className="border-muted bg-primary-foreground h-full w-full flex-1 rounded-2xl border shadow-md shadow-black/50">
          <div className="overflow-y-auto p-4">
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
          </div>
        </main>
      </div>
    </Tabs>
  );
}
