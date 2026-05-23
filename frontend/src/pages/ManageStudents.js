import {
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

function ManageStudents() {

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [searchTerm, setSearchTerm] =
    useState("");

  const navigate = useNavigate();

  // ====================================
  // FETCH STUDENTS
  // ====================================

  const fetchStudents = useCallback(
    async () => {

      try {

        const token =
          localStorage.getItem(
            "adminToken"
          );

        // CHECK LOGIN

        if (!token) {

          toast.error(
            "Please Login First"
          );

          navigate(
            "/admin/login"
          );

          return;
        }

        const res = await API.get(
          "/students",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStudents(res.data);

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data
            ?.message ||
            "Error fetching students"
        );

      } finally {

        setLoading(false);
      }
    },
    [navigate]
  );

  // ====================================
  // USE EFFECT
  // ====================================

  useEffect(() => {

    fetchStudents();

  }, [fetchStudents]);

  // ====================================
  // DELETE STUDENT
  // ====================================

  const deleteStudent = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this student?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      const token =
        localStorage.getItem(
          "adminToken"
        );

      if (!token) {

        toast.error(
          "Please Login First"
        );

        navigate(
          "/admin/login"
        );

        return;
      }

      await API.delete(
        `/students/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Student Deleted Successfully"
      );

      // REMOVE FROM UI

      setStudents(
        students.filter(
          (student) =>
            student._id !== id
        )
      );

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Error deleting student"
      );
    }
  };

  // ====================================
  // SEARCH FILTER
  // ====================================

  const filteredStudents =
    students.filter(
      (student) =>
        student.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        student.rollNumber
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  // ====================================
  // LOADING
  // ====================================

  if (loading) {

    return (
      <>
        <Navbar />

        <div className="min-h-screen flex justify-center items-center text-white text-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">

          Loading Students...

        </div>

        <Footer />
      </>
    );
  }

  // ====================================
  // UI
  // ====================================

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white px-4 md:px-8 py-10">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-10">

            <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">

              Manage Students

            </h1>

            <div className="flex flex-wrap gap-4">

              <Link to="/admin/dashboard">

                <button className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-2xl font-semibold shadow-lg transition duration-300">

                  ← Dashboard

                </button>

              </Link>

              <Link to="/admin/add-student">

                <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-2xl font-semibold shadow-lg transition duration-300">

                  + Add Student

                </button>

              </Link>

            </div>

          </div>

          {/* SEARCH */}

          <div className="mb-8">

            <input
              type="text"
              placeholder="Search by Name or Roll Number"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="w-full md:w-96 px-5 py-3 rounded-2xl bg-white/10 border border-white/20 outline-none focus:border-cyan-400 backdrop-blur-lg"
            />

          </div>

          {/* TABLE */}

          {filteredStudents.length > 0 ? (

            <div className="overflow-x-auto rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">

              <table className="w-full text-left">

                <thead className="bg-cyan-500/20 text-cyan-300">

                  <tr>

                    <th className="p-4">
                      Name
                    </th>

                    <th className="p-4">
                      Roll No
                    </th>

                    <th className="p-4">
                      Degree
                    </th>

                    <th className="p-4">
                      Department
                    </th>

                    <th className="p-4">
                      Semester
                    </th>

                    <th className="p-4">
                      Percentage
                    </th>

                    <th className="p-4">
                      CGPA
                    </th>

                    <th className="p-4">
                      Grade
                    </th>

                    <th className="p-4">
                      Result
                    </th>

                    <th className="p-4">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredStudents.map(
                    (student) => (

                      <tr
                        key={
                          student._id
                        }
                        className="border-b border-white/10 hover:bg-white/5 transition duration-300"
                      >

                        <td className="p-4 font-semibold">

                          {
                            student.name
                          }

                        </td>

                        <td className="p-4">

                          {
                            student.rollNumber
                          }

                        </td>

                        <td className="p-4">

                          {
                            student.degree
                          }

                        </td>

                        <td className="p-4">

                          {
                            student.department
                          }

                        </td>

                        <td className="p-4">

                          Semester{" "}

                          {
                            student.semester
                          }

                        </td>

                        <td className="p-4 text-cyan-300 font-semibold">

                          {Number(
                            student.percentage || 0
                          ).toFixed(2)}
                          %

                        </td>

                        <td className="p-4 text-purple-300 font-semibold">

                          {student.currentCGPA ||
                            "-"}

                        </td>

                        <td className="p-4 text-yellow-300 font-bold">

                          {
                            student.grade
                          }

                        </td>

                        <td className="p-4">

                          <span
                            className={
                              student.resultStatus ===
                              "PASS"
                                ? "text-green-400 font-bold"
                                : "text-red-400 font-bold"
                            }
                          >

                            {
                              student.resultStatus
                            }

                          </span>

                        </td>

                        <td className="p-4 flex flex-wrap gap-3">

                          <button
                            onClick={() =>
                              navigate(
                                `/admin/edit-student/${student._id}`
                              )
                            }
                            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl font-semibold transition duration-300"
                          >

                            Edit

                          </button>

                          <button
                            onClick={() =>
                              deleteStudent(
                                student._id
                              )
                            }
                            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-semibold transition duration-300"
                          >

                            Delete

                          </button>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/10">

              <h2 className="text-3xl font-bold text-red-400 mb-3">

                No Students Found

              </h2>

              <p className="text-gray-300">

                Add students to manage
                them here.

              </p>

            </div>
          )}

        </div>

      </div>

      <Footer />

    </>
  );
}

export default ManageStudents;