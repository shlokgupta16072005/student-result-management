const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const router = express.Router();

const Admin = require("../models/Admin");

// =====================================
// REGISTER ADMIN
// =====================================

router.post(
  "/register",
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      // VALIDATION

      if (
        !email ||
        !password
      ) {

        return res
          .status(400)
          .json({
            message:
              "Please fill all fields",
          });
      }

      // CHECK EXISTING ADMIN

      const existingAdmin =
        await Admin.findOne({
          email,
        });

      if (
        existingAdmin
      ) {

        return res
          .status(400)
          .json({
            message:
              "Admin already exists",
          });
      }

      // HASH PASSWORD

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // CREATE ADMIN

      await Admin.create({
        email,
        password:
          hashedPassword,
      });

      res.status(201).json({
        success: true,
        message:
          "Admin Registered Successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  }
);

// =====================================
// LOGIN ADMIN
// =====================================

router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      // VALIDATION

      if (
        !email ||
        !password
      ) {

        return res
          .status(400)
          .json({
            success: false,
            message:
              "Please fill all fields",
          });
      }

      // CHECK ADMIN

      const admin =
        await Admin.findOne({
          email,
        });

      if (!admin) {

        return res
          .status(400)
          .json({
            success: false,
            message:
              "Invalid Email or Password",
          });
      }

      // CHECK PASSWORD

      const isMatch =
        await bcrypt.compare(
          password,
          admin.password
        );

      if (!isMatch) {

        return res
          .status(400)
          .json({
            success: false,
            message:
              "Invalid Email or Password",
          });
      }

      // JWT TOKEN

      const token =
        jwt.sign(
          {
            id: admin._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

      res.status(200).json({
        success: true,
        message:
          "Login Successful",

        token,

        admin: {
          id: admin._id,
          email:
            admin.email,
        },
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  }
);

module.exports = router;