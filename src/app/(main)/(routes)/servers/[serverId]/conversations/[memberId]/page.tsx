import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { ChatMessages } from '@/components/chat/chat-messages';
import { getOrCreateConversation } from '@/lib/conversations';
import { ChatHeader } from '@/components/chat/chat-header';
import { ChatInput } from '@/components/chat/chat-input';
import { currentProfile } from '@/lib/current-profile';
import { MediaRoom } from '@/components/media-room';
import { db } from '@/lib/db';

interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  },
  searchParams:{
    video?:boolean;
  }
}

const MemberIdPage = async ({ params,searchParams }: MemberIdPageProps) => {
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
      {searchParams.video && (
        <MediaRoom 
          chatId={conversation.id}
          video={true}
          audio={true}
        />
      )}
      {!searchParams.video && (
        <>
          <ChatMessages 
            member={currentMember}
            name={otherMember.profile.name}
            chatId={conversation.id}
            type="conversations"
            apiUrl='/api/direct-messages'
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl='/api/socket/direct-messages/'
            socketQuery={{
              conversationId: conversation.id
            }}
          />
          <ChatInput 
            name={otherMember.profile.name}
            type="conversations"
            apiUrl='/api/socket/direct-messages'
            query={{
              conversationId: conversation.id
            }}
          />
        </>
      )}
    </div>
  ) 
};

export default MemberIdPage;
