// "use client"
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
//     setIsLoggedIn(!!storedIsLoggedIn);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true); // Add a loading state
  const [user, setUser] = useState(null);
  // const [user, setUser] = useState<FirebaseUser | null | false>(false);
  // console.log(user)

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      // const token = result.credential.accessToken;
      const user = result.user;
      // postSignInData(user);
    });
  };

  const logOut = () => {
    signOut(auth);
  };

  // const postSignInData = (user) => {
  //   console.log("POSTING FROM AUTH ITSELF:", user);
  //   console.log(user.uid, user.email, user.displayName);
  //   fetch("/api/storeUser", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       uid: user.uid,
  //       email: user.email,
  //       displayName: user.displayName,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log("Success:", data))
  //     .catch((error) => console.error("Error:", error));
  // };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });

  //   // Cleanup the listener on unmount
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false once the user is set
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logOut, loading }}>
      {/* {console.log('Auth Context Details',{ user, signInWithGoogle, logOut })} */}
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(AuthContext);
  // console.log("userauth context",context);
  return context;
};
