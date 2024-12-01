import React from 'react';
import { signOut } from "../../utils/firebaseAuth";

const ProfileMenu = ({ session }) => {
  return (
    <div className="flex items-center gap-4">
      <img 
        src={session.photoURL} 
        alt="profile" 
        className="w-10 h-10 rounded-full"
      />
      <button 
        onClick={signOut}
        className="text-sm text-gray-600 hover:text-gray-900"
      >
        Sign Out
      </button>
    </div>
  );
};

export default ProfileMenu;
