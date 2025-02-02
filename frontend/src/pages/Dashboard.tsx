import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-700">🏋️ Workout Tracker</h1>
        <button
          onClick={authContext?.logout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>

      {/* Dashboard Content */}
      <div className="w-full max-w-4xl p-6 mt-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {authContext?.user?.username}! 🎉</h2>
        <p className="text-gray-600">Here is your workout progress:</p>

        {/* Placeholder for workout stats */}
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Total Workouts</h3>
            <p className="text-2xl mt-2">12</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Calories Burned</h3>
            <p className="text-2xl mt-2">4,500 kcal</p>
          </div>
        </div>

        {/* CTA to add new workout */}
        <div className="mt-6 flex justify-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            + Add New Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;