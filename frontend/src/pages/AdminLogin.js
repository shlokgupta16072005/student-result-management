import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

function AdminLogin() {

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // =========================
  // HANDLE LOGIN
  // =========================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (loading) return;

      try {

        setLoading(true);

        // =========================
        // LOGIN API
        // =========================

        const res =
          await API.post(
            "/admin/login",
            formData
          );

        // =========================
        // CHECK TOKEN
        // =========================

        if (
          !res.data ||
          !res.data.token
        ) {

          toast.error(
            "Invalid Server Response"
          );

          return;
        }

        // =========================
        // SAVE TOKEN
        // =========================

        localStorage.setItem(
          "adminToken",
          res.data.token
        );

        // =========================
        // SAVE ADMIN DATA
        // =========================

        localStorage.setItem(
          "admin",
          JSON.stringify(
            res.data.admin
          )
        );

        // =========================
        // SUCCESS MESSAGE
        // =========================

        toast.success(
          "Login Successful"
        );

        // =========================
        // CLEAR FORM
        // =========================

        setFormData({
          email: "",
          password: "",
        });

        // =========================
        // REDIRECT
        // =========================

        setTimeout(() => {

          navigate(
            "/admin/dashboard"
          );

        }, 1000);

      } catch (error) {

        console.log(
          "LOGIN ERROR:",
          error
        );

        toast.error(
          error.response?.data
            ?.message ||
            "Login Failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex justify-center items-center px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-white">

        {/* TITLE */}

        <h1 className="text-4xl font-bold text-center text-cyan-400 mb-8">

          Admin Login

        </h1>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 outline-none focus:border-cyan-400"
          />

          {/* PASSWORD */}

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 outline-none focus:border-cyan-400"
          />

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 py-4 rounded-2xl text-lg font-semibold shadow-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >

            {loading
              ? "Logging In..."
              : "Login"}

          </button>

        </form>

        {/* LINKS */}

        <div className="mt-6 text-center flex flex-col gap-3">

          <Link
            to="/admin/register"
            className="text-cyan-300 hover:text-cyan-400 transition duration-300"
          >

            Create Admin Account

          </Link>

          <Link
            to="/"
            className="text-cyan-300 hover:text-cyan-400 transition duration-300"
          >

            ← Back to Home

          </Link>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;