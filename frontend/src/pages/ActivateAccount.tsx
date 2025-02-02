import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8000/auth/";

const ActivateAccount: React.FC = () => {
  const { uid, token } = useParams();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const activateAccount = async () => {
    try {
      await axios.post(`${API_URL}users/activation/`, { uid, token });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: any) {
      setError("Activation failed. Invalid or expired link.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-bold">Account Activation</h2>
        {success ? (
          <p className="text-green-500">Account activated! Redirecting...</p>
        ) : (
          <>
            <p className="text-gray-600">Click below to activate your account:</p>
            <button
              onClick={activateAccount}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md"
            >
              Activate Account
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default ActivateAccount;