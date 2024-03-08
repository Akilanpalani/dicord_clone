'use client';

import qs from "query-string"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useModal } from '@/hooks/use-modal-store';
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';

export const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'deleteChannel';
  const { server,channel } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async ()=> {
    try{
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url:`/api/channels/${channel?.id}`,
        query:{
          serverId:server?.id
        }
      })
      await axios.delete(url)
      onClose()
      router.refresh()
      router.push(`/servers/${server?.id}`)
    }
    catch(error){
      console.log(error)
    }
    finally{
      setIsLoading(false)
    }
  }

  return (
    // <div className='h-full m-10'>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className='bg-white text-black p-0 overflow-hidden'>
          <DialogHeader className='pt-4 px-3'>
            <DialogTitle className='text-2xl text-center font-semibold'>
              Delete Channel
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Are you sure you want to do this? <br />
              <span className="font-semibold text-indigo-500">#{channel?.name}</span>{' '}
              Will be deleted permanently.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='bg-gray-100 px-6 py-4 '>
            <div className="flex items-center justify-between w-full">
              <Button
                disabled={isLoading}
                onClick={onClose}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                onClick={onClick}
                variant="primary"
              >
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    // </div>
  );
};
