if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: require('path').join(__dirname, '.env') });
}

const express = require("express");
const app = express();
const port = process.env.PORT || 5050;
const path = require("path");
const mongoose = require("mongoose");
const ExpressError = require("./utils/expressError.js");
const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:5173",  // Local development
    "https://cognifylearning.vercel.app",  // Production frontend
    "https://*.vercel.app"  // Vercel preview deployments
  ],
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}

main()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Cognify API is running" });
});

app.use("/dashboard", require("./routes/dashboard/dashboard.js"));
app.use("/user/generate", require("./routes/features/feature.js"));
app.use("/", require("./routes/user/user.js"));

// 404 Fallback
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;

  if (process.env.NODE_ENV !== "production") {
    console.error("❌ ERROR STACK:", err.stack);
    return res.status(status).json({
      success: false,
      message: message,
      error: err.toString(),
      stack: err.stack
    });
  }

  res.status(status).json({ success: false, message: message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
