const Login = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-white/10 bg-zinc-950 rounded-2xl p-8 shadow-2xl">
        
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Login</h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Welcome back. Enter your credentials.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl bg-black border border-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-white transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl bg-black border border-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-white transition-all duration-300"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-zinc-400 cursor-pointer">
              <input
                type="checkbox"
                className="accent-white"
              />
              Remember me
            </label>

            <button
              type="button"
              className="text-zinc-400 hover:text-white transition"
            >
              Forgot password?
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition-all duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <span className="text-white cursor-pointer hover:underline">
            SignUp
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;