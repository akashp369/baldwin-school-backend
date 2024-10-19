const express = require("express")
const cors = require("cors")
const axios = require('axios');
const qs = require('qs');
require("dotenv").config()


const connectionDB= require("./db/connect")


const port = process.env.PORT ||8080;
const app = express()

app.use(express.json({extended:true}));
app.use(cors())

app.get("/", (req, res)=>{
    res.send("Wahoo Backend is Working.")
})

app.use("/api/admin", require("./route/adminRoute"))
app.use("/api/banners", require("./route/bannerRoute"))
app.use("/api/admission-news", require("./route/newsRoute"))
app.use("/api/announcement", require("./route/announcementRoute"))
app.use("/api/news", require("./route/newsSectionRoute"))
app.use("/api/success-story", require("./route/successStoryRoute"))


connectionDB(process.env.MONGO_URI)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})