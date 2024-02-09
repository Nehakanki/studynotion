import { toast } from "react-hot-toast";
import { navigate } from '@reach/router';
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export function sendOTP(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        // ensuring that an OTP is only sent to users who are not already registered.
        exist_user: true,
      });
      console.log("Send OTP Successfully", response);
      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("OTP Sent Successfully");

      navigate("/verify-email");
    } catch (error) {
      console.log("Error while sending OTP", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

    export function signUp(
      firstName,
          lastName,
          email,
          password,
          confirmPassword,
          accountType,
          contactNumber,
          otp,
    )
{
  return async(dispatch)=>{
   const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", SIGNUP_API,

      {firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp,});

      console.log("Signup response", response);
      console.log(response.data.success);
      if(!response.data.success){
        throw new Error(response.data.message);
      }
      toast.success("Sigup Done Successfully");
      navigate('/login');
     
    }catch(error){
      console.log("Error while doing Signup", error);
      toast.error("Signup Failed");
      navigate('/signup');

    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);

  }
}

export function login(
  email,
  password
){
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try{
      const response = apiConnector("POST",LOGIN_API,{
        email,
        password
      });
      console.log("LOGIN API RESPONSE............", response);
      console.log(response.data.success);

      dispatch(setToken(response.data.token));
    // find the image into User data and if the image is avail. then set it else use the api for creating image using First name and lastName

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

      const userImage = response.data?.user?.image ?  response.data.user.image:  `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      //  payload of the action object. The spread operator (...) is used to merge the properties of response.data.user with the image property set to userImage
      dispatch(setUser({ ...response.data.user, image: userImage }))

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user",JSON.stringify(reponse.data.user))
      navigate("/dashboard/my-profile")

    

      toast.success("Login Successful");



    }catch(error){
      console.log("Error while LOGIN.", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)

  }
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      console.log("token password reset -->", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  };
}
