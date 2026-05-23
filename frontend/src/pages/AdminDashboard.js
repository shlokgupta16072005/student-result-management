import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminDashboard() {

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const navigate =
    useNavigate();

  // ==============================
  // FETCH STUDENTS
  // ==============================

  useEffect(() => {

    const fetchStudents =
      async () => {

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

          const res =
            await API.get(
              "/students",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          setStudents(
            res.data
          );

        } catch (error) {

          console.log(
            "FETCH ERROR:",
            error
          );

          toast.error(
            "Error Fetching Students"
          );

        } finally {

          setLoading(false);
        }
      };

    fetchStudents();

  }, [navigate]);

  // ==============================
  // DELETE STUDENT
  // ==============================

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this student?"
        );

      if (
        !confirmDelete
      ) {
        return;
      }

      try {

        const token =
          localStorage.getItem(
            "adminToken"
          );

        await API.delete(
          `/students/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStudents(
          students.filter(
            (student) =>
              student._id !== id
          )
        );

        toast.success(
          "Student Deleted Successfully"
        );

      } catch (error) {

        console.log(
          "DELETE ERROR:",
          error
        );

        toast.error(
          "Error Deleting Student"
        );
      }
    };

  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout =
    () => {

      localStorage.removeItem(
        "adminToken"
      );

      localStorage.removeItem(
        "admin"
      );

      toast.success(
        "Logout Successful"
      );

      navigate(
        "/admin/login"
      );
    };

  // ==============================
  // ANALYTICS
  // ==============================

  const analytics =
    useMemo(() => {

      const totalStudents =
        students.length;

      const averagePercentage =
        totalStudents > 0
          ? (
              students.reduce(
                (
                  acc,
                  student
                ) =>
                  acc +
                  Number(
                    student.percentage || 0
                  ),
                0
              ) / totalStudents
            ).toFixed(2)
          : "0";

      const topperStudent =
        students.length > 0
          ? students.reduce(
              (
                topper,
                current
              ) =>
                Number(
                  current.percentage || 0
                ) >
                Number(
                  topper.percentage || 0
                )
                  ? current
                  : topper
            )
          : null;

      const highestCGPA =
        students.length > 0
          ? Math.max(
              ...students.map(
                (
                  student
                ) =>
                  Number(
                    student.currentCGPA || 0
                  )
              )
            ).toFixed(2)
          : "0";

      return {
        totalStudents,
        averagePercentage,
        topperStudent,
        highestCGPA,
      };

    }, [students]);

  // ==============================
  // SEARCH FILTER
  // ==============================

  const filteredStudents =
    students.filter(
      (student) =>
        student.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        student.rollNumber
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  // ==============================
  // LOADING
  // ==============================

  if (loading) {

    return (

      <>
        <Navbar />

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex justify-center items-center text-white text-3xl">

          Loading Dashboard...

        </div>

        <Footer />
      </>
    );
  }

  // ==============================
  // UI
  // ==============================

  return (

    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white px-4 md:px-8 py-10">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">

            <div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400">

                🎓 Zenith Global University Dashboard

              </h1>

              <p className="text-gray-300 mt-3 text-lg">

                Student Result Management & ERP Analytics Portal

              </p>

            </div>

            <div className="flex flex-wrap gap-4">

              <Link to="/">

                <button className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-2xl font-semibold shadow-xl transition duration-300 hover:scale-105">

                  ← Home

                </button>

              </Link>

              <Link to="/admin/add-student">

                <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-2xl font-semibold shadow-xl transition duration-300 hover:scale-105">

                  + Add Student

                </button>

              </Link>

              <Link to="/results">

                <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-2xl font-semibold shadow-xl transition duration-300 hover:scale-105">

                  View Results

                </button>

              </Link>

              <button
                onClick={
                  handleLogout
                }
                className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-2xl font-semibold shadow-xl transition duration-300 hover:scale-105"
              >

                Logout

              </button>

            </div>

          </div>

          {/* ANALYTICS */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">

              <p className="text-gray-300 mb-2">

                Total Students

              </p>

              <h2 className="text-5xl font-extrabold text-cyan-300">

                {analytics.totalStudents}

              </h2>

            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">

              <p className="text-gray-300 mb-2">

                Average Percentage

              </p>

              <h2 className="text-5xl font-extrabold text-green-300">

                {analytics.averagePercentage}%

              </h2>

            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">

              <p className="text-gray-300 mb-2">

                Highest CGPA

              </p>

              <h2 className="text-5xl font-extrabold text-purple-300">

                {analytics.highestCGPA}

              </h2>

            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">

              <p className="text-gray-300 mb-2">

                Topper

              </p>

              <h2 className="text-2xl font-bold text-yellow-300">

                {analytics.topperStudent
                  ?.name || "N/A"}

              </h2>

            </div>

          </div>

          {/* SEARCH */}

          <div className="mb-10">

            <input
              type="text"
              placeholder="Search by Name or Roll Number..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full md:w-[450px] px-5 py-4 rounded-2xl bg-white/10 border border-white/20 outline-none focus:border-cyan-400 backdrop-blur-lg placeholder-gray-400 shadow-xl"
            />

          </div>

          {/* STUDENT TABLE */}

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

            <div className="px-6 py-5 border-b border-white/10">

              <h2 className="text-2xl font-bold text-cyan-300">

                Registered Students

              </h2>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-cyan-500/20">

                  <tr>

                    <th className="p-4 text-left">
                      Name
                    </th>

                    <th className="p-4 text-left">
                      Roll No
                    </th>

                    <th className="p-4 text-left">
                      Department
                    </th>

                    <th className="p-4 text-left">
                      Semester
                    </th>

                    <th className="p-4 text-left">
                      Percentage
                    </th>

                    <th className="p-4 text-left">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredStudents.length >
                  0 ? (

                    filteredStudents.map(
                      (student) => (

                        <tr
                          key={
                            student._id
                          }
                          className="border-b border-white/10 hover:bg-white/5"
                        >

                          <td className="p-4">
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
                              student.department
                            }
                          </td>

                          <td className="p-4">
                            {
                              student.semester
                            }
                          </td>

                          <td className="p-4 text-cyan-300 font-semibold">

                            {
                              student.percentage
                            }%

                          </td>

                          <td className="p-4">

                            <div className="flex gap-3">

                              <Link
                                to={`/admin/edit-student/${student._id}`}
                              >

                                <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl font-semibold">

                                  Edit

                                </button>

                              </Link>

                              <button
                                onClick={() =>
                                  handleDelete(
                                    student._id
                                  )
                                }
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-semibold"
                              >

                                Delete

                              </button>

                            </div>

                          </td>

                        </tr>
                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="p-6 text-center text-gray-400"
                      >

                        No Students Found

                      </td>

                    </tr>
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default AdminDashboard;