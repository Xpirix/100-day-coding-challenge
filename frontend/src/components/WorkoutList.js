import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import AddWorkoutForm from "./AddWorkoutForm";

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("/workouts/");
        setWorkouts(response.data);
      } catch (err) {
        setError("Could not fetch workouts. Please try again later.");
      }
    };

    fetchWorkouts();
  }, []);

  const handleWorkoutAdded = (newWorkout) => {
    setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-8">Workouts</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <AddWorkoutForm onWorkoutAdded={handleWorkoutAdded} />
      <ul className="bg-white shadow-md rounded-lg p-6">
        {workouts.map((workout) => (
          <li
            key={workout.id}
            className="flex justify-between items-center border-b last:border-none py-4"
          >
            <span className="font-bold">{workout.name}</span>
            <span>{workout.duration} minutes</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutList;
