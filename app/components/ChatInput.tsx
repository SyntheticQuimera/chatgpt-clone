"use client";

import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { FiSend } from "react-icons/fi";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "react-hot-toast";
import useSWR from "swr";
import ModelSelection from "./ModelSelection";

type Props = {
  chatId: string;
};
const ChatInput = ({ chatId }: Props) => {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  // useSWR to get model
  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };
    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );
    //Toast loading notification
    const notification = toast.loading("ChatGPT is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      // Toast successful notification
      toast.success("ChatGPT has responded!", {
        id: notification,
      });
    });
  };

  return (
    <div className='static h-28 px-8 pt-4 lg:px-32'>
      <form
        onSubmit={sendMessage}
        className='flex space-x-5 rounded-md border border-inputBorder/50 bg-inputBackground py-3 px-4 drop-shadow-2xl '>
        <input
          className='grow bg-transparent text-inputTextColor outline-none disabled:cursor-not-allowed'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type='text'
        />
        <button
          disabled={!prompt || !session}
          type='submit'
          className='flex items-center rounded-md p-1 hover:bg-inputBorder'>
          <FiSend className='mr-1 text-textSecondaryColor' />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
