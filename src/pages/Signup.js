import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../components/Config_Firebase";

import "../css/Login.css";
import { Input } from "../raw_components/raw_input";
import { Label } from "../raw_components/raw_label";
import { Button } from "../raw_components/ButtonVariants";
import ParticlesDemo from "../components/ParticlesBackground";

import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    pass: "",
    username: "",
  });
  const navigate = useNavigate();

  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5004/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            pass: credentials.pass,
            username: credentials.username,
          }),
        }
      );

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        // alert('Enter Valid Credentials')
        toast.error("Incorrect Credentials!", "error");
      } else {
        toast.success("Successfully Created Account", "success");
        navigate("/");

        // alert('Account Created Successfull')
      }
    } catch (error) {
      console.log(error);
    }
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         "http://localhost:5004/api/auth/createuser",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: credentials.email,
//             pass: credentials.pass,
//             username: credentials.username,
//           }),
//         }
//       );

//       const json = await response.json();
//       console.log(json);
//       if (!json.success) {
//         // alert('Invaid Credentials')
//       }

//       if (json.success) {
//         localStorage.setItem("auth-Token", json.authToken);
//         localStorage.setItem("email", credentials.email);
//         if (json.adminId) {
//           localStorage.setItem("admin", json.adminId);
//         }

//         toast.success("Success message");
//         navigate("/home");
//       }
//     } catch (error) {
//       toast.error("Error message", "error");
//       console.log(error);
//     }
//   };

  // handles Google authentication of user
  const handleClickk = async (e) => {
    try {
      const data = await signInWithPopup(auth, provider);
      console.log(data);
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);

      const response = await fetch(
        "http://localhost:5004/api/auth/google_signup",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: data.user.email,
            name: data.user.displayName,
            phone: data.user.phoneNumber,
            id: data.user.uid,
          }),
        }
      );

      const json = await response.json();
      localStorage.setItem("auth-Token", json.authToken);
      // window.location.reload(false);
      console.log(json);
      if (!json.success) {
        // showAlert('Danger', 'Invalid Credentials')
        // calltoast("Incorrect Credentials!", "error")
        // alert('Invalid Credentials');
        // toast.error("Invalid Credentials");
      } else {
        // showAlert('success', 'Logged in Successfully');
        // calltoast("Logged In successfully!", "success")
        setTimeout(() => {
          toast.success("Signed In Successfully");
        }, 1000);

        navigate("/home");
        // alert('Logged In');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* <AnimatedGradientBG /> */}
      <ParticlesDemo />
      <Toaster />
      <div className="login-grandfather-cont flex flex-col">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Only Us
        </span>
        <span className="mt-4 pointer-events-none whitespace-pre-wrap  text-gray-800/80 bg-clip-text text-center text-xl font-semibold leading-none  dark:text-gray-100/80">
          Talk to Strangers! Connect with the world.
        </span>
        <div className="login-container" data-aos="fade-right">
          <div className="container my-3 inner-login-container">
            <h2 className="my-4 text-xl font-sans font-medium text-center">
              Signup
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group m-2  ">
                <Label htmlFor="exampleInputEmail1">Username</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="username"
                  value={credentials.username}
                  aria-describedby="emailHelp"
                  onChangeFunc={onChange}
                  placeholder="Enter Username"
                />
              </div>
              <div className="form-group m-2  ">
                <Label htmlFor="exampleInputEmail1">Email address</Label>
                <Input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="email"
                  value={credentials.email}
                  aria-describedby="emailHelp"
                  onChangeFunc={onChange}
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group m-2">
                <Label htmlFor="exampleInputPassword1">Password</Label>
                <Input
                  type="password"
                  className="form-control"
                  id="pass"
                  value={credentials.pass}
                  name="pass"
                  onChangeFunc={onChange}
                  placeholder="Password"
                />
              </div>
              <div className="form-check flex justify-end">
                {/* <input
                  type="checkbox"
                  className="form-check-input forgot"
                  onClick={showPass}
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Show Password
                </label> */}
                <Link to="/Forgotpassword" className="forgotpass text-xs mb-2 ">
                  Forgot Password?
                </Link>
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="btn m-2 w-full"
                  variant="secondary"
                >
                  Sign Up
                </Button>
              </div>
            </form>
            <hr />
            <div>
              {!value && (
                // <button onClick={handleClick}>Continue With Google</button>
                <div className="google-cont mt-3">
                  <div className="google-btn" onClick={handleClickk}>
                    <div className="google-icon-wrapper">
                      <img
                        className="google-icon"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-iaTPCofiaWU6mMEEj_2zaxn_7Taor_oLiw&usqp=CAU"
                        alt="google-icon"
                      />
                    </div>
                    <p className="btn-text text-right">
                      <b>Sign in with google</b>
                    </p>
                  </div>
                </div>
              )}
            </div>
            <center>
              <div className="form-caption my-4">
                <p style={{ marginTop: "0px" }} className="text-zinc-400">
                  Don't Have An Account?
                  <Link to="/" className="text-zinc-100 ml-2 font-medium">
                    Login
                  </Link>
                </p>
              </div>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
