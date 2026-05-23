const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const app = express();

// ==============================
// MIDDLEWARE
// ==============================

app.use(cors());

app.use(express.json());

// ==============================
// ROUTES
// ==============================

const adminRoutes =
  require("./routes/adminRoutes");

const studentRoutes =
  require("./routes/studentRoutes");

// IMPORTANT

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/students",
  studentRoutes
);

// ==============================
// TEST ROUTE
// ==============================

app.get("/", (req, res) => {

  res.send(
    "API Running Successfully"
  );
});

// ==============================
// DATABASE CONNECTION
// ==============================

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {

    console.log(
      "MongoDB Connected Successfully"
    );

  })
  .catch((error) => {

    console.log(
      "MongoDB Error:",
      error
    );
  });

// ==============================
// SERVER
// ==============================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});