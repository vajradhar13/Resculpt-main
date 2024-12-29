import { useState } from "react";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Description } from "../components/Description";
import { Button } from "../components/Button";
import axios from "axios";
import { Loading } from "../components/Loading";
import { TextRevealCardPreview } from "../components/text-reveal-cardComponent";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddWasteRequirementInput } from "@abhiram2k03/resculpt";

export const UploadWasteReqPage = () => {
  const [uploadReq, setUploadReq] = useState<AddWasteRequirementInput>({
    image: "",
    name: "",
    description: "",
    price: 0,
    initialQuantity: 0,
    requiredQuantity: 0,
    color: "",
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  axios.defaults.withCredentials = true;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    transformFile(file);
  };

  const transformFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUploadReq({ ...uploadReq, image: reader.result as string });
    };
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      uploadReq.requiredQuantity = uploadReq.initialQuantity;

      const response = await axios.post(`${BACKEND_URL}/addWasteRequirement`, uploadReq);
      setLoading(false);
      if (response.status === 200 || response.status === 201) {
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
      console.error(e.response?.data || e.message);
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
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUploadReq({ ...uploadReq, [name]: name === "price" || name === "initialQuantity" || name === "weight" || name === "length" || name === "width" || name === "height" ? parseFloat(value) : value });
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <>
          <TextRevealCardPreview
            title={"Glad to see you here..."}
            text={"You know the art"}
            revealText={"We give you raw materials"}
          />
          <div className="flex justify-center items-center">
            <div className="bg-white text-black p-8 rounded-3xl shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div>
                <SubHeading text={"Upload Your Waste Requirement details"} />
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-black file:text-white
                  hover:file:bg-black"
                />
                <InputBox
                  label={"Name of the Product Required *"}
                  type={"text"}
                  placeholder={""}
                  name="name"
                  onChange={handleInputChange}
                />
                <InputBox
                  label={"Description of the Product Required *"}
                  type={"text"}
                  placeholder={""}
                  name="description"
                  onChange={handleInputChange}
                />
                <InputBox
                  label={"Price *"}
                  type={"number"}
                  placeholder={""}
                  name="price"
                  onChange={handleInputChange}
                />
                <InputBox
                  label={"Quantity required *"}
                  type={"number"}
                  placeholder={""}
                  name="initialQuantity"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <InputBox
                  label={"Required color"}
                  type={"text"}
                  placeholder={""}
                  name="color"
                  onChange={handleInputChange}
                />
                <InputBox
                  label={"Weight in grams"}
                  type={"number"}
                  placeholder={""}
                  name="weight"
                  onChange={handleInputChange}
                />
                <Description text={"Dimensions of the required product"} />
                <InputBox
                  label={"Length in centimeters"}
                  type={"number"}
                  placeholder={""}
                  name="length"
                  onChange={handleInputChange}
                />
                <InputBox
                  label={"Width in centimeters"}
                  type={"number"}
                  placeholder={""}
                  name="width"
                  onChange={handleInputChange}
                />
                <InputBox
                  label={"Height in centimeters"}
                  type={"number"}
                  placeholder={""}
                  name="height"
                  onChange={handleInputChange}
                />
                <Button text={"Submit"} onClick={handleSubmit} />
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};
