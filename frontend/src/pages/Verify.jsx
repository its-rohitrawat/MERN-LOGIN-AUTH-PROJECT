import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
const Verify = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const [type, setType] = useState("Loading"); // loading | success | error
  const navigate = useNavigate();

  const verifyEmail = async () => {
    try {
      const res = await api.post(
        "/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        setStatus("Email verified successfully");
        setType("success");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setStatus("Inavliud or expired token");
        setType("error");
      }
    } catch (error) {
      console.log(error);

      setStatus("VERIFIACTION failed. Please try again");
      setType("error");
    }
  };
  useEffect(() => {
    verifyEmail();
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {type === "loading" && "Verifying..."}
        {type === "success" && "Success..."}
        {type === "error" && "Error..."}
      </h2>

      <p className="text-gray-600 mb-6">{status}</p>

      {type === "loading" && (
        <div className="flex justify-center">
            <div></div>
        </div>
      )}

      {type === "error" && (
        <button
          onClick={verifyEmail}
          className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-700"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
export default Verify;
