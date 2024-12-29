import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as z from "zod";
import cloudinary from "../utils/cloudinary";
import { AuthenticatedRequest } from "../utils/types";
import { innovativeProdSchema } from "@abhiram2k03/resculpt";

const prisma = new PrismaClient();
const InnovativeProd = prisma.innovativeProduct;

// export const addInnovativeProdSchema = z.object({
//   image: z.string().optional(),
//   name: z.string(),
//   description: z.string(),
//   price: z.number(),
//   quantity: z.number(),
//   color: z.string().optional(),
//   material: z.string().optional(),
//   weight: z.number().optional(),
//   length: z.number().optional(),
//   width: z.number().optional(),
//   height: z.number().optional(),
// });

export const addInnovativeProd = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      image,
      name,
      description,
      price,
      quantity,
      color,
      material,
      weight,
      length,
      width,
      height,
    } = innovativeProdSchema.parse(req.body);
    const userId = req.user?.id;

    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image);
      if (uploadRes) {
        const innovative_products = await InnovativeProd.create({
          data: {
            image,
            name,
            description,
            price,
            quantity,
            color,
            material,
            weight,
            length,
            width,
            height,
            uploaderId: userId!, 
          },
        });
        return res.status(201).json({ msg: "Product uploaded successfully" });
      } 
      else {
        return res.status(400).json({ error: "Error uploading image" });
      }
    } 
    else {
      return res.status(400).json({ msg: "Image data is required" });
    }
  } 
  catch (error: any) {
    if (error.errors && error.errors[0].message) {
      const message = error.errors[0].message;
      return res.status(400).json({ msg: message });
    }
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getAllInnovativeProds = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const innovative_products = await InnovativeProd.findMany();

    return res.status(200).json(innovative_products);
  } catch (error: any) {
    if (error.errors && error.errors[0].message) {
      const message = error.errors[0].message;
      return res.status(400).json({ msg: message });
    }
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const innovativeProd = async (req: AuthenticatedRequest,res: Response) => {
  try {
    const { id } = req.params;
    const productIdNum = parseInt(id, 10); // Convert id to a number

    const innovativeProduct = await InnovativeProd.findFirst({
      where: {
        productId: productIdNum,
      },
    });

    // Check if the product was found
    if (!innovativeProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    return res.status(200).json(innovativeProduct);
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
