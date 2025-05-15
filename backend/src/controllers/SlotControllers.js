const { parkingSlotSchema } = require("../schemas/RegisterSchema");
const prisma = require("../config/db")

const addSlot = async (req, res) => {
  try {
    const { spotId, price, type, location, status } = req.body;
    const { error } = parkingSlotSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const slotExists = await prisma.parkingSlot.findUnique({
      where: { spotId },
    });
    if (slotExists) {
      return res.status(400).json({ error: "Slot number already exists" });
    }
    const newSlot = await prisma.parkingSlot.create({
      data: {
        spotId,
        price,
        type,
        location: location || null,
        status
      }
    });
    res.status(201).json({ message: "Slot created successfully", data: newSlot });
  } catch (error) {
        console.error("Error in creating slot:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
  }
};



const updateSlot = async (req, res) => {
  try {
    const id = parseInt(req.params.id); 
    const { spotId,price, type, location, status } = req.body;
    const { error } = parkingSlotSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const slotExists = await prisma.parkingSlot.findUnique({
      where: { id },
    });

    if (!slotExists) {
      return res.status(404).json({ error: "Slot not found" });
    }
    const updatedSlot = await prisma.parkingSlot.update({
      where: { id },
      data: {
        spotId,
        price,
        type,
        location: location || null,
        status
      },
    });
    res.status(200).json({ message: "Slot updated successfully", data: updatedSlot });
  } catch (error) {
    console.error("Error in updating slot:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getSlots = async(req,res) => {
    try {
        const data = await prisma.parkingSlot.findMany({})
        res.status(200).json({slots: data })
    } catch (error) {
        console.error("Error in fetching slot:",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
    
}

const deleteSlot = async(req,res) => {
    const id = parseInt(req.params.id);
  try {
    // Check if slot exists
    const slot = await prisma.parkingSlot.findUnique({ where: { id } });
    if (!slot) {
      return res.status(404).json({ error: 'Slot not found' });
    }
    // Delete slot
    await prisma.parkingSlot.delete({ where: { id } });
    res.status(200).json({message:"Slot deleted successfully"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}


module.exports = {addSlot,updateSlot,getSlots,deleteSlot}



//  date        DateTime
//   startTime   DateTime
//   duration    Int         // in hours
