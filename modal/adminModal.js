const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        uppercase:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

const adminModal = mongoose.model("admin", adminSchema)

module.exports = adminModal;