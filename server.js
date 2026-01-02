const express = require("express");
const connectDB = require("./config/db");
const createAdmin = require("./config/createAdmin");
// const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://frontend-final-2yf43a53j-technobeas-projects.vercel.app",
      "https://adminrestaurant-chi.vercel.app",
    ],
    credentials: true,
  })
);

// app.use(express.urlencoded({extended  : true}));

// Routes
// admin routes protected with authentication
app.use("/user", require("./routes/adminRoutes"));
app.use("/product", require("./routes/A_Product.js"));
app.use("/category", require("./routes/A_Category.js"));

// frontend user routes to fetch all products without authentication
app.use("/api", require("./routes/user.js"));

app.get("/", (req, res) => {
  res.send("Hello");
});

const start = async () => {
  await connectDB();
  await createAdmin();
  app.listen(PORT, "0.0.0.0", (err) => {
    console.log("server started...");
  });
};

start();
