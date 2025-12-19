import { Suspense, lazy } from "react";
import { useAuthStore } from "./store/authStore";

import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import type { AuthStore } from "./store/authStore";
import Login from "./features/login/login";
import Navbar from "./features/navbar/navbar";
import Loading from "./shared/loading";
import CreateIncidentModal from "./features/incidents/createIncident/createIncidentModal";

function App() {
  const user = useAuthStore((state: AuthStore) => state.user);
  const Dashboard = lazy(() => import("./features/dashboard/dashboard"));
  const Incident = lazy(
    () => import("./features/incidents/incidentDetail/incident"),
  );

  return (
    <BrowserRouter>
      <div>
        {user && <Navbar />}
        <main>
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/dashboard" /> : <Login />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/dashboard" /> : <Login />}
            />

            <Route
              path="/dashboard/*"
              element={
                user ? (
                  <Suspense fallback={<Loading message="Loading dashboard" />}>
                    <Dashboard />
                  </Suspense>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/incidents/:id"
              element={
                user ? (
                  <Suspense fallback={<Loading />}>
                    <Incident />
                  </Suspense>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {/* Fallback 404 */}
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>

          <Suspense fallback={<Loading />}>
            <CreateIncidentModal />
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
