import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { movieRef } from "../firebase/firebase";
import swal from "sweetalert";
import { AppState } from "../App";
import { useNavigate } from "react-router-dom";

const Addmovie = () => {
  const useAppState = useContext(AppState);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    year: "",
    description: "",
    img: "",
    rated: 0,
    rating: 0 
  });

  const [loading, setLoading] = useState(false);

  const addMovie = async () => {
    if(useAppState.login){
    setLoading(true);
    await addDoc(movieRef, form);
    swal({
      title: "Successfully Added",
      icon: "success",
      buttons: false,
      timer: 3000,
    });
    setForm({
      title: "",
      year: "",
      description: "",
      img: "",
    });
    setLoading(false);
  }
  else{
    navigate('/signin');
  }
  };

  return (
    <div>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-12 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Add New Movie
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Fill the given information about the Movie.
            </p>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-600">
                    Title
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="year" class="leading-7 text-sm text-gray-600">
                    Year
                  </label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-600">
                    Movie Poster (URL)
                  </label>
                  <input
                    type="text"
                    id="img"
                    name="img"
                    value={form.img}
                    onChange={(e) => setForm({ ...form, img: e.target.value })}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <div class="relative">
                  <label
                    for="description"
                    class="leading-7 text-sm text-gray-600"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-orange-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button
                  onClick={addMovie}
                  class="flex mx-auto text-white bg-orange-600 border-0 py-2 px-8 focus:outline-none hover:bg-orange-700 rounded text-lg"
                >
                  {loading ? <TailSpin height={25} color="white" /> : "Submit"}
                </button>
              </div>
              <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <a class="text-orange-600">tripathiaditya5145@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Addmovie;
