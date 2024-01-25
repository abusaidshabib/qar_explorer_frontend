import "./App.css";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import useAuthCheck from "./hooks/useAuthCheck";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { Toaster } from "react-hot-toast";

const App = () => {
  const mode = useSelector((state) => state.global.mode);
  const checked = useAuthCheck();
  return (
    <div className={`${mode} bg-background text-text`} dir="rtl">
      {checked ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={"/login"} />} replace />
            <Route
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
            </Route>
          </Routes>
          <Toaster />
        </BrowserRouter>
      ) : (
        <div className="w-full h-[100vh] flex  flex-row justify-center items-center">
          <p className="text-text text-xl">Loading.....</p>
        </div>
      )}
    </div>
  );
};

export default App;
