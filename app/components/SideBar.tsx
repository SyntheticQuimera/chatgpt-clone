"use client";

import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import NewChat from "./NewChat";
import ChatRow from "./ChatRow";
import { FadeLoader } from "react-spinners";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";

const SideBar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );
  return (
    <div className='h-screen min-w-[17rem] max-w-[17rem] flex-col overflow-hidden bg-sideBarBackground py-4 pl-4 md:min-w-[16.2rem] md:max-w-[16.2rem]'>
      <div className='flex flex-col space-y-5'>
        <div className='pr-4'>
          <NewChat />
        </div>
        <div className='flex h-420 flex-col space-y-2 overflow-y-auto border-b border-white/10 pb-4 pr-4 scrollbar-thin scrollbar-track-sideBarBackground scrollbar-thumb-scrollbarThumb hover:scrollbar-thumb-scrollbarThumbHover'>
          {loading && (
            <div className='flex h-96 w-full items-center justify-center'>
              <FadeLoader color='#343541' className='scale-50' />
            </div>
          )}
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
        <div className='flex flex-col pr-4'>
          {session && (
            <div
              onClick={() => {
                router.replace("/");
                signOut();
              }}
              className='sideBarRow justify-between'>
              <FiLogOut className='text-[16px]' />
              <p className='flex-1 truncate'>Sign Out</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
