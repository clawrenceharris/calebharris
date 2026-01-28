"use client"
import Image from 'next/image'
import { Calendar, Mail, MapPin, Menu } from 'lucide-react'
import { Button, Drawer, DrawerContent, DrawerTitle, DrawerTrigger, InfoItem,ItemGroup, Navbar} from '@/components'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useIsMobile } from '@/hooks/use-is-mobile'



function SidebarContent({isMobile}: {isMobile?: boolean}) {
    return (
        <div className='flex flex-col justify-between h-full'>
            
            {isMobile &&  <Navbar/>}
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
                <div className='text-2xl font-bold mt-2 text-center'>

               
                    {isMobile ?
                        
                        <DrawerTitle>Caleb Harris</DrawerTitle> :
                
                <h2>Caleb Harris</h2>
               
                    } </div>
               
                

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
                        href="https://www.linkedin.com"
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

            <div >
                {/* Contact Information */}
                <ItemGroup className='flex gap-3 flex-col'>
                    <Link href='mailto:chlaw104@gmail.com'>
                        <InfoItem
                            
                            title="Email"
                            icon={<Mail />}
                            description="chlaw104@gmail.com"
                        />
                    </Link>
                    <InfoItem
                        icon={<Calendar />}
                        title={"Birthday"}
                        description={"Nov 30, 2001"}
                    />
                    <InfoItem
                        icon={<MapPin />}
                        title={"Location"}
                        description={"Glen Burnie, MD"}
                    />
                </ItemGroup>

               
            </div>
        </div>
    )
}
export function AppSidebar({ className }: { className?: string }) {
    
    
    const isMobile = useIsMobile()

    
    
    return (
        <div>
        
            {!isMobile ?
                <aside className={cn("shadow-md h-full p-6 max-w-60 w-full  shadow-black/50 flex-0.5 backdrop-blur-md  bg-[#1a1a1a] rounded-2xl flex items-center text-white justify-between flex-col", className)}>
            
                    <SidebarContent />
            
                </aside>
                :

                <Drawer direction="left">
                    <DrawerTrigger asChild>
                        <Button className='fixed w-full justify-baseline px-3 bg-black/30 backdrop-blur-2xl top-0 rounded-none left-0 z-999' size="icon" variant="outline">
                            <Menu />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className='z-9999 border-input p-4  bg-[#1a1a1a] '>
                       
                        <SidebarContent isMobile/>

                    </DrawerContent>
                </Drawer>}

        </div>
     
    )
}