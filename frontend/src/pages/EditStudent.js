import { useEffect, useState } from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const semesterMap = {
  "B.Tech": 8,
  "BCA": 6,
  "B.Sc": 6,
  "B.Sc (Hons)": 8,
  "BA": 6,
  "BA (Hons)": 8,
  "B.Com": 6,
  "B.Com (Hons)": 8,
  "BBA": 6,
  "MBA": 4,
  "M.Tech": 4,
  "LLB": 6,
  "Integrated Law": 10,
  "B.Arch": 10,
  "Fashion Designing": 8,
  "B.Des": 8,
  "Journalism": 6,
  "Hotel Management": 8,
};

const departmentMap = {
  "B.Tech": [
    "CSE",
    "IT",
    "ECE",
    "Mechanical",
    "Civil",
  ],

  "BBA": [
    "Finance",
    "Marketing",
    "HR",
  ],

  MBA: [
    "Finance",
    "Marketing",
    "HR",
    "Operations",
  ],

  "BCA": [
    "Computer Applications",
  ],

  "Integrated Law": [
    "Corporate Law",
    "Criminal Law",
  ],

  "Fashion Designing": [
    "Textile Design",
    "Fashion Communication",
  ],

  "B.Arch": [
    "Architecture",
    "Urban Planning",
  ],

  BA: [
    "English",
    "History",
    "Political Science",
  ],

  "BA (Hons)": [
    "English Hons",
    "Economics Hons",
    "Psychology Hons",
  ],

  "B.Com": [
    "Accounting",
    "Finance",
  ],

  "B.Com (Hons)": [
    "Accounting & Finance",
  ],

  Journalism: [
    "Mass Communication",
    "Digital Media",
  ],
};

