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
import AboutUs from "./Pages/AboutUs";

import OpenRoute from "../src/components/core/Auth/OpenRoute";
import PrivateRoute from "../src/components/core/Auth/PrivateRoute";
import Myprofile from "../src/components/core/DAshBOard/Myprofile";
import Dashboard from "./Pages/Dashboard";
import Settings from './components/core/DAshBOard/Setting/Settings.jsx'

const App = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col font-inter bg-richblack-800 ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        {/* <Route path="dashboard/my-profile" element={
      
      
      <PrivateRoute>
           <Myprofile/>
      </PrivateRoute>
      
  
      
      } /> */}

        {/* <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<Myprofile />} />
        </Route> */}


<Route 
      element={
        <PrivateRoute>
       <Dashboard/>
        </PrivateRoute>
      }
    >
      <Route path="dashboard/my-profile" element={<Myprofile />} />
      
      <Route path="dashboard/Settings" element={<Settings />} />
      



    </Route>








      </Routes>
    </div>
  );
};

export default App;
