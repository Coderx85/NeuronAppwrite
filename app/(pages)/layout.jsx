"use client"
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import authService from "@/services/appwrite";
import { AuthProvider } from "@/context/authContext";

const ProtectedLayout = ({children}) => {

  const [authStatus, setAuthStatus] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    authService.isLoggedIn()
      .then(setAuthStatus)
      .finally(() => setLoader(false));
  }, []);

  return (
    <AuthProvider value={{ authStatus, setAuthStatus }}>
      {!loader && (
        <>
          <Navbar />
          {children}
        </>
      )}  
    </AuthProvider>
  );
}

export default ProtectedLayout;