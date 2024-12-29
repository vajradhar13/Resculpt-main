import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../utils/types";
import cloudinary from "../utils/cloudinary";
import { wasteRequirementSchema } from "@abhiram2k03/resculpt";

const prisma = new PrismaClient();
const WasteRequirement = prisma.wasteRequirement;


export const addWasteRequirement = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { image, name, description, price, initialQuantity, color, weight, length, width, height} = wasteRequirementSchema.parse(req.body);
    const userId = req.user?.id;
    if(image){
      const uploadRes = await cloudinary.uploader.upload(image);
      if(uploadRes){
        const waste_requirement = await WasteRequirement.create({
          data: {
            image,
            name,
            description,
            price,
            initialQuantity,
            requiredQuantity: initialQuantity,
            color,
            weight,
            length,
            width,
            height,
            uploaderId: userId!,
          },
        });
    
        return res.status(201).json({ msg: "Requirement uploaded successfully" });
      }
      else{
        return res.status(400).json({ error: "Error uploading image" });
      }
    }
    else{
      return res.status(400).json({ msg: "Image data is required" });
    }
    
  } catch (error: any) {
    if (error.errors && error.errors[0].message) {
      const message = error.errors[0].message;
      return res.status(400).json({ msg: message });
    }
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getAllWasteRequirements = async (req: Request, res: Response) => {
  try {
    const wasteRequirements = await WasteRequirement.findMany();

    return res.status(200).json(wasteRequirements);
  } catch (error: any) {
    if (error.errors && error.errors[0].message) {
      const message = error.errors[0].message;
      return res.status(400).json({ msg: message });
    }
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getWasteRequirements = async (req: Request, res: Response) => {
  try {
    const wasteRequirements = await WasteRequirement.findMany({
      where: {
        requiredQuantity: {
          not: 0,
        },
      },
    });

    return res.status(200).json(wasteRequirements);
  } catch (error: any) {
    if (error.errors && error.errors[0].message) {
      const message = error.errors[0].message;
      return res.status(400).json({ msg: message });
    }
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getAllSatisfiedRequirements = async (req: Request, res: Response) => {
  try {
    const wasteRequirements = await WasteRequirement.findMany({
      where: {
        requiredQuantity: 0,
      },
    });

    return res.status(200).json(wasteRequirements);
  } catch (error: any) {
    if (error.errors && error.errors[0].message) {
      const message = error.errors[0].message;
      return res.status(400).json({ msg: message });
    }
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};


export const wasteReq = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const reqIdNum = parseInt(id, 10); // Convert id to a number

    const requirement = await WasteRequirement.findFirst({
      where: {
        requirementId: reqIdNum,
      },
    });

    // Check if the requirement was found
    if (!requirement) {
      return res.status(404).json({ msg: "Requirement not found" });
    }

    return res.status(200).json(requirement);
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};