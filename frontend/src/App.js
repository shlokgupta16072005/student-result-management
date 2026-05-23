import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";

import AdminLogin from "./pages/AdminLogin";

import AdminRegister from "./pages/AdminRegister";

import AddStudent from "./pages/AddStudent";

import EditStudent from "./pages/EditStudent";

import Results from "./pages/Results";

import AdminDashboard from "./pages/AdminDashboard";

import ManageStudents from "./pages/ManageStudents";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <Routes>

      {/* ========================= */}
      {/* PUBLIC ROUTES */}
      {/* ========================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/results"
        element={<Results />}
      />

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin/register"
        element={<AdminRegister />}
      />

      {/* ========================= */}
      {/* PROTECTED ROUTES */}
      {/* ========================= */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add-student"
        element={
          <ProtectedRoute>
            <AddStudent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/edit-student/:id"
        element={
          <ProtectedRoute>
            <EditStudent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/manage-students"
        element={
          <ProtectedRoute>
            <ManageStudents />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;