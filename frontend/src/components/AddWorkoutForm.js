import React, { useState } from "react";
import axios from "../api/axios";

const AddWorkoutForm = ({ onWorkoutAdded }) => {
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !duration) {
            setError("Please fill out all fields.");
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
        } catch (err) {
            setError("Failed to add workout. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a New Workout</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                <label>Workout Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Duration (minutes):</label>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
            </div>
            <button type="submit">Add Workout</button>
        </form>
    );
};

export default AddWorkoutForm;