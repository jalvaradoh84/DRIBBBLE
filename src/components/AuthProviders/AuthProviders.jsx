import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Auth from "../Auth/Auth";

const auth = getAuth();

const AuthProviders = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <img 
          src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}`} 
          alt="Profile" 
          className="w-8 h-8 rounded-full"
        />
        <p className="text-sm">Welcome, {user.displayName || user.email}!</p>
      </div>
    );
  }

  return <Auth />;
};
export default AuthProviders;