import { redirect } from "next/dist/server/api-utils";
import { UserButton } from "@clerk/nextjs";

import { NavigationItem } from "@/components/navigation/navigation-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currentProfile } from "@/lib/current-profile";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {db} from '@/lib/db'

import { NavigationAction } from "./navigation-action";

export const NavigationSidebar = async (req:any,res:any) => {
  const profile = await currentProfile();

  if(!profile){
    redirect(res,302,"/");
    return null;
  }

  const servers = await db.server.findMany({
    where:{
      members:{
        some:{
          profileId: profile.id
        }
      }
    }
  })
  return (
    <div className="space-y-4 flex flex-col items-center h-full w-full text-primary dark:bg-[#1E1F22] py-3">
      {/* Navigation Action */}
      <NavigationAction />
      {/* Separator */}
      <Separator 
        className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
      />

      {/* Navigation Items List in Scroll Area */}
      <ScrollArea className="flex-1 w-full">
        {servers.map((server)=>(
          <div key={server.id} className="mb-4">
            <NavigationItem 
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements:{
              avatarBox:"h-[35px] w-[35px]"
            }
          }}
        />
      </div>
    </div>
  )
}