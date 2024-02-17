const express = require("express")
const router = express.Router()
const { sendMailtoUSer } = require("../controller/ContactUs")

router.post("/contact", sendMailtoUSer );

module.exports = router