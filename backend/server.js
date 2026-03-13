const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookroutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

/* ROUTES */

app.use("/api", authRoutes);
app.use("/api/books", bookRoutes);

/* ROOT TEST ROUTE */

app.get("/", (req, res) => {
 res.send("BookHub API Running 🚀");
});

/* STATIC FOLDER */

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});
