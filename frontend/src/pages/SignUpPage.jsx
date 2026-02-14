import { useState } from "react";
import { ApertureIcon } from "lucide-react";
import { Link } from "react-router";

import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // This is how we did it at first, without using our custom hook
  // const queryClient = useQueryClient();
  // const {
  //   mutate: signupMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: signup,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  // This is how we did it using our custom hook - optimized version
  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

return (
  <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#0F172A]">
    <div className="border border-blue-500/20 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-[#111827] rounded-xl shadow-2xl overflow-hidden">
      
      {/* SIGNUP FORM - LEFT SIDE */}
      <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
        
        {/* LOGO */}
        <div className="mb-4 flex items-center justify-start gap-2">
          <ApertureIcon className="size-9 text-blue-500" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 tracking-wider">
            Voxera
          </span>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error.response?.data?.message}</span>
          </div>
        )}

        <div className="w-full">
          <form onSubmit={handleSignup}>
            <div className="space-y-4">
              
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Create an Account
                </h2>
                <p className="text-sm text-gray-400">
                  Join Voxera and start your language learning adventure!
                </p>
              </div>

              <div className="space-y-3">

                {/* FULLNAME */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-gray-300">Full Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input input-bordered w-full bg-[#1E293B] border-blue-500/30 text-white"
                    value={signupData.fullName}
                    onChange={(e) =>
                      setSignupData({ ...signupData, fullName: e.target.value })
                    }
                    required
                  />
                </div>

                {/* EMAIL */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-gray-300">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@gmail.com"
                    className="input input-bordered w-full bg-[#1E293B] border-blue-500/30 text-white"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-gray-300">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="********"
                    className="input input-bordered w-full bg-[#1E293B] border-blue-500/30 text-white"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Password must be at least 6 characters long
                  </p>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm checkbox-primary"
                      required
                    />
                    <span className="text-xs text-gray-400 leading-tight">
                      I agree to the{" "}
                      <span className="text-blue-500 hover:underline">
                        terms of service
                      </span>{" "}
                      and{" "}
                      <span className="text-blue-500 hover:underline">
                        privacy policy
                      </span>
                    </span>
                  </label>
                </div>
              </div>

              <button
                className="btn w-full bg-blue-600 hover:bg-blue-700 border-none text-white"
                type="submit"
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-[#1E293B] items-center justify-center">
        <div className="max-w-md p-8">
          <div className="relative aspect-square max-w-sm mx-auto">
            <img
              src="/i.png"
              alt="Language connection illustration"
              className="w-full h-full"
            />
          </div>

          <div className="text-center space-y-3 mt-6">
            <h2 className="text-xl font-semibold text-white">
              Connect with language partners worldwide
            </h2>
            <p className="text-gray-400">
              Practice conversations, make friends, and improve your language skills together
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);


};

export default SignUpPage;