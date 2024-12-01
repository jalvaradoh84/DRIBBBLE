import React from 'react';
import { signInWithGoogle } from "../../utils/firebaseAuth";

const AuthProviders = () => {
  return (
    <button 
      onClick={signInWithGoogle}
      className="text-sm text-gray-600 hover:text-gray-900"
    >
      Sign In
    </button>
  );
};

export default AuthProviders;
