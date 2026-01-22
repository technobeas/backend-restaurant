const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://frontend-final-2yf43a53j-technobeas-projects.vercel.app",
      "https://adminrestaurant-chi.vercel.app",
      "https://adminrestaurant-97j74wjk4-technobeas-projects.vercel.app",
      "https://adminrestaurant-2gdysakw7-technobeas-projects.vercel.app",
      "https://frontend-final-nine-blond.vercel.app",
    ],
  })
);

// PUBLIC ROUTES (NO AUTH)
app.use("/product", require("./routes/A_Product.js"));
app.use("/category", require("./routes/A_Category.js"));
app.use("/api", require("./routes/user.js"));

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const start = async () => {
  await connectDB();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on port ${PORT}`);
  });
};

start();
