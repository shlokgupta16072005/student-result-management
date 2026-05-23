import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Link } from "react-router-dom";

function Home() {

  return (

    <>

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">

        {/* HERO SECTION */}

        <div className="relative px-6 py-20">

          {/* BACKGROUND GLOW */}

          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"></div>

          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

          <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">

            {/* UNIVERSITY LOGO */}

            <div className="w-36 h-36 rounded-full bg-white/10 backdrop-blur-xl border-4 border-cyan-400 flex items-center justify-center text-7xl shadow-[0_0_60px_rgba(34,211,238,0.4)] mb-10 animate-pulse">

              🎓

            </div>

            {/* UNIVERSITY NAME */}

            <h1 className="text-5xl md:text-7xl xl:text-8xl font-extrabold text-cyan-400 leading-tight mb-6 drop-shadow-2xl">

              Zenith Global University

            </h1>

            {/* TAGLINE */}

            <p className="text-xl md:text-3xl text-gray-200 font-semibold mb-6">

              Excellence in Technology, Innovation & Leadership

            </p>

            {/* BADGES */}

            <div className="flex flex-wrap justify-center gap-4 mb-8">

              <span className="bg-green-500/20 border border-green-400 text-green-300 px-5 py-2 rounded-full font-bold">

                ⭐ NAAC A++ Accredited

              </span>

              <span className="bg-yellow-500/20 border border-yellow-400 text-yellow-300 px-5 py-2 rounded-full font-bold">

                🏆 NIRF Ranked University

              </span>

              <span className="bg-purple-500/20 border border-purple-400 text-purple-300 px-5 py-2 rounded-full font-bold">

                📘 UGC Approved

              </span>

              <span className="bg-cyan-500/20 border border-cyan-400 text-cyan-300 px-5 py-2 rounded-full font-bold">

                🌍 Global Collaborations

              </span>

            </div>

            {/* ESTABLISHED */}

            <p className="text-lg md:text-xl text-cyan-300 mb-10 font-semibold">

              Established in 1998 • Mumbai Main Campus • 25,000+ Students

            </p>

            {/* DESCRIPTION */}

            <p className="max-w-5xl text-lg md:text-xl text-gray-300 leading-relaxed mb-14">

              Welcome to the official Student Result Management Portal of
              Zenith Global University. This advanced MERN Stack based ERP
              platform enables seamless management of student academic records,
              semester results, grades, CGPA, department analytics,
              examination reports and university administration services.

            </p>

            {/* BUTTONS */}

            <div className="flex flex-col md:flex-row gap-6">

              <Link to="/admin/dashboard">

                <button className="bg-cyan-500 hover:bg-cyan-600 px-10 py-4 rounded-2xl text-xl font-bold shadow-2xl transition duration-300 hover:scale-105">

                  🚀 Admin Dashboard

                </button>

              </Link>

              <Link to="/results">

                <button className="bg-purple-500 hover:bg-purple-600 px-10 py-4 rounded-2xl text-xl font-bold shadow-2xl transition duration-300 hover:scale-105">

                  📊 View Results

                </button>

              </Link>

            </div>

          </div>

        </div>

        {/* STATS SECTION */}

        <div className="px-6 py-10">

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center shadow-2xl hover:scale-105 transition duration-300">

              <h2 className="text-5xl font-extrabold text-cyan-300 mb-3">

                25K+

              </h2>

              <p className="text-gray-300 text-lg">

                Students Enrolled

              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center shadow-2xl hover:scale-105 transition duration-300">

              <h2 className="text-5xl font-extrabold text-green-300 mb-3">

                300+

              </h2>

              <p className="text-gray-300 text-lg">

                Recruiting Companies

              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center shadow-2xl hover:scale-105 transition duration-300">

              <h2 className="text-5xl font-extrabold text-purple-300 mb-3">

                95%

              </h2>

              <p className="text-gray-300 text-lg">

                Placement Assistance

              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center shadow-2xl hover:scale-105 transition duration-300">

              <h2 className="text-5xl font-extrabold text-yellow-300 mb-3">

                120+

              </h2>

              <p className="text-gray-300 text-lg">

                Acre Smart Campus

              </p>

            </div>

          </div>

        </div>

        {/* ABOUT SECTION */}

        <div className="px-6 py-16">

          <div className="max-w-7xl mx-auto">

            <h2 className="text-4xl md:text-5xl font-extrabold text-center text-cyan-400 mb-14">

              Why Choose Zenith Global University?

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center hover:scale-105 transition duration-300">

                <div className="text-6xl mb-6">

                  🏫

                </div>

                <h3 className="text-3xl font-bold text-cyan-300 mb-4">

                  Smart Campus

                </h3>

                <p className="text-gray-300 leading-relaxed text-lg">

                  State-of-the-art infrastructure, modern labs,
                  digital classrooms and advanced research centers.

                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center hover:scale-105 transition duration-300">

                <div className="text-6xl mb-6">

                  👨‍🎓

                </div>

                <h3 className="text-3xl font-bold text-purple-300 mb-4">

                  Industry Exposure

                </h3>

                <p className="text-gray-300 leading-relaxed text-lg">

                  Internship programs, hackathons, startup incubation
                  and real-world industry collaborations.

                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center hover:scale-105 transition duration-300">

                <div className="text-6xl mb-6">

                  🌎

                </div>

                <h3 className="text-3xl font-bold text-green-300 mb-4">

                  Global Opportunities

                </h3>

                <p className="text-gray-300 leading-relaxed text-lg">

                  International exchange programs, global partnerships
                  and career opportunities worldwide.

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* COURSES SECTION */}

        <div className="px-6 py-16">

          <div className="max-w-7xl mx-auto">

            <h2 className="text-4xl md:text-5xl font-extrabold text-center text-cyan-400 mb-12">

              Programs Offered

            </h2>

            <div className="flex flex-wrap justify-center gap-5">

              <span className="bg-cyan-500/20 border border-cyan-400 text-cyan-300 px-6 py-3 rounded-full font-bold text-lg">
                B.Tech
              </span>

              <span className="bg-purple-500/20 border border-purple-400 text-purple-300 px-6 py-3 rounded-full font-bold text-lg">
                MBA
              </span>

              <span className="bg-pink-500/20 border border-pink-400 text-pink-300 px-6 py-3 rounded-full font-bold text-lg">
                B.Des
              </span>

              <span className="bg-yellow-500/20 border border-yellow-400 text-yellow-300 px-6 py-3 rounded-full font-bold text-lg">
                B.Arch
              </span>

              <span className="bg-green-500/20 border border-green-400 text-green-300 px-6 py-3 rounded-full font-bold text-lg">
                Journalism
              </span>

              <span className="bg-red-500/20 border border-red-400 text-red-300 px-6 py-3 rounded-full font-bold text-lg">
                Law
              </span>

              <span className="bg-indigo-500/20 border border-indigo-400 text-indigo-300 px-6 py-3 rounded-full font-bold text-lg">
                Fashion Designing
              </span>

              <span className="bg-orange-500/20 border border-orange-400 text-orange-300 px-6 py-3 rounded-full font-bold text-lg">
                Hotel Management
              </span>

            </div>

          </div>

        </div>

        {/* CAMPUS INFO */}

        <div className="px-6 pb-20">

          <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">

            <h2 className="text-4xl font-extrabold text-cyan-300 mb-10 text-center">

              📍 Campus Information

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

              <div>

                <h3 className="text-2xl font-bold mb-3">

                  Main Campus

                </h3>

                <p className="text-gray-300 text-lg">

                  Mumbai, Maharashtra, India

                </p>

              </div>

              <div>

                <h3 className="text-2xl font-bold mb-3">

                  Contact

                </h3>

                <p className="text-gray-300 text-lg">

                  +91 98765 43210

                </p>

                <p className="text-gray-300 text-lg">

                  admissions@zenithglobaluniversity.edu

                </p>

              </div>

              <div>

                <h3 className="text-2xl font-bold mb-3">

                  Placement Record

                </h3>

                <p className="text-gray-300 text-lg">

                  95% Placement Assistance

                </p>

                <p className="text-gray-300 text-lg">

                  300+ Recruiting Companies

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
}

export default Home;