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
exports.wasteReq = exports.getAllSatisfiedRequirements = exports.getWasteRequirements = exports.getAllWasteRequirements = exports.addWasteRequirement = void 0;
const client_1 = require("@prisma/client");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const resculpt_1 = require("@abhiram2k03/resculpt");
const prisma = new client_1.PrismaClient();
const WasteRequirement = prisma.wasteRequirement;
const addWasteRequirement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { image, name, description, price, initialQuantity, color, weight, length, width, height } = resculpt_1.wasteRequirementSchema.parse(req.body);
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (image) {
            const uploadRes = yield cloudinary_1.default.uploader.upload(image);
            if (uploadRes) {
                const waste_requirement = yield WasteRequirement.create({
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
                        uploaderId: userId,
                    },
                });
                return res.status(201).json({ msg: "Requirement uploaded successfully" });
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
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.addWasteRequirement = addWasteRequirement;
const getAllWasteRequirements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wasteRequirements = yield WasteRequirement.findMany();
        return res.status(200).json(wasteRequirements);
    }
    catch (error) {
        if (error.errors && error.errors[0].message) {
            const message = error.errors[0].message;
            return res.status(400).json({ msg: message });
        }
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.getAllWasteRequirements = getAllWasteRequirements;
const getWasteRequirements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wasteRequirements = yield WasteRequirement.findMany({
            where: {
                requiredQuantity: {
                    not: 0,
                },
            },
        });
        return res.status(200).json(wasteRequirements);
    }
    catch (error) {
        if (error.errors && error.errors[0].message) {
            const message = error.errors[0].message;
            return res.status(400).json({ msg: message });
        }
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.getWasteRequirements = getWasteRequirements;
const getAllSatisfiedRequirements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wasteRequirements = yield WasteRequirement.findMany({
            where: {
                requiredQuantity: 0,
            },
        });
        return res.status(200).json(wasteRequirements);
    }
    catch (error) {
        if (error.errors && error.errors[0].message) {
            const message = error.errors[0].message;
            return res.status(400).json({ msg: message });
        }
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.getAllSatisfiedRequirements = getAllSatisfiedRequirements;
const wasteReq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const reqIdNum = parseInt(id, 10); // Convert id to a number
        const requirement = yield WasteRequirement.findFirst({
            where: {
                requirementId: reqIdNum,
            },
        });
        // Check if the requirement was found
        if (!requirement) {
            return res.status(404).json({ msg: "Requirement not found" });
        }
        return res.status(200).json(requirement);
    }
    catch (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.wasteReq = wasteReq;
