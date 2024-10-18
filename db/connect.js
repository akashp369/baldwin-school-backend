const mongoose = require("mongoose")

const connect = async(url)=>{
    await mongoose.connect(url)
    .then(res => console.log("DataBase Connected."))
    .catch(e=> console.log('error to connect database.'))
}

module.exports= connect;