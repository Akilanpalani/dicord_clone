"use client";
import {Plus} from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";


export const NavigationAction = () => {

  const {onOpen} = useModal();
  return(
    <div>
      <ActionTooltip
        side="right"
        align="center"
        label="Add Server"
      >
      <button
        onClick={()=>onOpen("CreateServer")}
        className="group p-2 flex items-center"
      >
        <div className="flex mx-3 h-[40px] w-[40px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-[#404EED]">
          <Plus 
            className="group-hover:text-white transition text-[#404EED]"
            size={25}
          />
        </div>
      </button> 
      </ActionTooltip>
    </div>
  )
}