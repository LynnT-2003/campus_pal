"use client";

import React from "react";
import Button from "@mui/material/Button";
import { signInWithGoogle } from "@/app/Firebase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for authentication status on component mount
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle(setIsLoggedIn);
    } catch (err) {
      console.log(err);
    }
  };

  // Check if user is logged in and redirect to /client/Landing if true
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/client/Landing");
    }
  }, [isLoggedIn, router]);

  return (
    <>
      <div>Client Login Page</div>
      <Button onClick={handleSignIn}>Sign in with Google</Button>
      {/* {isLoggedIn && (
        <>
          <Landing setIsLoggedIn={setIsLoggedIn} />
        </>
      )} */}
    </>
  );
};

export default Page;
