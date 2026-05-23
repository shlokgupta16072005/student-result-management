import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

function Register() {

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

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

    <div className="min-h-screen bg-slate-900 flex justify-center items-center px-4">

      <div className="w-full max-w-md bg-white/10 p-8 rounded-3xl text-white">

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
            className="w-full p-4 rounded-2xl bg-black/20 border border-white/10"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-2xl bg-black/20 border border-white/10"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 py-4 rounded-2xl"
          >

            {loading
              ? "Registering..."
              : "Register"}

          </button>

        </form>

        <div className="mt-6 text-center">

          <Link
            to="/admin/login"
            className="text-cyan-300"
          >

            Already have account?

          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;