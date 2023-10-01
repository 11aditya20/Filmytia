import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { ThreeDots } from "react-loader-spinner";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TailSpin } from "react-loader-spinner";
import { reviewRef, db, } from "../firebase/firebase";
import swal from "sweetalert";
import { AppState } from "../App";
import { useNavigate } from "react-router-dom";



const Reviews = ({ id, prevRating, userRated }) => {
  const navigate = useNavigate();
  const useAppState = useContext(AppState)
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const [rloading, setRloading] = useState(false);
  const [newReview, setNewReview] = useState(0);

  const sendReview = async () => {
    
    try {
      setLoading(true);
      if(useAppState.login){
      await addDoc(reviewRef, {
        movieid: id,
        name: useAppState.userName,
        rating: rating,
        thought: form,
        timestamp: new Date().getTime(),
      });

      const ref = doc(db, "movies", id);
      await updateDoc(ref, {
        rating: prevRating + rating,
        rated: userRated + 1,
      });

      setRating(0);
      setForm("");
      setNewReview(newReview+1);

      swal({
        title: "Review Sent",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
    }
    else{
      navigate('/signin');
    }
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  
  };

  useEffect(() => {
    async function getData() {
      setRloading(true);
      setData([]);
      let quer = query(reviewRef, where("movieid", "==", id));
      const qdata = await getDocs(quer);
      qdata.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });
      setRloading(false);
    }
    getData();
  },[newReview]);

  return (
    <div className="mt-10 py-5 w-full border-t-2 border-gray-300">
      <div className="-mx-2">
        <ReactStars
          className="ml-2"
          size={30}
          half={true}
          value={rating}
          onChange={(rate) => setRating(rate)}
          // color2='red'
          // color1='white'
        />
      </div>

      <input
        type="text"
        placeholder="share your thoughts..."
        value={form}
        onChange={(e) => setForm(e.target.value)}
        class="w-full bg-gray-100 bg-opacity-50  border border-gray-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />

      <button
        onClick={sendReview}
        class="flex justify-center mx-auto w-full text-white bg-orange-600 border-0 py-2 px-8 focus:outline-none hover:bg-orange-700  text-lg -ml-0"
      >
        {loading ? <TailSpin height={30} color="white" /> : "share"}
        {/* {loading ? <TailSpin height={25} color="white"/> : "Submit"} */}
      </button>

      {rloading ? (
        <div className="mt-5 flex justify-center">
          <ThreeDots height={10} color="black" />
        </div>
      ) : (
        <div className="w-auto mt-10">
        <div><label for="name" class="leading-7 text-sm text-gray-600">
        Comments
      </label></div>
          {data.map((e, i) => {
            return (
              <div key={i} className="bg-gray-300 mt-2 rounded border">
                <div className="flex reviewblock items-center justify-between rounded pl-5 pr-5 pt-2 pb-2 w-full bg-gray-600 text-white-100">
                <span>
                  <span><h1 className="text-xl text-white">{e.name}</h1></span>
                  <p className="text-xs mt-1 text-white">{new Date(e.timestamp).toLocaleString()}</p>
                </span>
                  <div><ReactStars
          className="ml-4"
          size={15}
          half={true}
          value={e.rating}
          edit={false}
          // color2='red'
          // color1='white'
        /></div>
                </div>
                
                <p className="p-4">{e.thought}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reviews;
