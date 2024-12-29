// import { useNavigate } from "react-router-dom";
// import { Button } from "../components/Button";
// import { Heading } from "../components/Heading";
// import { InputBox } from "../components/InputBox";
// import { SubHeading } from "../components/SubHeading";
// import { TextLink } from "../components/TextLink";
// import { useState } from "react";
// import axios from "axios";
// import { SignupInput } from "@abhiram2k03/resculpt";
// import Lottie from "lottie-react";
// import signupAnimation from "../assets/signup.json";
// import { Loading } from "../components/Loading";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export const Signup = () => {
//   const [signupData, setSignupData] = useState<SignupInput>({
//     username: "",
//     email: "",
//     password: "",
//     cPassword: "",
//   });
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   axios.defaults.withCredentials = true;
//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//   const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setLoading(true); 

//     try {
//       const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signup`, {
//         username: signupData.username,
//         email: signupData.email,
//         password: signupData.password,
//         cPassword: signupData.cPassword,
//       });
//       console.log(response.data)
//       if (response.data.msg === "User created Successfully") {
//         window.localStorage.setItem("loggedIn", "true");
//         toast.success(response.data.msg, {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//         await new Promise((resolve) => setTimeout(resolve, 2000));
//         navigate("/home");
//       }
//       else{
//         toast.error(response.data.msg, {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//       }
//     } catch (e) {
//       console.log(e);
//     } finally {
//       setLoading(false); 
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
//     const {name, value} = e.target;
//     setSignupData({...signupData, [name]: value})
//   }

//   return (
//     <>
//       {loading ? ( // Conditionally render the Loading component or the form
//         <>
//           <Loading />
//         </>
//       ) : (
//         <>
//           <div className="flex justify-center items-center min-h-screen">
//             <div className="flex justify-center items-center">
//               <div className="w-96 h-96">
//                 <Lottie animationData={signupAnimation} />
//               </div>
//             </div>
//             <div className="mx-16 border bg-white p-8 rounded-xl shadow-xl text-center">
//               <Heading text={"Signup"} />
//               <SubHeading text={"Enter your details to create an account"} />
//               <InputBox
//                 type="text"
//                 label="Username"
//                 placeholder="John"
//                 name="username"
//                 onChange={handleChange}
//               />
//               <InputBox
//                 type="email"
//                 label="Email"
//                 placeholder="john123@gmail.com"
//                 name="email"
//                 onChange={handleChange}
//               />
//               <InputBox
//                 type="password"
//                 label="Password"
//                 placeholder="password"
//                 name="password"
//                 onChange={handleChange}
//               />
//               <InputBox
//                 type="password"
//                 label="Confirm Password"
//                 placeholder="re-enter same password"
//                 name="cPassword"
//                 onChange={handleChange}
//               />
//               <Button text="Submit" onClick={handleSubmit} />
//               <div className="flex justify-end">
//                 <TextLink text="Already have an account?" linkTo="/signin" />
//               </div>
//             </div>
//           </div>
          
//         </>
//       )}
//       <ToastContainer />
//     </>
//   );
// };




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
    console.log(signupData)

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signup`, signupData);
      console.log(response.data);
      if (response.data.msg === "User created Successfully") {
        window.localStorage.setItem("loggedIn", "true");
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

