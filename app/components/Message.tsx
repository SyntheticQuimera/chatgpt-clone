import { DocumentData } from "firebase/firestore";

type Props = {
  message: DocumentData;
};

const Message = ({ message }: Props) => {
  const isChatGPT = message.user.name === "chatGPT";
  const preResponse = message.text.replace(/\n\n/, "");
  const response = () => {
    if (preResponse.includes("```")) {
      const splitResponse = preResponse.split("```");
      const codeBlocks = splitResponse.filter(
        (_: any, index: any) => index % 2 !== 0
      );
      const textBlocks = splitResponse.filter(
        (_: any, index: any) => index % 2 === 0
      );
      const blocks = textBlocks.reduce((acc: any, text: any, index: any) => {
        return [
          ...acc,
          text,
          <div className='flex max-w-[300px] overflow-x-scroll rounded-lg bg-black p-4 scrollbar-thin sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl'>
            <pre>{codeBlocks[index]}</pre>,
          </div>,
        ];
      }, []);
      return <div>{blocks.slice(0, -1)}</div>;
    } else {
      return <p>{preResponse}</p>;
    }
  };

  return (
    <div className={`py-6 ${isChatGPT && "bg-respBackground"}`}>
      <div className='flex max-w-4xl space-x-5 px-4 md:mx-auto md:px-12'>
        <img src={message.user.avatar} alt='' className='h-8 w-8' />
        <p className='whitespace-pre-line pt-1 text-base'>{response()}</p>
      </div>
    </div>
  );
};

export default Message;
