import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import AddWorkoutForm from "./AddWorkoutForm";
import EditWorkoutForm from "./EditWorkoutForm";

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [editingWorkout, setEditingWorkout] = useState(null); // Track the workout being edited;
  const [filter, setFilter] = useState(""); // Filter workouts by name
  const [sortOption, setSortOption] = useState("name"); // Sort workouts by name or duration
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(`/workouts/`, {
          params: {
            search: filter, // Filter by name
            ordering: sortOption, // Sort by name or duration
          },
        });
        setWorkouts(response.data.results); // Adjust for paginated results
      } catch (err) {
        setError("Could not fetch workouts. Please try again later.");
      }
    };

    fetchWorkouts();
  }, [filter, sortOption]); // Re-fetch data when filter or sort changes

  const handleWorkoutAdded = (newWorkout) => {
    setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
  };

  const handleEdit = (workout) => {
    if (editingWorkout && editingWorkout.id === workout.id) {
      setEditingWorkout(null); // Exit edit mode if the same workout is clicked again
    } else {
      setEditingWorkout(workout); // Set the workout to be edited
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/workouts/${id}/`);
      setWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout.id !== id)
      );
    } catch (err) {
      setError("Failed to delete workout. Please try again later.");
    }
  };
  const handleUpdate = (updatedWorkout) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) =>
        workout.id === updatedWorkout.id ? updatedWorkout : workout
      )
    );
    setEditingWorkout(null); // Exit edit mode
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-8">Workouts</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <AddWorkoutForm onWorkoutAdded={handleWorkoutAdded} />
      {/* Filter and Sort Controls */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="shadow border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
        >
          <option value="name">Sort by Name</option>
          <option value="duration">Sort by Duration</option>
        </select>
      </div>
      <ul className="bg-white shadow-md rounded-lg p-6">
        {workouts.map((workout) => (
          <li key={workout.id} className="border-b last:border-none py-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold">{workout.name}: </span>
                <span>{workout.duration} minutes</span>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(workout)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2"
                >
                  {editingWorkout && editingWorkout.id === workout.id
                    ? "Cancel"
                    : "Edit"}
                </button>
                <button
                  onClick={() => handleDelete(workout.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
            {editingWorkout && editingWorkout.id === workout.id && (
              <EditWorkoutForm
                workout={editingWorkout}
                onWorkoutUpdated={handleUpdate}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutList;
