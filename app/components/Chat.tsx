"use client";

import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import StartInfo from "./StartInfo";

type Props = {
  chatId: string;
};
const Chat = ({ chatId }: Props) => {
  const { data: session } = useSession();

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className='flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-background scrollbar-thumb-scrollbarThumb hover:scrollbar-thumb-scrollbarThumbHover'>
      {messages?.empty && (
        <div className='-mt-8 md:mt-12'>
          <StartInfo />
        </div>
      )}
      <div className='mt-14 md:mt-0'>
        {messages?.docs.map((message) => (
          <Message key={message.id} message={message.data()} />
        ))}
      </div>
    </div>
  );
};

export default Chat;
