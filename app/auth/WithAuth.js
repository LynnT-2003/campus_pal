// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from 'react';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { UserAuth } from './AuthContext';

// function withAuth(Component) {
//   return function AuthenticatedComponent(props) {
//     const router = useRouter();
//     const { user } = UserAuth();
//     const [isAuthChecked, setIsAuthChecked] = useState(false);
//     const auth = getAuth();

//     useEffect(() => {
//       const unsubscribe = onAuthStateChanged(auth, (user) => {
//         if (!user) {
//           router.push('/client/Login'); // Redirect to login if no user
//         } else {
//           setIsAuthChecked(true); // Auth state confirmed, allow rendering
//         }
//       });

//       return () => unsubscribe(); // Cleanup subscription on unmount
//     }, [router]);

//     // Prevent rendering until the auth check is complete
//     if (!isAuthChecked) {
//       return null; // or a loading indicator
//     }

//     // Render the component only after auth check is complete
//     return <Component {...props} />;
//   };
// }

// export default withAuth;


"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserAuth } from './AuthContext';

function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user: contextUser } = UserAuth(); // Assuming this is updated after auth changes
    const router = useRouter();
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const auth = getAuth();

    useEffect(() => {
      // Immediately use context user if available
      if (contextUser) {
        setIsAuthChecked(true);
        return;
      }

      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (!firebaseUser) {
          router.push('/client/Login'); // Redirect if no user
        } else {
          setIsAuthChecked(true); // Auth state confirmed, allow rendering
        }
      });

      return () => unsubscribe(); // Cleanup on unmount
    }, [contextUser, router]);

    if (!isAuthChecked) {
      return null; // or a more user-friendly loading indicator
    }

    return <Component {...props} />;
  };
}

export default withAuth;

