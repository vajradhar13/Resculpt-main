import { z } from "zod";

export const signupSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password should contain a minimum of 8 characters" }),
    cPassword: z.string().min(8, { message: "Password should contain a minimum of 8 characters" })
});

export const signinSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password should contain a minimum of 8 characters" })
});

export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address" })
});

export const resetPasswordSchema = z.object({
    password: z.string().min(8, { message: "Password should contain a minimum of 8 characters" }),
    cPassword: z.string().min(8, { message: "Password should contain a minimum of 8 characters" })
});

export const wasteRequirementSchema = z.object({
    requirementId: z.number().optional(),
    image: z.string().min(1,{ message: "Image URL is required" }),
    name: z.string().min(1,{ message: "Name is required" }),
    description: z.string().min(1,{ message: "Description is required" }),
    price: z.number().min(0,{ message: "Price is required" }),
    initialQuantity: z.number().min(1,{ message: "Initial quantity is required" }),
    requiredQuantity: z.number().min(1,{ message: "Required quantity is required" }),
    color: z.string().optional(),
    weight: z.number().optional(),
    length: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional()
});

export const innovativeProdSchema = z.object({
    productId: z.number().optional(),
    image: z.string().min(1,{ message: "Image URL is required" }),
    name: z.string().min(1,{ message: "Name is required" }),
    description: z.string().min(1,{ message: "Description is required" }),
    price: z.number().min(1,{ message: "Price is required" }),
    quantity: z.number().min(1,{ message: "Quantity is required" }),
    color: z.string().optional(),
    material: z.string().optional(),
    weight: z.number().optional(),
    length: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional()
});

export const contributionSchema = z.object({
    id: z.number().optional(),
    mobile: z.string().min(1,{ message: "Mobile number is required" }),
    quantity: z.number().min(1,{ message: "Quantity is required" }),
    address: z.string().min(1,{ message: "Address is required" })
});

// Types for the schemas
export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type AddInnovativeProdInput = z.infer<typeof innovativeProdSchema>;
export type AddWasteRequirementInput = z.infer<typeof wasteRequirementSchema>;
export type ContributionInput = z.infer<typeof contributionSchema>;
