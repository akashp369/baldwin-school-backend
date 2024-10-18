const adminDB= require("../modal/adminModal")
const response = require("../middleware/responseMiddleware")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs");
const {signAccessToken}=require("../middleware/helpers")

const createAdmin= asyncHandler(async(req, res)=>{
    try {
        const {name, email, password}=req.body
        if(!name || !email || !password){
            return response.validationError(res, "All Details Mandatatory.")
        }
        const normalizeEmail= email.toLowerCase();
        const findadmin = await adminDB.findOne({email:normalizeEmail})
        // console.log(findadmin);
        if(findadmin){
            return response.internalServerError(res, "Email already exist.")
        }
        const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
        if (!hashedPassword) {
            return response.internalServerError(res, "Unable to secure the Password.");
        }
        const newAdmin= new adminDB({
            name, email:normalizeEmail, password:hashedPassword
        })
        const saveAdmin = await newAdmin.save();
        if(!saveAdmin){
            return response.internalServerError(res, "Cannot save the admin.")
        }
        const accessToken = await signAccessToken(saveAdmin._id);
        const data = { admin: saveAdmin, tokens: { accessToken: accessToken || "", }, };
        response.successResponse(res, data, "Saved the Admin successfully");
    } catch (error) {
        response.internalServerError(res, error.message)
    }
})

const loginAdmin = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return response.validationError(res, "Email and password are required for login");
        }
        const normalizedEmail = email.toLowerCase();
        const Admin = await adminDB.findOne({ email: normalizedEmail });
        if (!Admin) {
            return response.errorResponse(res, "Admin not found. Please register", 404);
        }
        const isPasswordMatch = await bcrypt.compare(password, Admin.password);
        if (!isPasswordMatch) {
            return response.errorResponse(res, "Invalid credentials", 401);
        }
        const accessToken = await signAccessToken(Admin._id);
        const data = {
            Admin,
            tokens: { accessToken: accessToken || "" }
        };
        response.successResponse(res, data, "Logged in successfully");
    } catch (error) {
        response.internalServerError(res, error.message);
    }
});

const findAll = asyncHandler(async(req, res)=>{
    const all = await adminDB.find()
    response.successResponse(res, all, "all admin data is here.")
})

module.exports = { createAdmin, loginAdmin, findAll }