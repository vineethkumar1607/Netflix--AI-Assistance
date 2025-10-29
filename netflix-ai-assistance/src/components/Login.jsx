import { useState, useRef, useEffect } from "react";
import { validationSchema } from "../utils/validationSchema";
import { firebaseErrorMessages } from "../utils/firebaseErrorMessages";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase'
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import NetflixSpinner from "./NetflixSpinner";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // Unified error handler
  const handleAuthError = (error) => {
    setErrorMessage(firebaseErrorMessages(error.code));
    setIsLoading(false);
  };

  // Unified success handler (DRY implementation)
  const handleAuthSuccess = (user) => {
    dispatch(addUser({
      email: user.email,
      uid: user.uid,
      displayName: user.displayName
    }));
    navigate("/browse");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const userName = !isSignInForm ? name.current?.value : "";
    const userEmail = email.current.value;
    const userPassword = password.current.value;

    // Only validate for sign-up
    if (!isSignInForm) {
      const message = validationSchema(userName, userEmail, userPassword);
      if (message) {
        setErrorMessage(message);
        setIsLoading(false);
        return;
      }
    }

    try {
      if (!isSignInForm) {
        // Sign-up flow
        const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
        await updateProfile(userCredential.user, { displayName: userName });
        handleAuthSuccess(auth.currentUser); // Using currentUser to ensure fresh data
      } else {
        // Sign-in flow
        const userCredential = await signInWithEmailAndPassword(auth, userEmail, userPassword);
        handleAuthSuccess(userCredential.user);
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const toggleSignInForm = (event) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSignInForm(!isSignInForm);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <img
        className="absolute w-full h-full object-cover opacity-65"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/36a4db5b-dec2-458a-a1c0-662fa60e7473/1115a02b-3062-4dcc-aae0-94028a0dcdff/IN-en-20240820-TRIFECTA-perspective_WEB_eeff8a6e-0384-4791-a703-31368aeac39f_large.jpg"
        alt="Netflix Background"
        loading="eager"
      />

      <div className="absolute w-full h-full bg-black opacity-30 z-10"></div>

      <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md p-8 bg-black/80 rounded-md text-white">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <h1 className="text-3xl font-semibold">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <div className="space-y-1">
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                type="text"
                ref={name}
                placeholder="Full Name"
                className="bg-[#333] p-3 rounded text-sm outline-none w-full"
                aria-required="true"
              />
            </div>
          )}

          <div className="space-y-1">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              ref={email}
              placeholder="Email or phone number"
              className="bg-[#333] p-3 rounded text-sm outline-none w-full"
              aria-required="true"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                ref={password}
                placeholder="Password"
                className="bg-[#333] p-3 rounded text-sm outline-none w-full pr-10"
                aria-required="true"
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="text-red-500 text-lg" role="alert" aria-live="assertive">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 p-3 rounded font-semibold disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (<NetflixSpinner />) : (
              isSignInForm ? "Sign In" : "Sign Up"
            )}
          </button>

          <div className="flex justify-between items-center text-sm text-gray-400">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="hover:underline"
              onClick={() => navigate("/reset-password")}
            >
              Need help?
            </button>
          </div>

          <div className="text-gray-400 mt-4 text-sm">
            {isSignInForm ? "New to Netflix?" : "Already registered?"}{" "}
            <button
              onClick={toggleSignInForm}
              className="text-white hover:underline"
              disabled={isLoading}
            >
              {isSignInForm ? "Sign up now." : "Sign in now."}
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;