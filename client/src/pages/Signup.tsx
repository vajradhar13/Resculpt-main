import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { TextLink } from "../components/TextLink";
import { useState } from "react";
import axios from "axios";
import { SignupInput } from "@abhiram2k03/resculpt";
import Lottie from "lottie-react";
import signupAnimation from "../assets/signup.json";
import { Loading } from "../components/Loading";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
  const [signupData, setSignupData] = useState<SignupInput>({
    username: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    // Client-side validation for password match
    if (signupData.password !== signupData.cPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "light",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/auth/signup`,
        signupData
      );

      // Successful signup
      if (response.data.msg === "User created Successfully") {
        console.log(response.data);

        window.localStorage.setItem("loggedIn", "true");
        toast.success("Account created successfully! Redirecting...", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          theme: "light",
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/");
      }
    } catch (error: any) {
      // Handle known error responses from backend
      if (error.response) {
        const { data, status } = error.response;

        // User already exists
        if (status === 400 && data.msg === "User already exists") {
          toast.warning(
            "An account with this email already exists. Please sign in instead.",
            {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              theme: "light",
            }
          );
        }
        // Validation errors (from Zod)
        else if (data.msg && status === 400) {
          toast.error(`Validation error: ${data.msg}`, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            theme: "light",
          });
        }
        // Other 400 errors
        else if (status === 400) {
          toast.error(
            data.msg || "Invalid request. Please check your details.",
            {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              theme: "light",
            }
          );
        }
        // Server errors
        else if (status >= 500) {
          toast.error(
            "Our servers are currently busy. Please try again later.",
            {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              theme: "light",
            }
          );
        }
      }
      // Network errors or other issues
      else {
        toast.error(
          "Couldn't connect to our servers. Check your internet connection.",
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            theme: "light",
          }
        );
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex justify-center items-center">
            <div className="w-96 h-96">
              <Lottie animationData={signupAnimation} />
            </div>
          </div>
          <div className="mx-16 border bg-white p-8 rounded-xl shadow-xl text-center">
            <Heading text={"Signup"} />
            <SubHeading text={"Enter your details to create an account"} />
            <InputBox
              type="text"
              label="Username"
              placeholder="John"
              name="username"
              onChange={handleChange}
            />
            <InputBox
              type="email"
              label="Email"
              placeholder="john123@gmail.com"
              name="email"
              onChange={handleChange}
            />
            <InputBox
              type="password"
              label="Password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            <InputBox
              type="password"
              label="Confirm Password"
              placeholder="re-enter same password"
              name="cPassword"
              onChange={handleChange}
            />
            <Button text="Submit" onClick={handleSubmit} />
            <div className="flex justify-end">
              <TextLink text="Already have an account?" linkTo="/signin" />
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};
