import React, { useState,useEffect } from 'react'
import ReactStars from 'react-stars'
import { db } from '../firebase/firebase'
import { useParams } from 'react-router-dom'
import {doc, getDoc} from 'firebase/firestore'
import {ThreeCircles} from 'react-loader-spinner'
import Reviews from './Reviews'

const Details = () => {

    const {id} = useParams();
    const [data, setData] = useState({
        title: "",
        year: "",
        img: "",
        description: "",
        rating: 0,
        rated: 0
    });

    const [loader, setLoader] = useState(false);
  
    useEffect(() => {
        setLoader(true);
        async function getData() {
                const _doc = doc(db, "movies", id);
                const _data = await getDoc(_doc);
                setData(_data.data());
                setLoader(false);
        }
        getData();
    },[])

  return (
    <div className='flex md:flex-row flex-col p-4 mt-4 md:items-start items-center w-full justify-center'>
    {loader ? <div className='flex justify-center items-center w-full h-96 '><ThreeCircles height={30} color='black' /> </div>:
        <>
        <img className='h-96 rounded-xl imginner md:sticky top-24 ' src={data.img}/>
        <div className='md:w-1/2 w-auto md:ml-10 ml-0 md:mt-0 mt-10'>
            <h1 className='md:text-3xl text-3xl '>{data.title} <span className='text-xl'>({data.year})</span></h1>
            <div className='-ml-2'><ReactStars
            className="ml-2"
            size={20}
            half={true}
            value={data.rating/data.rated}
            edit={false}
                // color2='red'
                // color1='white'
              /></div>
            <p className='text-justify text-gray-500 mt-5'>{data.description}</p>
            <Reviews id={id} prevRating={data.rating} userRated={data.rated} />
        </div>
        </>
    }
    </div>
    
  )
}

export default Details