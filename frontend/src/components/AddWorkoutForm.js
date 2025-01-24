import React, { useState } from "react";
import axios from "../api/axios";

const AddWorkoutForm = ({ onWorkoutAdded }) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    if (!name) return "Workout name is required.";
    if (!duration) return "Workout duration is required.";
    if (isNaN(duration) || parseInt(duration) <= 0)
      return "Duration must be a positive number.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setSuccessMessage("");
      return;
    }

    try {
      const response = await axios.post("/workouts/", {
        name,
        duration: parseInt(duration),
      });
      onWorkoutAdded(response.data);
      setName("");
      setDuration("");
      setError("");
      setSuccessMessage("Workout added successfully!");
    } catch (err) {
      setError("Failed to add workout. Please try again later.");
      setSuccessMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-xl font-bold mb-4">Add a New Workout</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 text-sm mb-4">{successMessage}</p>
      )}
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
        Add Workout
      </button>
    </form>
  );
};

export default AddWorkoutForm;
