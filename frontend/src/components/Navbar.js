import {
  Link,
  useNavigate,
} from "react-router-dom";

function Navbar() {

  const navigate =
    useNavigate();

  const token =
    localStorage.getItem(
      "token"
    );

  const handleLogout =
    () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "admin"
      );

      navigate(
        "/admin/login"
      );
    };

  return (

    <nav className="bg-black/30 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex flex-col md:flex-row justify-between items-center text-white shadow-2xl sticky top-0 z-50">

      {/* LOGO + UNIVERSITY */}

      <Link
        to="/"
        className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3"
      >

        <h1 className="text-3xl font-extrabold text-cyan-400 hover:text-cyan-300 transition duration-300 tracking-wide">

          🎓 Zenith Global University

        </h1>

        <span className="text-sm text-gray-300 hidden md:block">

          | Excellence in Technology, Design & Management

        </span>

      </Link>

      {/* NAVIGATION LINKS */}

      <div className="flex items-center gap-6 font-semibold text-lg mt-4 md:mt-0">

        <Link
          to="/results"
          className="hover:text-cyan-400 transition duration-300"
        >
          Results
        </Link>

        {token ? (

          <>

            <Link
              to="/admin/dashboard"
              className="hover:text-purple-400 transition duration-300"
            >
              Dashboard
            </Link>

            <button
              onClick={
                handleLogout
              }
              className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl transition duration-300 shadow-lg"
            >
              Logout
            </button>

          </>

        ) : (

          <Link
            to="/admin/login"
            className="hover:text-purple-400 transition duration-300"
          >
            Admin Login
          </Link>

        )}

      </div>

    </nav>
  );
}

export default Navbar;