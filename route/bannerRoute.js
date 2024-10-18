const router = require("express").Router()
const banner = require('../controller/bannerController')
const { verifyAccessToken } = require("../middleware/helpers")
const upload = require("../middleware/multer")

router.post('/create', verifyAccessToken, upload.single('image'), banner.createBanner)
router.put('/update/:id', verifyAccessToken, upload.single('image'), banner.updateBanner)
router.delete('/delete/:id', verifyAccessToken, banner.deleteBanner)
router.get('/single/:id', banner.getSingleBanner)
router.get('/all', banner.getAllBanners)


module.exports = router;