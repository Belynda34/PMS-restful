const prisma = require("../config/db");
const { bookingSchema } = require("../schemas/RegisterSchema");
const { updateSlot } = require("./SlotControllers");
const {sendEmail} = require("../utils/Email")

const createBooking = async (req, res) => {
  const { slotId } = req.body;
  try {
    // const { error } = bookingSchema.validate(req.body);
    // if (error) {
    //     return res.status(400).json({ message: error.details[0].message });
    // }

    const slot = await prisma.parkingSlot.findUnique({
      where: { id: parseInt(slotId) },
    });
    if(!slot){
      return res.status(400).json({ error: "Invalid slot" });
    }
    if (slot.status !== "Available") {
      return res.status(400).json({ error: "Unavailable slot" });
    }
    

    const newRequest = await prisma.booking.create({
      data: {
        userId: req.user.id,
        slotId: parseInt(slotId),
        spotId: slot.spotId,
        status: "pending",
      },
    });
    
    await prisma.parkingSlot.update({
      where: { id: parseInt(slotId) },
      data: { status: "pending" },  // or "Booked" if you want
    });

    res
      .status(201)
      .json({ message: "Request sent successfully", data: newRequest });
  } catch (error) {
    console.log("Error in sending request:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateBooking = async (req, res) => {
  const { id } = req.params;
  try {

    const {slotId} = req.body
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
    });

    if (booking.status !== "pending") {
      return res
        .status(400)
        .json({ error: "Only pending bookings can be updated" });
    }

    const slot = await prisma.parkingSlot.findUnique({
      where: { id: parseInt(slotId) },
    });

    if (!slot) {
      return res.status(400).json({ error: "Invalid slot ID" });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: {
        userId: req.user.id,
        slotId: parseInt(slotId),
        spotId: slot.spotId,
        status: "pending",

      },
    });

    res.status(200).json({ message: "Slot updated successfully", data: updatedBooking });
  } catch (error) {
     console.error("Error in updating booking:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const deleteBooking = async(req,res) => {
    const id = parseInt(req.params.id);
    const userId = req.user.id 
  try {


;
     const booking = await prisma.booking.findFirst({ 
      where: { 
        id,
        userId,   // Ensure the booking belongs to the user
        status: "pending"  // Ensure the booking is pending
      } 
    });
    if (!booking) {
      return res.status(404).json({ error: 'Pending booking not found or not authorized' });
    }
    // Delete slot
    await prisma.booking.delete({ where: { id } });
    res.status(200).json({message:"Booking canceled successfully"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}


//ADMIN

const approveBooking =  async(req,res) => {
    const { id } = req.params; 
    
    try {
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
    });

    if (!booking || booking.status !== 'pending') {
      return res.status(400).json({ error: 'Invalid or non-pending booking' });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: {
        status: 'approved',
      },
    });

    await prisma.parkingSlot.update({
      where: { id: booking.slotId },
      data: {
        status: 'unavailable',
      },
    });

      
    const user = await prisma.user.findUnique({ where: { id: booking.userId } });
    if (!user) {
      console.error('User not found for email notification');
    } else {
      // Send approval email
      await sendEmail({
        to: user.email,
        subject: 'Parking Slot Request Approved',
        text: `Dear ${user.username},\n\nYour request for parking slot ${booking.spotId} has been approved.\n\nThank you,\nParking System Team`,
      });
    }

    res.status(200).json({ message: "Booking Approved", data: updatedBooking });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error',data:rejectBooking });
    }
}


//ADMIN

const rejectBooking =  async(req,res) => {
    const { id } = req.params; 
    
    try {
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
    });

    if (!booking || booking.status !== 'pending') {
      return res.status(400).json({ error: 'Invalid or non-pending booking' });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: {
        status: 'rejected',
      },
    });

    res.status(200).json({ message: "Booking rejected", data: updatedBooking });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error',data:rejectBooking });
    }
}




//ADMIN

// Fetch all requests (Admin only)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: {
          select: { username: true, email: true },
        },
        slot: {
          select: { spotId: true, status: true },
        },
      },
    });

    res.status(200).json({ bookings: bookings });
  } catch (error) {
    console.error("Error fetching all requests:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};



//USER
const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;  // Extract user ID from the authenticated user

    const bookings = await prisma.booking.findMany({
      where: {
        userId: userId,
      },
      include: {
        slot: {
          select: {
            spotId: true,
            status: true,
          },
        },
      },
    });

    res.status(200).json({ data: bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};



module.exports = { createBooking,updateBooking ,deleteBooking,rejectBooking,approveBooking,getAllBookings,getUserBookings};
