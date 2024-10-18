const router = require("express").Router()
const adminController = require("../controller/adminController")

router.post("/create", adminController.createAdmin)
router.post("/login", adminController.loginAdmin)
router.get("/all", adminController.findAll)

module.exports = router