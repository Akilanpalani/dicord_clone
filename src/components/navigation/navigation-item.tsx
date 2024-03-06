"use client";

import Image from "next/image";
import { useParams,useRouter } from "next/navigation";

import {cn} from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

interface NavigationItemProps {
  id:string;
  imageUrl:string;
  name:string;
}

export const NavigationItem = ({
  id,
  imageUrl,
  name
}:NavigationItemProps) => {

  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`)
  }

  return (
   <ActionTooltip
    side="right"
    align="center"
    label={name}
   >
     <button
        onClick={onClick}
        className="group relative flex items-center"
     >
      {/* HIGHLIGHT THE ACTIVE SERVER */}
      <div className={cn(
        "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
        params?.serverId !== id && "group-hover:h-[15px]",
        params?.serverId === id ? "h-[30px]" : "h-[4px]"
      )} />

      {/* SERVER IMAGE */}
      <div
        className={cn(
          "relative group flex mx-3 h-[40px] w-[40px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
          params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
        )}
       >
        <Image 
          fill
          src={imageUrl}
          alt="Channel"
        />
      </div>
    </button>
   </ActionTooltip>
  )

}