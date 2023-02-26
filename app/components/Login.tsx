"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import logo from "../../assets/chatgpt-logo.svg";
const Login = () => {
  return (
    <div className='flex h-screen items-center justify-center bg-background text-base text-textColor'>
      <div className='flex flex-col items-center justify-center gap-2 px-8'>
        <Image className='mb-4' src={logo} width={41} height={41} alt='logo' />
        <p>Welcome to ChatGPT</p>
        <p>Log in with your OpenAI account to continue</p>
        <button
          onClick={() => signIn("google")}
          className='mt-2 w-full rounded-md bg-buttonColor py-2 px-3 hover:bg-buttonHoverColor'>
          Log in
        </button>
      </div>
    </div>
  );
};

export default Login;
