import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

function AdminRegister() {

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
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // =========================
  // HANDLE REGISTER
  // =========================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (loading) return;

      try {

        setLoading(true);

        const res =
          await API.post(
            "/admin/register",
            formData
          );

        toast.success(
          res.data.message
        );

        setFormData({
          email: "",
          password: "",
        });

        navigate(
          "/admin/login"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data
            ?.message ||
            "Registration Failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex justify-center items-center px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-white">

        <h1 className="text-4xl font-bold text-center text-cyan-400 mb-8">

          Admin Register

        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 outline-none focus:border-cyan-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 outline-none focus:border-cyan-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 py-4 rounded-2xl text-lg font-semibold shadow-xl transition duration-300 disabled:opacity-50"
          >

            {loading
              ? "Registering..."
              : "Register"}

          </button>

        </form>

        <div className="mt-6 text-center">

          <Link
            to="/admin/login"
            className="text-cyan-300 hover:text-cyan-400"
          >

            Already have account? Login

          </Link>

        </div>

      </div>

    </div>
  );
}

export default AdminRegister;