import React, { useEffect, useState } from "react";
import axios from "../api/axios";

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

  return (
    <div>
      <h1>Workouts</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            <strong>{workout.name}</strong> - {workout.duration} minutes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutList;
