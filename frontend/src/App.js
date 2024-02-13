import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Navbar from "./components/core/Navbar";
import Signup from "./Pages/Signup";

import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";

const App = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col font-inter bg-richblack-800 ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="update-password/:id" element={<UpdatePassword />} />
        <Route path= "verify-email" element={<VerifyEmail/>}/>
      </Routes>
    </div>
  );
};

export default App;
