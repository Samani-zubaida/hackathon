import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import Layout from "./components/Layout/Layout.jsx";

import { AuthContext } from "./Context/authContext.jsx";

function App() {
  const { authUser } = useContext(AuthContext);

  return (
    <div className="fixed inset-0 w-full h-screen bg-[url('/bgImage.svg')] bg-cover bg-no-repeat">
      <Toaster />

      <Routes>
        {/* Root redirect */}
        <Route
          path="/"
          element={<Navigate to={authUser ? "/chatAI" : "/login"} />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/chatAI" />}
        />

        {/* Protected Chatbot */}
        <Route
          path="/chatAI"
          element={authUser ? <Chatbot /> : <Navigate to="/login" />}
        />

        {/* Map / Layout */}
        <Route path="/map" element={<Layout />} />
      </Routes>
    </div>
  );
}

export default App;
