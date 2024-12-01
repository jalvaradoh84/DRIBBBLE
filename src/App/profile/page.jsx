import React, { useEffect, useState } from "react";
import ProfilePage from "./components/ProfilePage/ProfilePage"; 
import { getAuth } from "firebase/auth"; 
import { getUserProjects, UserProfile } from "./lib/actions"; 
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchUserProjects = async () => {
      if (id) {
        const {user} = await getUserProjects(id, 100);
        if (user) {
          setUser(user);
        } else {
          console.error("Failed to get user info");
        }
        setLoading(false);
      }
    };

    fetchUserProjects();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    return <div>Failed to get user info</div>;
  }

  return <ProfilePage user={user} />;
};

export default Profile;
