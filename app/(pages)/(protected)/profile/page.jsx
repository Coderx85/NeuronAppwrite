"use client"
import Post from "@/components/Post";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import authService from "@/services/appwrite";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await authService.getCurrentUser();
      setUser(user);
      console.log("Home :: user", user);
    } 
    fetchUser();
  }, [])

  const onClick = async () => { 
    try {
      await authService.logout();
    } catch (error) {
      console.log("Home :: onClick :: error", error);
    }
  }

  return (
    <div className="flex justify-center mt-8">
      {user ? (
        <div>
          <p>Welcome back, {user.name}</p>
          <p>{user.email}</p> 
          <Link href='/logout'>
            Logout
          </Link>
          </div>
      ):(
        <div>
          <p>Hello User, Please Login to continue</p>
        </div>
      )}

    </div>
  );
}
