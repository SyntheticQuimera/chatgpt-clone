import "./globals.css";
import SessionProvider from "./components/SessionProvider";
import SideBar from "./components/SideBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Login from "./components/Login";
import ClientProvider from "./components/ClientProvider";
import Header from "./components/Header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <head />
      <body className=''>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className='flex text-textColor'>
              <div className='hidden md:inline'>
                <SideBar />
              </div>
              <Header />
              <ClientProvider />
              <div className='flex-1 overflow-y-auto bg-background scrollbar-thin scrollbar-track-background scrollbar-thumb-scrollbarThumb hover:scrollbar-thumb-scrollbarThumbHover '>
                {children}
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
