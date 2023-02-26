import { FiAlertTriangle, FiSun, FiZap } from "react-icons/fi";

const StartInfo = () => {
  return (
    <main className='mt-28 flex flex-col items-center justify-start py-6 px-2 md:mt-0 md:justify-center'>
      <h1 className='mb-12 text-4xl font-semibold md:mb-20'>ChatGPT</h1>
      <div className='flex flex-col gap-[14px] md:flex-row'>
        <div>
          <div className='mb-5 flex flex-row  items-center  justify-center gap-4 md:flex-col md:gap-2'>
            <FiSun className='text-2xl' />
            <h2 className='text-lg'>Examples</h2>
          </div>
          <div className='flex flex-col space-y-[14px]'>
            <button className='infoText'>
              "Explain quantum computing in simple terms"
            </button>
            <button className='infoText'>
              "Got any creative ideas for a 10 year old’s birthday?"
            </button>
            <button className='infoText'>
              "How do I make an HTTP request in Javascript?"
            </button>
          </div>
        </div>

        <div>
          <div className='mb-5 flex  flex-row items-center  justify-center gap-4 md:flex-col md:gap-2'>
            <FiZap className='text-2xl' />
            <h2 className='text-lg'>Capabilities</h2>
          </div>
          <ul className='space-y-[14px]'>
            <li className='infoText'>
              Remembers what user said earlier in the conversation
            </li>
            <li className='infoText'>
              Allows user to provide follow-up corrections
            </li>
            <li className='infoText'>
              Trained to decline inappropriate requests
            </li>
          </ul>
        </div>

        <div>
          <div className='mb-5 flex flex-row  items-center  justify-center gap-4 md:flex-col md:gap-2'>
            <FiAlertTriangle className='text-2xl' />
            <h2 className='text-lg'>Limitations</h2>
          </div>
          <ul className='space-y-[14px]'>
            <li className='infoText'>
              May occasionally generate incorrect information
            </li>
            <li className='infoText'>
              May occasionally produce harmful instructions or biased content
            </li>
            <li className='infoText'>
              Limited knowledge of world and events after 2021
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default StartInfo;
