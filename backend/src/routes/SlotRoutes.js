const express = require("express");
const { addSlot, updateSlot, getSlots, deleteSlot } = require("../controllers/SlotControllers");
const { isAuthenticated } = require("../middlewares/Authenticated");
const { restrictToAdmin } = require("../middlewares/authorize");




const router = express.Router()


router.use(isAuthenticated)

router.post('/add',restrictToAdmin,addSlot)
router.put('/update/:id',updateSlot)
router.get('/',getSlots)
router.delete('/delete/:id',deleteSlot)




module.exports= router;