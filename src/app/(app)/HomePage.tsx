import React, { useState } from "react";

import {
  AboutSection,
  AppSidebar,
  ContactSection,
  Navbar,
  SkillsSection,
  Tabs,
} from "@/components";
import { TabsContent } from "@/components/ui";
import { ProjectModal, ProjectsSection } from "@/features/project/components";
import { useIsMobile } from "@/hooks";
import { useMenu } from "@/app/providers";

export default function HomePage() {
  const isMobile = useIsMobile();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { closeMenu, isMenuOpen } = useMenu();
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
  return (
    <Tabs
      onValueChange={() => {
        if (isMenuOpen) closeMenu();
      }}
      defaultValue="about"
      className="w-full h-full flex gap-6 flex-row "
    >
      <AppSidebar />

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
    </Tabs>
  );
}
