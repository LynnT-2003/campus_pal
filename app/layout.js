// // 'use client'
// import "./globals.css";
// import { Inter, Chakra_Petch } from "next/font/google";
// import NavBar from "./components/NavBar/page";
// import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
// import { AuthContextProvider } from "./auth/AuthContext";
// import withAuth from "./auth/WithAuth"

// const inter = Inter({ subsets: ["latin"] });
// const chakra = Chakra_Petch({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
// });

// export const metadata = {
//   title: "Tutor Plus",
//   description: "Improve your learning curve",
//   icons: {
//     icon: ["/Logo/favicon.ico?v=4"],
//     apple: ["/Logo/apple-touch-icon.png?v=4"],
//     shortcut: ["/Logo/apple-touch-icon.png"],
//   },
//   manifest: "/Logo/site.webmanifest",
// };

// export default function RootLayout({ children }) {

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {/* {isLoggedIn && <NavBar />} */}
//         <div style={{ marginTop: "80px" }}>
//           <AuthContextProvider>
//               <NavBar />
//               {children}
//           </AuthContextProvider>

//         </div>
//       </body>

//     </html>
//   );
// }
"use client";
import "./globals.css";
import { Inter, Chakra_Petch } from "next/font/google";
import NavBar from "./components/NavBar/page";
import { AuthContextProvider } from "./auth/AuthContext";
import React, { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });
const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    // This ensures code runs only on the client side
    const path = window.location.pathname;
    // Logic to hide NavBar on specific routes
    if (path === "/admin/Dashboard") {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          {showNavBar && <NavBar />}
          <div>{children}</div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
