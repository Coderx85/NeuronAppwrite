"use client";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";

const ProtectedLayout = ({children}) => {

  const router = useRouter(); 
  const { authStatus} = useAuth();

  if(!authStatus) {
    router.push('/login');
    return <></>;
  }

  return (
    children
  );
}

export default ProtectedLayout;