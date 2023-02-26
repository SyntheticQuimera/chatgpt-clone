import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";

const NewChat = () => {
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
    <div
      onClick={createNewChat}
      className='sideBarRow mb-2 border border-white/20'>
      <FiPlus className='text-[16px]' />
      <p>New chat</p>
    </div>
  );
};

export default NewChat;