function EditStudent() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] =
    useState(false);

  const [fetching, setFetching] =
    useState(true);

  const [formData, setFormData] =
    useState({
      name: "",
      rollNumber: "",
      degree: "",
      department: "",
      semester: "",

      subjects: [
        {
          subjectName: "",
          marks: "",
        },
      ],
    });

  // ====================================
  // CHECK ADMIN TOKEN
  // ====================================

  const token =
    localStorage.getItem(
      "adminToken"
    );

  // ====================================
  // FETCH STUDENT
  // ====================================

  useEffect(() => {

    const fetchStudent =
      async () => {

        try {

          if (!token) {

            toast.error(
              "Please Login First"
            );

            navigate(
              "/admin/login"
            );

            return;
          }

          const res =
            await API.get(
              `/students/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          setFormData({
            name:
              res.data.name || "",
            rollNumber:
              res.data.rollNumber ||
              "",
            degree:
              res.data.degree || "",
            department:
              res.data.department ||
              "",
            semester:
              res.data.semester || "",

            subjects:
              res.data.subjects
                ?.length > 0
                ? res.data.subjects
                : [
                    {
                      subjectName:
                        "",
                      marks: "",
                    },
                  ],
          });

        } catch (error) {

          console.log(error);

          toast.error(
            "Error Fetching Student"
          );

        } finally {

          setFetching(false);
        }
      };

    fetchStudent();

  }, [id, navigate, token]);

  // ====================================
  // HANDLE CHANGE
  // ====================================

  const handleChange = (e) => {

    const { name, value } =
      e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ====================================
  // HANDLE SUBJECT CHANGE
  // ====================================

  const handleSubjectChange = (
    index,
    field,
    value
  ) => {

    const updatedSubjects = [
      ...formData.subjects,
    ];

    updatedSubjects[index][field] =
      value;

    setFormData({
      ...formData,
      subjects: updatedSubjects,
    });
  };

  // ====================================
  // ADD SUBJECT
  // ====================================

  const addSubjectField = () => {

    setFormData({
      ...formData,

      subjects: [
        ...formData.subjects,

        {
          subjectName: "",
          marks: "",
        },
      ],
    });
  };

  // ====================================
  // REMOVE SUBJECT
  // ====================================

  const removeSubjectField = (
    index
  ) => {

    if (
      formData.subjects.length === 1
    ) {
      return;
    }

    const updatedSubjects =
      formData.subjects.filter(
        (_, i) => i !== index
      );

    setFormData({
      ...formData,
      subjects: updatedSubjects,
    });
  };

  // ====================================
  // CALCULATIONS
  // ====================================

  const totalMarks =
    formData.subjects.reduce(
      (acc, sub) =>
        acc + Number(sub.marks || 0),
      0
    );

  const percentage =
    formData.subjects.length > 0
      ? (
          totalMarks /
          formData.subjects.length
        ).toFixed(2)
      : "0.00";

  const currentCGPA = (
    Number(percentage) / 9.5
  ).toFixed(2);

  const averageCGPA = (
    Number(currentCGPA) * 0.95
  ).toFixed(2);

  let grade = "F";

  if (Number(percentage) >= 90) {
    grade = "A+";
  } else if (
    Number(percentage) >= 75
  ) {
    grade = "A";
  } else if (
    Number(percentage) >= 60
  ) {
    grade = "B";
  } else if (
    Number(percentage) >= 40
  ) {
    grade = "C";
  }

  const resultStatus =
    Number(percentage) >= 40
      ? "PASS"
      : "FAIL";

  // ====================================
  // UPDATE STUDENT
  // ====================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const updatedStudent = {
        ...formData,
        percentage,
        currentCGPA,
        averageCGPA,
        grade,
        resultStatus,
      };

      await API.put(
        `/students/${id}`,
        updatedStudent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Student Updated Successfully"
      );

      setTimeout(() => {

        navigate(
          "/admin/dashboard"
        );

      }, 1500);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Error Updating Student"
      );

    } finally {

      setLoading(false);
    }
  };

  // ====================================
  // LOADING
  // ====================================

  if (fetching) {

    return (

      <>
        <Navbar />

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex justify-center items-center text-white text-3xl">

          Loading Student...

        </div>

        <Footer />
      </>
    );
  }

  return (

    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white px-4 py-10">

        <div className="max-w-7xl mx-auto">

          {/* TOP BAR */}

          <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-10">

            <div className="flex flex-wrap gap-4">

              <Link to="/">

                <button className="bg-purple-500 hover:bg-purple-600 px-5 py-3 rounded-2xl font-semibold shadow-lg transition duration-300">

                  ← Home

                </button>

              </Link>

              <Link to="/admin/dashboard">

                <button className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-2xl font-semibold shadow-lg transition duration-300">

                  Dashboard

                </button>

              </Link>

            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 text-center">

              Edit Student

            </h1>

          </div>

          {/* FORM */}

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 md:p-10">

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >

              <input
                type="text"
                name="name"
                placeholder="Student Name"
                value={formData.name}
                onChange={handleChange}
                className="p-4 rounded-2xl bg-black/20 border border-white/10 outline-none focus:border-cyan-400"
                required
              />

              <input
                type="text"
                name="rollNumber"
                placeholder="Roll Number"
                value={formData.rollNumber}
                onChange={handleChange}
                className="p-4 rounded-2xl bg-black/20 border border-white/10 outline-none focus:border-cyan-400"
                required
              />

              <select
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="p-4 rounded-2xl bg-white text-black outline-none"
                required
              >

                <option value="">
                  Select Degree
                </option>

                {Object.keys(
                  semesterMap
                ).map((degree) => (

                  <option
                    key={degree}
                    value={degree}
                  >
                    {degree}
                  </option>

                ))}

              </select>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="p-4 rounded-2xl bg-white text-black outline-none"
                required
              >

                <option value="">
                  Select Department
                </option>

                {(departmentMap[
                  formData.degree
                ] || []).map((dept) => (

                  <option
                    key={dept}
                    value={dept}
                  >
                    {dept}
                  </option>

                ))}

              </select>

              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="p-4 rounded-2xl bg-white text-black outline-none"
                required
              >

                <option value="">
                  Select Semester
                </option>

                {Array.from(
                  {
                    length:
                      semesterMap[
                        formData.degree
                      ] || 0,
                  },
                  (_, i) => (

                    <option
                      key={i + 1}
                      value={i + 1}
                    >
                      Semester {i + 1}
                    </option>

                  )
                )}

              </select>

              {/* SUBJECTS */}

              <div className="md:col-span-2">

                <div className="flex justify-between items-center mb-5">

                  <h2 className="text-3xl font-bold text-cyan-300">

                    Subjects

                  </h2>

                  <button
                    type="button"
                    onClick={addSubjectField}
                    className="bg-purple-500 hover:bg-purple-600 px-5 py-3 rounded-2xl font-semibold transition duration-300"
                  >

                    + Add Subject

                  </button>

                </div>

                <div className="flex flex-col gap-5">

                  {formData.subjects.map(
                    (
                      subject,
                      index
                    ) => (

                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-black/20 p-4 rounded-2xl border border-white/10"
                      >

                        <input
                          type="text"
                          placeholder="Subject Name"
                          value={
                            subject.subjectName
                          }
                          onChange={(e) =>
                            handleSubjectChange(
                              index,
                              "subjectName",
                              e.target.value
                            )
                          }
                          className="p-3 rounded-xl bg-white/10 border border-white/10 outline-none focus:border-cyan-400"
                          required
                        />

                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Marks"
                          value={
                            subject.marks
                          }
                          onChange={(e) =>
                            handleSubjectChange(
                              index,
                              "marks",
                              e.target.value
                            )
                          }
                          className="p-3 rounded-xl bg-white/10 border border-white/10 outline-none focus:border-cyan-400"
                          required
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeSubjectField(
                              index
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 rounded-xl font-semibold transition duration-300"
                        >

                          Remove

                        </button>

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* PREVIEW */}

              <div className="md:col-span-2 bg-black/20 rounded-3xl p-6 border border-white/10">

                <h2 className="text-3xl font-bold text-cyan-300 mb-6">

                  Student Preview

                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-lg">

                  <p>
                    <span className="font-bold">
                      Percentage:
                    </span>{" "}
                    {percentage}%
                  </p>

                  <p>
                    <span className="font-bold">
                      Current CGPA:
                    </span>{" "}
                    {currentCGPA}
                  </p>

                  <p>
                    <span className="font-bold">
                      Average CGPA:
                    </span>{" "}
                    {averageCGPA}
                  </p>

                  <p>
                    <span className="font-bold">
                      Grade:
                    </span>{" "}
                    {grade}
                  </p>

                  <p>
                    <span className="font-bold">
                      Result:
                    </span>{" "}

                    <span
                      className={
                        resultStatus ===
                        "PASS"
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >

                      {resultStatus}

                    </span>

                  </p>

                </div>

              </div>

              {/* UPDATE BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 bg-cyan-500 hover:bg-cyan-600 py-4 rounded-2xl text-lg font-semibold shadow-lg transition duration-300 disabled:opacity-50"
              >

                {loading
                  ? "Updating Student..."
                  : "Update Student"}

              </button>

            </form>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
}

export default EditStudent;