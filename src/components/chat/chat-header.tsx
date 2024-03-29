import { Hash, Menu } from "lucide-react";

import { ChatVideoButton } from "@/components/chat/chat-video-button";

import { SocketIndicator } from "@/components/socket-indicator";
import { MobileToogle } from "@/components/mobile-toogle";
import { UserAvatar } from "@/components/user-avatar";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type:"channel" | "conversations";
  imageUrl?:string;
}
export const ChatHeader = ({serverId,name,type,imageUrl}:ChatHeaderProps) => {

  return(
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToogle 
        serverId={serverId}
      />
      {type === "channel" && (
        <Hash className="h-5 w-5 mr-2 text-zinc-500 dark:text-zinc-400"/>
      )}
      {type === "conversations" && (
        <UserAvatar 
          src={imageUrl}
          className="h-8 w-8 md:h-8 md:w-8 mr-2"
        />
      )}
      <p className="font-semibold text-md text-black dark:text-white">
        {name}
      </p>
      <div className="ml-auto flex items-center">
        {type === "conversations" && (
          <ChatVideoButton />
        )}
        <SocketIndicator />
      </div>
    </div>
  )
}