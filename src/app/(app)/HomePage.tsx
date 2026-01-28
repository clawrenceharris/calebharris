import React,{useState} from 'react'

import {
  AboutSection,
  AppSidebar,
  ContactSection,
  Navbar,
  SkillsSection,
} from "@/components";
import { TabsContent } from "@/components/ui";
import { ProjectModal, ProjectsSection } from '@/features/project/components';
import { useIsMobile } from '@/hooks';

export default function HomePage() {
    const isMobile = useIsMobile()
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
        null
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
    return (
        <>

            <AppSidebar />

            <main className="shadow-md flex-1 w-full shadow-black/50 bg-background rounded-2xl h-full overflow-y-auto">     
               {!isMobile && <Navbar />}
                <TabsContent className='container' value="about">
                    <AboutSection />
                </TabsContent>

                <TabsContent className="container" value="skills">
                    <SkillsSection />
                </TabsContent>
                <TabsContent className="container" value="projects">
                    <ProjectsSection onProjectClick={handleProjectClick} />
                </TabsContent>

                <TabsContent className="container" value="contact">
                    <ContactSection />
                </TabsContent>
                {selectedProjectId && <ProjectModal
                    projectId={selectedProjectId}
                    open={isModalOpen}
                    onOpenChange={handleModalClose}
                />}
            </main>  
        </>
    )
}
