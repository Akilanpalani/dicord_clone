'use client';

import { ServerWithMembersWithProfiles } from '@/types';
import { MemberRole } from '@prisma/client';
import { useModal } from '@/hooks/use-modal-store';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  ChevronDown,
  UserPlus,
  Settings,
  Users,
  PlusCircle,
  Trash,
  LogOut
} from 'lucide-react';

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const {onOpen} = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none' asChild>
        <button className='w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition'>
          {server.name}
          <ChevronDown className='h-5 w-5 ml-auto' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]'>
        {/* Moderator */}
        {isModerator && (
          <DropdownMenuItem 
            className='text-indigo-600 dark:text-indigo-400 py-2 px-3 text-sm cursor-pointer'
            onClick={()=>onOpen("InvitePeople",{server})}
            >
            Invite People
            <UserPlus className='w-4 h-4 ml-auto' />
          </DropdownMenuItem>
        )}
        
        {/* Admin */}
        {isAdmin && (
          <DropdownMenuItem className='py-2 px-3 text-sm cursor-pointer'
            onClick={()=>onOpen("editServer",{server})}
          >
            Server Setting
            <Settings className='w-4 h-4 ml-auto' />
          </DropdownMenuItem>
        )}

        {/* Admin Manage Members */}
        {isAdmin && (
          <DropdownMenuItem className='py-2 px-3 text-sm cursor-pointer'
          onClick={()=>onOpen("members",{server})}
          >
            Manage Members
            <Users className='w-4 h-4 ml-auto' />
          </DropdownMenuItem>
        )}

        {/* Create Channel */}
        {isModerator && (
          <DropdownMenuItem className='py-2 px-3 text-sm cursor-pointer'
            onClick={()=>onOpen("CreateChannel")}
          >
            Create Channel
            <PlusCircle className='w-4 h-4 ml-auto' />
          </DropdownMenuItem>
        )}

         {/* Create Server separator */}
         {isModerator && (
           <DropdownMenuSeparator />
         )}

         {/* Delete Server */}
         {isAdmin && (
          <DropdownMenuItem className='text-rose-500 py-2 px-3 text-sm cursor-pointer'
            onClick={()=>onOpen("deleteServer",{server})}
          >
            Delete Server
            <Trash className='w-4 h-4 ml-auto' />
          </DropdownMenuItem>
        )}

        {/* Leave Server */}
        {!isAdmin && (
          <DropdownMenuItem className='text-rose-500 py-2 px-3 text-sm cursor-pointer'
            onClick={()=>onOpen("leaveServer",{server})}
          >
            Leave Server
            <LogOut className='w-4 h-4 ml-auto' />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
