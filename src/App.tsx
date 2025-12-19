import { Suspense, lazy } from "react";
import { useAuthStore } from "./store/authStore";

import "./App.css";
import { HashRouter, Navigate, Route, Routes } from "react-router";
import type { AuthStore } from "./store/authStore";
import Login from "./features/login/login";
import Navbar from "./features/navbar/navbar";
import Loading from "./shared/loading";
import CreateIncidentModal from "./features/incidents/createIncident/createIncidentModal";
import { ProtectedRoute } from "./protectedRoute";

function App() {
  const user = useAuthStore((state: AuthStore) => state.user);
  const Dashboard = lazy(() => import("./features/dashboard/dashboard"));
  const Incident = lazy(
    () => import("./features/incidents/incidentDetail/incident"),
  );

  return (
    <HashRouter>
      <div>
        {user && <Navbar />}
        <main>
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/dashboard" /> : <Login />}
            />

            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loading message="Loading dashboard" />}>
                    <Dashboard />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            <Route
              path="/incidents/:id"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loading />}>
                    <Incident />
                  </Suspense>
                </ProtectedRoute>
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
    </HashRouter>
  );
}

export default App;
