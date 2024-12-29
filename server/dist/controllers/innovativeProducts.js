"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.innovativeProd = exports.getAllInnovativeProds = exports.addInnovativeProd = void 0;
const client_1 = require("@prisma/client");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const resculpt_1 = require("@abhiram2k03/resculpt");
const prisma = new client_1.PrismaClient();
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
const addInnovativeProd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { image, name, description, price, quantity, color, material, weight, length, width, height, } = resculpt_1.innovativeProdSchema.parse(req.body);
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (image) {
            const uploadRes = yield cloudinary_1.default.uploader.upload(image);
            if (uploadRes) {
                const innovative_products = yield InnovativeProd.create({
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
                        uploaderId: userId,
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
    catch (error) {
        if (error.errors && error.errors[0].message) {
            const message = error.errors[0].message;
            return res.status(400).json({ msg: message });
        }
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.addInnovativeProd = addInnovativeProd;
const getAllInnovativeProds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const innovative_products = yield InnovativeProd.findMany();
        return res.status(200).json(innovative_products);
    }
    catch (error) {
        if (error.errors && error.errors[0].message) {
            const message = error.errors[0].message;
            return res.status(400).json({ msg: message });
        }
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.getAllInnovativeProds = getAllInnovativeProds;
const innovativeProd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productIdNum = parseInt(id, 10); // Convert id to a number
        const innovativeProduct = yield InnovativeProd.findFirst({
            where: {
                productId: productIdNum,
            },
        });
        // Check if the product was found
        if (!innovativeProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }
        return res.status(200).json(innovativeProduct);
    }
    catch (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.innovativeProd = innovativeProd;
