const express = require("express");
const { createBooking, updateBooking, deleteBooking, approveBooking, rejectBooking,getAllBookings, getUserBookings} = require("../controllers/Booking");
const { isAuthenticated } = require("../middlewares/Authenticated");




const router = express.Router()


router.use(isAuthenticated);


router.post('/book',createBooking)
router.put('/update/:id',updateBooking)

router.delete('/delete/:id',deleteBooking)

router.patch('/reject/:id',rejectBooking)
router.patch('/approve/:id',approveBooking)

router.get("/",getAllBookings)

router.get("/user",getUserBookings)


module.exports= router;