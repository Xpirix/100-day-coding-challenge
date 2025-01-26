import React, { useState } from "react";
import axios from "../api/axios";

const EditWorkoutForm = ({ workout, onWorkoutUpdated }) => {
  const [name, setName] = useState(workout.name);
  const [duration, setDuration] = useState(workout.duration);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !duration) {
      setError("All fields are required.");
      return;
    }
    if (isNaN(duration) || parseInt(duration) <= 0) {
      setError("Duration must be a positive number.");
      return;
    }
    try {
      const response = await axios.put(`/workouts/${workout.id}/`, {
        name,
        duration: parseInt(duration),
      });
      onWorkoutUpdated(response.data);
    } catch (err) {
      setError("Failed to update workout. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-md mt-4">
      <h2 className="text-xl font-bold mb-4">Edit Workout</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Workout Name:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Duration (minutes):
        </label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Update Workout
      </button>
    </form>
  );
};

export default EditWorkoutForm;
