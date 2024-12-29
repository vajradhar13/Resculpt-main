import { useState } from "react";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TextRevealCardPreview } from "../components/text-reveal-cardComponent";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContributionInput } from "@abhiram2k03/resculpt";
import { Loading } from "../components/Loading";

export const ContributePage = () => {
  const { id } = useParams<{ id: string }>();

  const [contribution, setContribution] = useState<ContributionInput>({
    mobile: "", 
    quantity: 0, 
    address: ""
  });
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/contribution/${id}`,contribution);
      if (response.data.msg === "Contribution uploaded successfully") {
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
    } catch (e: any) {
      toast.error(e.response?.data?.msg || "An error occurred", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContribution({
      ...contribution,
      [name]: name === "quantity" ? parseInt(value) : value,
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <TextRevealCardPreview
            title={"Glad to see you here..."}
            text={"I have a message for you"}
            revealText={"You are saving Earth"}
          />
          <div className="flex justify-center items-center">
            <div className="inline-block bg-white text-black p-8 rounded-3xl shadow-2xl">
              <SubHeading text={"Contribution Details"} />
              <InputBox
                label={"Contact:"}
                type={"text"}
                name="mobile"
                placeholder={""}
                onChange={handleInputChange}
              />
              <InputBox
                label={"Quantity:"}
                type={"number"}
                name="quantity"
                placeholder={""}
                onChange={handleInputChange}
              />
              <InputBox
                label={"Address:"}
                type={"text"}
                name="address"
                placeholder={""}
                onChange={handleInputChange}
              />
              <div className="flex justify-center mt-5">
                <Button text={"Contribute"} onClick={handleSubmit} />
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};
