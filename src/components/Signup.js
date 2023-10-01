import React from "react";
import { TailSpin } from "react-loader-spinner";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app from "../firebase/firebase";
import swal from "sweetalert";
import { usersRef } from "../firebase/firebase";
import { addDoc } from "firebase/firestore";
import bcrypt from 'bcryptjs';
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

const Signup = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [OTP, setOTP] = useState("");

  const verifyOtp = () => {
    try {
      setLoading(true);
      window.confirmationResult.confirm(OTP).then((result) => {
        uploadData();
        swal({
          text: "Successfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        navigate("/signin")
        setLoading(false);
        
      });
    } catch (error) {
      swal({
        text: "Wrong OTP",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
      setLoading(false);
    }
  };

  const uploadData = async () => {
    try{
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.password,salt);
      await addDoc(usersRef, {
        name: form.name,
        password: hash,
        mobile: form.mobile
      });

    }
    catch(error){
      console.log("error uploading data")
    }
    
  };

  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };

  const requestOtp = () => {
    setLoading(true);
    generateRecaptha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        swal({
          text: "OTP Sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setOtpSent(true);
        setLoading(false);
      })
      .catch((error) => {
        swal({
          text: "Error Sending OTP",
          icon: "error",
          buttons: false,
          timer: 3000,
        });
        setLoading(false);
      });
  };

  return (
    <div>
      {otpSent ? (
        <div>
          <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-12 mx-auto">
              <div className="flex flex-col text-center w-full mb-12">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                  Verify OTP
                </h1>
              </div>
              <div className="lg:w-1/2 md:w-2/3 mx-auto ">
                <div className="flex flex-wrap flex-col items-center -m-2">
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label
                        for="otp"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Enter OTP
                      </label>
                      <input
                        // type="text"
                        id="otp"
                        name="otp"
                        value={OTP}
                        onChange={(e) => setOTP(e.target.value)}
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>

                  <div className="p-2 w-full mt-6">
                    <button
                      className=" flex mx-auto text-white bg-orange-600 border-0 py-2 px-8 focus:outline-none hover:bg-orange-700 rounded text-lg"
                      onClick={verifyOtp}
                    >
                      {loading ? (
                        <TailSpin height={25} color="white" />
                      ) : (
                        "Verify OTP"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <>
          <div>
            <section className="text-gray-600 body-font relative">
              <div className="container px-5 py-12 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                    Create Account
                  </h1>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto ">
                  <div className="flex flex-wrap flex-col items-center -m-2">
                    <div className="p-2 w-1/2">
                      <div className="relative">
                        <label
                          for="name"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="year"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="p-2 w-1/2">
                      <div className="relative">
                        <label
                          for="mobile"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Mobile Number
                        </label>
                        <input
                          type="number"
                          id="mobile"
                          name="mobile"
                          value={form.mobile}
                          onChange={(e) =>
                            setForm({ ...form, mobile: e.target.value })
                          }
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="p-2 w-1/2">
                      <div className="relative">
                        <label
                          for="pass"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="pass"
                          name="pass"
                          value={form.password}
                          onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                          }
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>

                    <div className="p-2 w-full mt-6">
                      <button
                        onClick={requestOtp}
                        className=" flex mx-auto text-white bg-orange-600 border-0 py-2 px-8 focus:outline-none hover:bg-orange-700 rounded text-lg"
                      >
                        {loading ? (
                          <TailSpin height={25} color="white" />
                        ) : (
                          "Request OTP"
                        )}
                      </button>
                    </div>
                    <p className="mt-5 leading-7 text-sm text-gray-600">
                      Already have an Account?{" "}
                      <Link to={"/signin"}>
                        <span className="text-orange-600">Sign In</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Signup;
