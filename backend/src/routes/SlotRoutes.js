const express = require("express");
const { addSlot, updateSlot, getSlots, deleteSlot } = require("../controllers/SlotControllers")




const router = express.Router()


router.post('/add',addSlot)
router.put('/update/:id',updateSlot)
router.get('/',getSlots)
router.delete('/delete/:id',deleteSlot)




module.exports= router;