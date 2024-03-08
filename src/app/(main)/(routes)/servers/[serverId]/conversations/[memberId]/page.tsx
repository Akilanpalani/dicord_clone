import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { getOrCreateConversation } from '@/lib/conversations';
import { ChatHeader } from '@/components/chat/chat-header';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  };
}

const MemberIdPage = async ({ params }: MemberIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return '/';
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  // here who initialise the conversation with the other member, that person whould be memberOne
  const { memberOne, memberTwo} = conversation

  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader 
        imageUrl={otherMember.profile?.imageUrl ?? undefined}
        name={otherMember.profile?.name}
        serverId={params.serverId}
        type="conversations"
      />
    </div>
  ) 
};

export default MemberIdPage;