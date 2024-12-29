import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { useState } from "react";
import axios from "axios";
import { ResetPasswordInput } from "@abhiram2k03/input-validation";
import { useNavigate } from "react-router-dom";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const ResetPassword = () => {
  const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordInput>({
    password: "",
    cPassword: ""
  })

  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/resetpassword/:token`, {
        password: resetPasswordData.password,
        cPassword: resetPasswordData.cPassword,
      });
      if(response.status == 200 || response.status == 201){
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
      }
      else{
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
    }
  };

  return (
    <>
    <div className="flex justify-center items-center min-h-screen">
      <div className="border bg-white p-8 rounded-xl shadow-xl text-center">
        <Heading text={"Reset Password"} />
        
        <InputBox
          type="password"
          label="Password"
          placeholder="password"
          onChange={(e) => {
            setResetPasswordData({
              ...resetPasswordData,
              password: e.target.value
            })
          }}
        />

        <InputBox
          type="password"
          label="Confirm Password"
          placeholder="re-enter same password"
          onChange={(e) => {
            setResetPasswordData({
              ...resetPasswordData,
              cPassword: e.target.value
            })
          }}
        />
        
        <Button text="Submit" onClick={handleSubmit} />

      </div>
    </div>
    <ToastContainer/>
    </>
  );
};