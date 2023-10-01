import React, { useEffect } from "react";
import ReactStars from "react-stars";
import { useState } from "react";
import { getDocs } from "firebase/firestore";
import { movieRef } from "../firebase/firebase";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";


const Cards = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoader(true);
      const _data = await getDocs(movieRef);
      _data.forEach((doc) => {
        setData((prv) => [...prv, { ...doc.data(), id: doc.id }]);
      });
      setLoader(false);
    }
    getData();
  }, []);

  return (
    <>
    <h1 className="text-2xl md:text-3xl text-center  mt-8 mb-4" >Latest Trending Movies</h1>
    <div className="w-full flex m-0 justify-center flex-wrap md:p-3 p-0">
    
      {loader ? (
        <div className="w-full flex justify-center md:justify-center md:items-center  items-center h-96">
          <BallTriangle height={100} color="black" />{" "}
        </div>
      ) : (
        data.map((e, i) => {
          return (
            <Link to={`/detail/${e.id}`}>
              <div key={i} className="rounded-lg flex flex-col moviebox md:text-md text-sm md:w-56 md:h-96 w-40 h-80 flex-wrap md:mb-5 md:ml-3 md:mr-3 md:p-3 mb-4 ml-2 mr-2  p-2">
                <img className=" md:h-64 h-48 mb-2 rounded-lg" src={e.img}></img>
                <h2>
                  <span className="text-orange-600">Movie: </span>
                  {e.title}
                </h2>
                <h2 className="flex items-center">
                  <span className="flex items-center text-orange-600">
                    Rating:
                  </span>
                  <ReactStars
                    className="ml-2"
                    size={15}
                    half={true}
                    value={e.rating/e.rated}
                    edit={false}
                    // color2='red'
                    // color1='white'
                  />
                </h2>
                <h2>
                  <span className="text-orange-600">Year: </span>
                  {e.year}
                </h2>
              </div>
            </Link>
          );
        })
      )}
    </div>
    </>
  );
};

export default Cards;
