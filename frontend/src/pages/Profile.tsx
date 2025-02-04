import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateUserProfile } from "../api/auth";

const Profile: React.FC = () => {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState(auth?.user?.username || "");
  const [password, setPassword] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateUserProfile(username, password);
    if (success) alert("Profile updated successfully!");
    else alert("Failed to update profile");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded mt-4"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;