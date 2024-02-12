// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Button from "@mui/material/Button";
// import { Box } from "@mui/material";
// import { UserAuth } from "@/app/auth/AuthContext";
// const Page = () => {
//   const router = useRouter();
//   const { user, signInWithGoogle } = UserAuth();
//   // console.log("User", user);
//   useEffect(() => {
//     if (user) {
//       router.push("/");
//     }
//   }, [user, router]);

//   const handleSignIn = async () => {
//     try {
//       await signInWithGoogle();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <Box sx={{ marginTop: "80px" }}>
//         <div>Client Login Page</div>
//         <Button onClick={handleSignIn}>Sign in with Google</Button>
//       </Box>
//     </>
//   );
// };

// export default Page;

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import { UserAuth } from "@/app/auth/AuthContext";

const Page = () => {
  const router = useRouter();
  const { user, signInWithGoogle } = UserAuth();

  // useEffect(() => {
  //   // Assuming `user` is updated asynchronously somewhere after successful sign-in
  //   if (user) {
  //     router.push("/");
  //   }
  // }, [user, router]); // Depend on `user` to ensure it's updated before running this effect

  useEffect(() => {
    if (user) {
      console.log("USER HAS SIGNED IN", user);
      // This ensures we only make the API call when user data is available
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
        .then((data) => console.log(data))
        .then(console.log("Successfully posted user login info to MongoDB"))
        .catch((error) => console.error("Error storing user:", error));

      router.push("/");
    }
  }, [user, router]); // Depend on `user` to ensure it's updated before running this effect

  const handleSignIn = async () => {
    try {
      console.log("SIGNING IN");
      await signInWithGoogle();
      // console.log("TO POST:", user.uid, user.email, user.displayName);
      console.log("USER HAS SIGNED IN");
      // Now make the API call here or ensure this effect runs after user is updated
      if (user) {
        // Assuming 'user' contains the Firebase user object after successful sign-in
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
        });
      } else {
        console.log("NO USER FOUND TO POST");
      }
    } catch (err) {
      console.error(err);
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
      <Box
        sx={{
          marginBottom: "20vh",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          display: "flex",
        }}
      >
        <Box>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Welcome to Tutor Plus
          </Typography>
          {/* <Typography variant="subtitle1">Studying made easy</Typography> */}
        </Box>

        <Button
          variant="outlined"
          onClick={handleSignIn}
          sx={{ textTransform: "none" }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Box>
  );
};

export default Page;
