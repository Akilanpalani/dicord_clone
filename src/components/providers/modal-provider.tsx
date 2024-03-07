'use client';
import { useEffect, useState } from 'react';

import { CreateChannelModal } from '@/components/modals/create-channel-modal';
import { CreateServerModal } from '@/components/modals/create-server-modal';
import { DeleteServerModal } from '@/components/modals/delete-server-modal';
import { LeaveServerModal } from '@/components/modals/leave-server-modal';
import { EditServerModal } from '@/components/modals/edit-server-modal';
import { MembersModal } from '@/components/modals/members-modal';
import { InviteModal } from '@/components/modals/invite-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
    </>
  );
};