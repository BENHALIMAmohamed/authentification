const express = require("express")
const { register, login, authorizedUser } = require("../controllers/user.controller")
const auth = require("../middlewares/auth")
const { registerRules,validator } = require("../middlewares/validator")

const router = express.Router()


router.post("/register",registerRules(),validator,register)
router.post("/login",login)
router.get("/auth",auth,authorizedUser)


module.exports = router