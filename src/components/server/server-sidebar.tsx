import { currentProfile } from "@/lib/current-profile";
import {redirect } from "next/navigation"

import { ChannelType } from "@prisma/client";
import {db} from "@/lib/db";
import { ServerHeader } from "@/components/server/server-header";

interface ServerSidebarProps {
  serverId: string;
}

export const ServerSideBar = async ({
  serverId
}:ServerSidebarProps) => {

  const profile = await currentProfile();

  if(!profile){
    redirect("/")
  }

  const server = await db.server.findUnique({
    where:{
      id:serverId,
    },
    include:{
      channels:{
        orderBy:{
          createdAt:"asc"
        }
      },
      members:{
        include:{
          profile: true
        },
        orderBy:{
          role:"asc"
        }
      }
    }
  });

  // filter channels
  const textChannels = server?.channels.filter((channel)=>channel.type === ChannelType.TEXT)
  const audioChannels = server?.channels.filter((channel)=>channel.type === ChannelType.AUDIO)
  const videoChannels = server?.channels.filter((channel)=>channel.type === ChannelType.VIDEO)
  const member = server?.members.find((member)=>member.profileId === profile.id)

  if(!server){
    return redirect("/")
  }

  // filter members by role
  const role = server.members.find((member)=> member.profileId === profile.id)?.role;
  
  return (
    <div className="flex flex-col h-full w-full text-primary dark:bg-[#2B2D32] bg-[#F2F3F5]">
      <ServerHeader 
        server={server}
        role={role}
      />
    </div>
  )
}
