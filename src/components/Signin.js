import React, { useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { query, where, getDocs } from "firebase/firestore";
import { usersRef } from "../firebase/firebase";
import bcrypt from "bcryptjs";
import { AppState } from "../App";

const Signin = () => {
  const navigate = useNavigate();
  const useAppState = useContext(AppState);
  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const signin = async() => {
    setLoading(true);
    
      let quer = query(usersRef, where("mobile", "==", form.mobile));
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if (isUser) {
          // if(form.password === _data.password){
          useAppState.setLogin(true);
          useAppState.setUserName(_data.name)
          navigate("/");
          swal({
            title: "Successfully Signed In",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
        } else {
          swal({
            title: "Wrong Mobile Number or Password",
            icon: "error",
            buttons: false,
            timer: 3000,
          });
        }
      });
    setLoading(false);
  };

  return (
    <div>
      <div>
        <section clasNames="text-gray-600 body-font relative">
          <div className="container px-5 py-12 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Login to Your Account
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
                      Mobile Number
                    </label>
                    <input
                      type="number"
                      id="name"
                      name="name"
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
                    <label for="year" className="leading-7 text-sm text-gray-600">
                      Password
                    </label>
                    <input
                      type="password"
                      id="year"
                      name="year"
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
                    onClick={signin}
                    className="flex mx-auto text-white bg-orange-600 border-0 py-2 px-8 focus:outline-none hover:bg-orange-700 rounded text-lg"
                  >
                    {loading ? (
                      <TailSpin height={25} color="white" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
                <p className="mt-5 leading-7 text-sm text-gray-600">
                  Don't have an Account?{" "}
                  <Link to={"/signup"}>
                    <span className="text-orange-600">Sign Up</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signin;
