const mongoose = require("mongoose");

const subjectSchema =
  new mongoose.Schema({
    subjectName: {
      type: String,
      required: true,
    },

    marks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  });

const studentSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      rollNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

      degree: {
        type: String,
        required: true,
      },

      department: {
        type: String,
        required: true,
      },

      semester: {
        type: Number,
        required: true,
      },

      subjects: [
        subjectSchema,
      ],

      percentage: {
        type: Number,
        default: 0,
      },

      currentCGPA: {
        type: Number,
        default: 0,
      },

      averageCGPA: {
        type: Number,
        default: 0,
      },

      grade: {
        type: String,
        default: "F",
      },
    },

    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Student",
  studentSchema
);