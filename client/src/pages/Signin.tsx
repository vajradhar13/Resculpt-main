import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { TextLink } from "../components/TextLink";
import { useState } from "react";
import axios from "axios";
import { SigninInput } from "@abhiram2k03/resculpt";
import Lottie from "lottie-react";
import signinAnimation from "../assets/signin.json";
import { Loading } from "../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signin = () => {
  const [signinData, setSigninData] = useState<SigninInput>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(signinData);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signin`, signinData);
      window.localStorage.setItem("loggedIn", "true");
      if (response.data.msg === "Signin successful") {
        toast.success(response.data.msg, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/");
        window.location.reload();
        
      } else {
        toast.error(response.data.msg, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSigninData({ ...signinData, [name]: value });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-center gap-32 items-center min-h-screen">
          <div className="flex justify-center items-center">
            <div className="w-96 h-96">
              <Lottie animationData={signinAnimation} />
            </div>
          </div>
          <div className="border bg-white p-8 rounded-xl shadow-xl text-center">
            <Heading text={"Sign In"} />
            <SubHeading text={"Sign in to your account"} />
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
            <div className="flex justify-end">
              <TextLink text={"Forgot password?"} linkTo={"/forgotpassword"} />
            </div>
            <Button text="Submit" onClick={handleSubmit} />
            <div className="flex justify-end">
              <TextLink text={"Don't have an account?"} linkTo={"/signup"} />
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};
