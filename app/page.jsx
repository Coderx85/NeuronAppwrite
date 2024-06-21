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
    <>
    <Navbar />
    <h1 className="text-3xl text-center mt-8">Home</h1>
    <div className="flex justify-center mt-8">
      {user && (
        <div>
          <p>Welcome back, {user.name}</p>
          <p>{user.email}</p> 
          <button onClick={() => onClick()}>Logout</button>
        </div>
      )}
    </div>
    <Post />
    </>
  );
}
