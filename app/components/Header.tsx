"use client";

import React, { useState, useEffect } from "react";
import { FiMenu, FiPlus, FiX } from "react-icons/fi";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SideBar from "./SideBar";

const Header = () => {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  useEffect(() => {
    function handleResize() {
      setSideBarOpen(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
        messages: [],
      }
    );
    router.push(`/chat/${doc.id}`);
  };

  return (
    <>
      {!sideBarOpen && (
        <div className='absolute z-50 flex flex-row md:hidden'>
          <SideBar />
          <FiX
            onClick={() => setSideBarOpen(!sideBarOpen)}
            className='m-2 cursor-pointer border-2 text-4xl text-textSecondaryColor'
          />
        </div>
      )}
      <div className='fixed flex w-full items-center justify-between border-b border-white/10 bg-background py-2 px-4 md:hidden'>
        <FiMenu
          onClick={() => setSideBarOpen(!sideBarOpen)}
          className='cursor-pointer text-2xl text-textSecondaryColor'
        />
        <FiPlus
          onClick={createNewChat}
          className='cursor-pointer text-2xl text-textSecondaryColor'
        />
      </div>
    </>
  );
};

export default Header;
