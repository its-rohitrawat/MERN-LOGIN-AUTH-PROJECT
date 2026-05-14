import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../config/asiosinstance";
import toast from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });


  const navigate = useNavigate();


  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      let resp = await api.post("/register", formData);
      console.log(resp);
      if (resp.data.success) {
        navigate("/verify")
        toast.success(resp.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("signup failed");
    }
  };
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-white/10 bg-zinc-950 rounded-2xl p-8 shadow-2xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Sign Up</h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Create your account to get started.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handSubmit}>
          {/* Username */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-300" htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-xl bg-black border border-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-white transition-all duration-300"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-300" htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              id="email"
               value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl bg-black border border-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-white transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-300" htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              name="password"
              id="password"
               value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl bg-black border border-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-white transition-all duration-300"
            />
          </div>

          {/* Confirm Password */}
          {/* <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-300">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full rounded-xl bg-black border border-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-white transition-all duration-300"
            />
          </div> */}

          {/* Terms */}
          {/* <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
            <input
              type="checkbox"
              className="accent-white"
            />
            I agree to the terms and conditions
          </label> */}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition-all duration-300"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <span className="text-white cursor-pointer hover:underline">
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
