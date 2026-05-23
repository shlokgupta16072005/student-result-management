import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import API from "../services/api";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

function Results() {

  const [students, setStudents] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  // ==============================
  // FETCH STUDENTS
  // ==============================

  useEffect(() => {

    fetchStudents();

  }, []);

  const fetchStudents =
    async () => {

      try {

        const res =
          await API.get(
            "/students"
          );

        setStudents(
          res.data
        );

      } catch (error) {

        toast.error(
          "Error fetching results"
        );

      } finally {

        setLoading(false);
      }
    };

  // ==============================
  // FILTER STUDENTS
  // ==============================

  const filteredStudents =
    useMemo(() => {

      return students.filter(
        (student) =>
          student.rollNumber
            ?.toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||
          student.name
            ?.toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )
      );

    }, [students, searchTerm]);

  // ==============================
  // GRADE CALCULATOR
  // ==============================

  const getGrade =
    (percentage) => {

      if (percentage >= 90) {
        return "A+";
      }

      if (percentage >= 75) {
        return "A";
      }

      if (percentage >= 60) {
        return "B";
      }

      if (percentage >= 40) {
        return "C";
      }

      return "F";
    };

  // ==============================
  // GRADE COLORS
  // ==============================

  const getGradeColor =
    (grade) => {

      switch (grade) {

        case "A+":
          return "bg-green-500/20 text-green-300 border border-green-400/30";

        case "A":
          return "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30";

        case "B":
          return "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30";

        case "C":
          return "bg-orange-500/20 text-orange-300 border border-orange-400/30";

        default:
          return "bg-red-500/20 text-red-300 border border-red-400/30";
      }
    };

  // ==============================
  // PASS / FAIL STATUS
  // ==============================

  const getResultStatus =
    (percentage) => {

      return percentage >= 40
        ? "PASS"
        : "FAIL";
    };

  // ==============================
  // LOADING SCREEN
  // ==============================

  if (loading) {

    return (

      <>

        <Navbar />

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col justify-center items-center text-white px-4">

          {/* SPINNER */}

          <div className="relative mb-8">

            <div className="w-24 h-24 border-4 border-cyan-400/20 rounded-full"></div>

            <div className="absolute top-0 left-0 w-24 h-24 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

          </div>

          {/* TITLE */}

          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 mb-4 text-center">

            Loading Results...

          </h1>

          {/* DESCRIPTION */}

          <p className="text-gray-300 text-lg text-center max-w-2xl leading-relaxed">

            Fetching student performance records,
            semester reports, subject marks,
            CGPA analysis and academic insights.

          </p>

          {/* SKELETON CARDS */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 w-full max-w-6xl">

            <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 animate-pulse">

              <div className="h-5 bg-cyan-400/20 rounded mb-4"></div>

              <div className="h-10 bg-cyan-400/20 rounded"></div>

            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 animate-pulse">

              <div className="h-5 bg-green-400/20 rounded mb-4"></div>

              <div className="h-10 bg-green-400/20 rounded"></div>

            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 animate-pulse">

              <div className="h-5 bg-purple-400/20 rounded mb-4"></div>

              <div className="h-10 bg-purple-400/20 rounded"></div>

            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 animate-pulse">

              <div className="h-5 bg-yellow-400/20 rounded mb-4"></div>

              <div className="h-10 bg-yellow-400/20 rounded"></div>

            </div>

          </div>

        </div>

        <Footer />

      </>
    );
  }

  // ==============================
  // MAIN UI
  // ==============================

  return (

    <>

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white px-4 md:px-8 py-10">

        <div className="max-w-7xl mx-auto">

          {/* UNIVERSITY BANNER */}

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl mb-10">

            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

              <div>

                <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 mb-3">

                  🎓 Zenith Global University

                </h1>

                <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">

                  Official Student Result Management &
                  Academic Performance Portal for all
                  undergraduate and postgraduate programs.

                </p>

              </div>

              {/* BADGES */}

              <div className="flex flex-wrap gap-3 justify-center">

                <span className="bg-green-500/20 border border-green-400 text-green-300 px-5 py-2 rounded-full font-semibold">

                  NAAC A++

                </span>

                <span className="bg-yellow-500/20 border border-yellow-400 text-yellow-300 px-5 py-2 rounded-full font-semibold">

                  NIRF Top 50

                </span>

                <span className="bg-cyan-500/20 border border-cyan-400 text-cyan-300 px-5 py-2 rounded-full font-semibold">

                  AICTE Approved

                </span>

                <span className="bg-purple-500/20 border border-purple-400 text-purple-300 px-5 py-2 rounded-full font-semibold">

                  UGC Recognized

                </span>

              </div>

            </div>

          </div>

          {/* HEADER */}

          <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-10">

            <div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 mb-2">

                📊 Student Results

              </h1>

              <p className="text-gray-300 text-lg">

                Academic Performance & Semester Result Analysis

              </p>

            </div>

            <div className="flex flex-wrap gap-4">

              <Link to="/">

                <button className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-2xl font-semibold shadow-lg transition duration-300 hover:scale-105">

                  ← Home

                </button>

              </Link>

              <Link to="/admin/dashboard">

                <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-2xl font-semibold shadow-lg transition duration-300 hover:scale-105">

                  Admin Dashboard

                </button>

              </Link>

            </div>

          </div>

          {/* SEARCH BAR */}

          <div className="mb-10 flex justify-center md:justify-start">

            <input
              type="text"
              placeholder="Search by Student Name or Roll Number..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="w-full md:w-[450px] px-5 py-4 rounded-2xl bg-white/10 border border-white/20 outline-none focus:border-cyan-400 backdrop-blur-lg placeholder-gray-400 shadow-xl"
            />

          </div>

          {/* RESULTS */}

          {filteredStudents.length > 0 ? (

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {filteredStudents.map(
                (student) => {

                  const percentage =
                    Number(
                      student.percentage || 0
                    );

                  const currentCGPA =
                    student.currentCGPA ||
                    (
                      percentage / 9.5
                    ).toFixed(2);

                  const averageCGPA =
                    student.averageCGPA ||
                    currentCGPA;

                  const grade =
                    getGrade(
                      percentage
                    );

                  const resultStatus =
                    getResultStatus(
                      percentage
                    );

                  return (

                    <div
                      key={student._id}
                      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden hover:scale-[1.01] transition duration-300"
                    >

                      {/* CARD HEADER */}

                      <div className="bg-cyan-500/20 px-6 py-5 border-b border-white/10">

                        <h2 className="text-3xl font-bold text-cyan-300">

                          {student.name}

                        </h2>

                        <p className="text-gray-300 mt-1">

                          Roll No: {student.rollNumber}

                        </p>

                      </div>

                      {/* CARD BODY */}

                      <div className="p-6 space-y-6">

                        {/* BASIC INFO */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                          <div className="bg-black/20 rounded-2xl p-4">

                            <p className="text-gray-300">

                              Degree

                            </p>

                            <h3 className="text-xl font-bold">

                              {student.degree}

                            </h3>

                          </div>

                          <div className="bg-black/20 rounded-2xl p-4">

                            <p className="text-gray-300">

                              Department

                            </p>

                            <h3 className="text-xl font-bold">

                              {student.department}

                            </h3>

                          </div>

                          <div className="bg-black/20 rounded-2xl p-4">

                            <p className="text-gray-300">

                              Semester

                            </p>

                            <h3 className="text-xl font-bold">

                              Semester {student.semester}

                            </h3>

                          </div>

                          <div className="bg-black/20 rounded-2xl p-4">

                            <p className="text-gray-300 mb-3">

                              Grade

                            </p>

                            <div
                              className={`inline-flex px-5 py-2 rounded-xl text-xl font-bold ${getGradeColor(
                                grade
                              )}`}
                            >

                              {grade}

                            </div>

                          </div>

                        </div>

                        {/* SUBJECT TABLE */}

                        <div>

                          <h3 className="text-2xl font-bold text-cyan-300 mb-4">

                            📚 Subject-wise Marks

                          </h3>

                          <div className="overflow-x-auto rounded-2xl">

                            <table className="w-full">

                              <thead className="bg-cyan-500/20">

                                <tr>

                                  <th className="p-3 text-left">

                                    Subject

                                  </th>

                                  <th className="p-3 text-left">

                                    Marks

                                  </th>

                                </tr>

                              </thead>

                              <tbody>

                                {student.subjects?.length > 0 ? (

                                  student.subjects.map(
                                    (
                                      subject,
                                      index
                                    ) => (

                                      <tr
                                        key={index}
                                        className="border-b border-white/10 hover:bg-white/5"
                                      >

                                        <td className="p-3">

                                          {subject.subjectName}

                                        </td>

                                        <td className="p-3 font-semibold text-cyan-300">

                                          {subject.marks}

                                        </td>

                                      </tr>
                                    )
                                  )

                                ) : (

                                  <tr>

                                    <td
                                      colSpan="2"
                                      className="p-3 text-center text-gray-400"
                                    >

                                      No Subjects Found

                                    </td>

                                  </tr>
                                )}

                              </tbody>

                            </table>

                          </div>

                        </div>

                        {/* PERFORMANCE */}

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">

                          <div className="bg-cyan-500/10 rounded-2xl p-5 border border-cyan-400/20">

                            <p className="text-gray-300">

                              Percentage

                            </p>

                            <h3 className="text-3xl font-bold text-cyan-300">

                              {percentage.toFixed(2)}%

                            </h3>

                          </div>

                          <div className="bg-purple-500/10 rounded-2xl p-5 border border-purple-400/20">

                            <p className="text-gray-300">

                              Current CGPA

                            </p>

                            <h3 className="text-3xl font-bold text-purple-300">

                              {currentCGPA}

                            </h3>

                          </div>

                          <div className="bg-green-500/10 rounded-2xl p-5 border border-green-400/20">

                            <p className="text-gray-300">

                              Average CGPA

                            </p>

                            <h3 className="text-3xl font-bold text-green-300">

                              {averageCGPA}

                            </h3>

                          </div>

                          <div
                            className={`rounded-2xl p-5 border ${
                              resultStatus === "PASS"
                                ? "bg-green-500/10 border-green-400/20"
                                : "bg-red-500/10 border-red-400/20"
                            }`}
                          >

                            <p className="text-gray-300">

                              Result Status

                            </p>

                            <h3
                              className={`text-3xl font-bold ${
                                resultStatus === "PASS"
                                  ? "text-green-300"
                                  : "text-red-300"
                              }`}
                            >

                              {resultStatus}

                            </h3>

                          </div>

                        </div>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          ) : (

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/10">

              <h2 className="text-3xl font-bold text-red-400 mb-3">

                No Results Found

              </h2>

              <p className="text-gray-300 text-lg">

                Try searching with a
                different Roll Number or
                Student Name.

              </p>

            </div>
          )}

          {/* UNIVERSITY DETAILS */}

          <div className="mt-16 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center shadow-2xl">

            <h2 className="text-3xl font-bold text-cyan-400 mb-4">

              Zenith Global University

            </h2>

            <p className="text-gray-300 leading-relaxed text-lg">

              Empowering future innovators through excellence in
              Engineering, Technology, Design, Law, Management,
              Journalism and Applied Sciences.

            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">

              <div>

                📍 Mumbai, Maharashtra, India

              </div>

              <div>

                📧 results@zenithglobaluniversity.edu

              </div>

              <div>

                📞 +91 98765 43210

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
}

export default Results;