import Chat from "@/app/components/Chat";
import ChatInput from "@/app/components/ChatInput";
import React from "react";
type Props = {
  params: { id: string };
};
const ChatPage = ({ params: { id } }: Props) => {
  return (
    <div className='flex h-screen flex-col overflow-hidden'>
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
};

export default ChatPage;
