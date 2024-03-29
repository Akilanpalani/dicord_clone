'use client';

import axios from 'axios';
import { Copy, RefreshCw, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

import { useModal } from '@/hooks/use-modal-store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useOrigin } from '@/hooks/use-origin';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === 'InvitePeople';
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const iniviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(iniviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  // This is for new server generate
  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);

      onOpen("InvitePeople",{server:response?.data})
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <div className='h-full m-10'>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className='bg-white text-black p-0 overflow-hidden'>
          <DialogHeader className='pt-4 px-3'>
            <DialogTitle className='text-2xl text-center font-semibold'>
              Inivite Friends
            </DialogTitle>
          </DialogHeader>
          <div className='p-6'>
            <Label className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
              Server Invite Link
            </Label>
            <div className='flex items-center mt-2 gap-x-2'>
              <Input
                disabled={isLoading}
                className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                value={iniviteUrl}
              />
              <Button disabled={isLoading} onClick={onCopy} size='icon'>
                {copied ? (
                  <Check className='w-4 h-4' />
                ) : (
                  <Copy className='w-4 h-4' />
                )}
              </Button>
            </div>
            <Button
              disabled={isLoading}
              onClick={onNew}
              variant='link'
              size='sm'
              className='text-xs text-zinc-500 mt-4'
            >
              Generate a new link
              <RefreshCw className='w-4 h-4 ml-2' />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    // </div>
  );
};
