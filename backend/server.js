const express = require("express");
const dotenv = require("dotenv");
const  UserRoutes = require("./src/routes/UserRoutes")
const SlotRoutes = require("./src/routes/SlotRoutes")
const cors = require("cors");
const BookingRoutes = require("./src/routes/BookingRoutes")

dotenv.config();

const PORT = process.env.PORT || 4001;

const app = express();

app.use(express.json());

// app.use(cors());



app.use("/api/auth", UserRoutes);
app.use("/api/slots", SlotRoutes);
app.use("/api/booking",BookingRoutes);

app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})

