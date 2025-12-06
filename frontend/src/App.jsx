// import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import { Toaster } from "react-hot-toast";
import ChatCompo from "./component/chatCompo.jsx";
import { ChatProvider } from "./Context/chatContext.jsx";
import Layout from "./components/Layout/Layout"
function App() {
  return (
    <ChatProvider>
      <div className="fixed inset-0 w-full h-screen bg-[url('/bgImage.svg')] bg-cover bg-no-repeat">
        <Toaster />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          {/* AI Chat Route */}
          <Route path="/chatAI" element={<ChatCompo />} />
           <Route path="/map" element={<Layout/>} />
        </Routes>
      </div>
    </ChatProvider>
  );
}

export default App
