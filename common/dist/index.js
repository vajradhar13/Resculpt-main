"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contributionSchema = exports.innovativeProdSchema = exports.wasteRequirementSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, { message: "Username is required" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(8, { message: "Password should contain a minimum of 8 characters" }),
    cPassword: zod_1.z.string().min(8, { message: "Password should contain a minimum of 8 characters" })
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(8, { message: "Password should contain a minimum of 8 characters" })
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" })
});
exports.resetPasswordSchema = zod_1.z.object({
    password: zod_1.z.string().min(8, { message: "Password should contain a minimum of 8 characters" }),
    cPassword: zod_1.z.string().min(8, { message: "Password should contain a minimum of 8 characters" })
});
exports.wasteRequirementSchema = zod_1.z.object({
    requirementId: zod_1.z.number().optional(),
    image: zod_1.z.string().min(1, { message: "Image URL is required" }),
    name: zod_1.z.string().min(1, { message: "Name is required" }),
    description: zod_1.z.string().min(1, { message: "Description is required" }),
    price: zod_1.z.number().min(0, { message: "Price is required" }),
    initialQuantity: zod_1.z.number().min(1, { message: "Initial quantity is required" }),
    requiredQuantity: zod_1.z.number().min(1, { message: "Required quantity is required" }),
    color: zod_1.z.string().optional(),
    weight: zod_1.z.number().optional(),
    length: zod_1.z.number().optional(),
    width: zod_1.z.number().optional(),
    height: zod_1.z.number().optional()
});
exports.innovativeProdSchema = zod_1.z.object({
    productId: zod_1.z.number().optional(),
    image: zod_1.z.string().min(1, { message: "Image URL is required" }),
    name: zod_1.z.string().min(1, { message: "Name is required" }),
    description: zod_1.z.string().min(1, { message: "Description is required" }),
    price: zod_1.z.number().min(1, { message: "Price is required" }),
    quantity: zod_1.z.number().min(1, { message: "Quantity is required" }),
    color: zod_1.z.string().optional(),
    material: zod_1.z.string().optional(),
    weight: zod_1.z.number().optional(),
    length: zod_1.z.number().optional(),
    width: zod_1.z.number().optional(),
    height: zod_1.z.number().optional()
});
exports.contributionSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    mobile: zod_1.z.string().min(1, { message: "Mobile number is required" }),
    quantity: zod_1.z.number().min(1, { message: "Quantity is required" }),
    address: zod_1.z.string().min(1, { message: "Address is required" })
});
