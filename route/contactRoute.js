const { sendContactFormToMail } = require("../controller/contactController")

const router = require("express").Router()


router.post('/mail', sendContactFormToMail)

module.exports = router;