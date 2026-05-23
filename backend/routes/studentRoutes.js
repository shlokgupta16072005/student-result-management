const express = require("express");

const router = express.Router();

const Student = require("../models/Student");

const authMiddleware = require("../middleware/authMiddleware");

// ==============================
// CALCULATE RESULT
// ==============================

const calculateResult = (
  subjects
) => {

  const totalMarks =
    subjects.reduce(
      (acc, subject) =>
        acc +
        Number(
          subject.marks || 0
        ),
      0
    );

  const percentage =
    subjects.length > 0
      ? totalMarks /
        subjects.length
      : 0;

  // CURRENT CGPA

  const currentCGPA = (
    percentage / 9.5
  ).toFixed(2);

  // AVERAGE CGPA

  const averageCGPA = (
    Number(currentCGPA) *
    0.95
  ).toFixed(2);

  // GRADE

  let grade = "F";

  if (percentage >= 90) {

    grade = "A+";

  } else if (
    percentage >= 75
  ) {

    grade = "A";

  } else if (
    percentage >= 60
  ) {

    grade = "B";

  } else if (
    percentage >= 40
  ) {

    grade = "C";
  }

  // RESULT STATUS

  const resultStatus =
    percentage >= 40
      ? "PASS"
      : "FAIL";

  return {
    percentage:
      percentage.toFixed(2),

    currentCGPA,

    averageCGPA,

    grade,

    resultStatus,
  };
};

// ==============================
// ADD STUDENT
// ==============================

router.post(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        name,
        rollNumber,
        degree,
        department,
        semester,
        subjects,
      } = req.body;

      // VALIDATION

      if (
        !name ||
        !rollNumber ||
        !degree ||
        !department ||
        !semester
      ) {

        return res
          .status(400)
          .json({
            success: false,
            message:
              "Please fill all fields",
          });
      }

      // CHECK EXISTING STUDENT

      const existingStudent =
        await Student.findOne({
          rollNumber,
        });

      if (
        existingStudent
      ) {

        return res
          .status(400)
          .json({
            success: false,
            message:
              "Student already exists",
          });
      }

      // CALCULATE RESULT

      const resultData =
        calculateResult(
          subjects || []
        );

      // CREATE STUDENT

      const student =
        new Student({
          ...req.body,
          ...resultData,
        });

      await student.save();

      res.status(201).json({
        success: true,
        message:
          "Student Added Successfully",
        student,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  }
);

// ==============================
// GET ALL STUDENTS
// ==============================

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const students =
        await Student.find().sort(
          {
            createdAt: -1,
          }
        );

      res.status(200).json(
        students
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  }
);

// ==============================
// GET SINGLE STUDENT
// ==============================

router.get(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const student =
        await Student.findById(
          req.params.id
        );

      if (!student) {

        return res
          .status(404)
          .json({
            success: false,
            message:
              "Student Not Found",
          });
      }

      res.status(200).json(
        student
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  }
);

// ==============================
// UPDATE STUDENT
// ==============================

router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const resultData =
        calculateResult(
          req.body.subjects ||
            []
        );

      const updatedStudent =
        await Student.findByIdAndUpdate(
          req.params.id,
          {
            ...req.body,
            ...resultData,
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!updatedStudent) {

        return res
          .status(404)
          .json({
            success: false,
            message:
              "Student Not Found",
          });
      }

      res.status(200).json({
        success: true,
        message:
          "Student Updated Successfully",
        updatedStudent,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  }
);

// ==============================
// DELETE STUDENT
// ==============================

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const deletedStudent =
        await Student.findByIdAndDelete(
          req.params.id
        );

      if (!deletedStudent) {

        return res
          .status(404)
          .json({
            success: false,
            message:
              "Student Not Found",
          });
      }

      res.status(200).json({
        success: true,
        message:
          "Student Deleted Successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  }
);

module.exports = router;