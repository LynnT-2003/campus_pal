"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import { UserAuth } from "@/app/auth/AuthContext";

const Page = () => {
  const router = useRouter();
  const { user, signInWithGoogle } = UserAuth();

  useEffect(() => {
    if (user) {
      // Assuming user is already signed in and we have the user object
      console.log("User has signed in, attempting to post user info");

      fetch("/api/storeUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Successfully posted user login info to MongoDB", data);
          // Redirect or perform additional actions upon successful POST
          router.push("/");
        })
        .catch((error) => console.error("Error storing user:", error));
    }
  }, [user, router]);

  const handleSignIn = async () => {
    try {
      console.log("Attempting to sign in");
      await signInWithGoogle();
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Typography variant="h3" sx={{ mb: 2 }}>
        Welcome to Tutor Plus
      </Typography>
      <Button
        variant="outlined"
        onClick={handleSignIn}
        sx={{ textTransform: "none" }}
      >
        Sign in with Google
      </Button>
    </Box>
  );
};

export default Page;
