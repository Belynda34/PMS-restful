const express = require("express");
const { register, login, getUserProfile } = require("../controllers/UserController")
const {isAuthenticated} = require("../middlewares/Authenticated")



const router = express.Router()


router.post('/register',register)
router.post('/login',login)

router.use(isAuthenticated);

router.get('/users/current',getUserProfile);

module.exports= router;