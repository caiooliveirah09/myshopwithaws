"use client";
import { checkIsPublicRoute } from "@/session/checkIsPublicRoute";
import { getSession } from "@/session/getSession";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SessionContext = React.createContext({});

export default function Session ({children }: {children: React.ReactNode }) {
  const [userAuthenticated, setUserAuthenticated] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isPublicPage = checkIsPublicRoute(pathname);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const session = await getSession();
        setUserAuthenticated(session);
        if (!isPublicPage && !session) {
          return router.push('/login');
        }
        if (pathname === '/login' || pathname === '/register' && session) {
          return router.push('/');
        }
      } catch (error) {
        if(pathname === '/register') {
          return;
        }
        return router.push('/login');
      }
    };
    checkAuthentication(); 
  }, [])
  
  return (
    <SessionContext.Provider value={{ userAuthenticated }}>
      {isPublicPage && children}
      {!isPublicPage && userAuthenticated && children}
    </SessionContext.Provider>
  )
}

export const useSession = () => React.useContext(SessionContext);