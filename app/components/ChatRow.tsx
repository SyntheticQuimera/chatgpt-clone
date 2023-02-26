import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FiEdit3, FiMessageSquare, FiTrash2 } from "react-icons/fi";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

type Props = {
  id: string;
};

const ChatRow = ({ id }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`sideBarRow justify-between ${
        active && "bg-sideBarActiveRow"
      }`}>
      <FiMessageSquare className='text-[16px]' />
      <p className='flex-1 truncate'>
        {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
      </p>
      {active && (
        <div className='flex gap-2 text-textSecondaryColor'>
          <FiEdit3 className='text-[16px] hover:text-textColor' />
          <FiTrash2
            className='text-[16px] hover:text-textColor'
            onClick={removeChat}
          />
        </div>
      )}
    </Link>
  );
};

export default ChatRow;
