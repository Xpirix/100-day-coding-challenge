import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {authContext?.user?.username}!</h1>
      <button
        onClick={authContext?.logout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;