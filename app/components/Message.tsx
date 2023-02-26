import { DocumentData } from "firebase/firestore";

type Props = {
  message: DocumentData;
};

const Message = ({ message }: Props) => {
  const isChatGPT = message.user.name === "chatGPT";
  return (
    <div className={`py-6 ${isChatGPT && "bg-respBackground"}`}>
      <div className='mx-auto flex max-w-4xl space-x-5 px-12'>
        <img src={message.user.avatar} alt='' className='h-8 w-8' />
        <p className='pt-1 text-base'>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
