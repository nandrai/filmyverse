import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ThreeDots } from "react-loader-spinner";
import Reviews from "./Reviews";

function Details() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [details, setDetails] = useState({
    title: "",
    year: "",
    img: "",
    description: "",
    rating: 0,
    rated: 0,
  });

  useEffect(() => {
    async function getDetails() {
      setLoading(true);
      const _doc = doc(db, "movies", id);
      const result = await getDoc(_doc);
      setDetails(result.data());
      setLoading(false);
    }
    getDetails();
  }, []);
  return loading ? (
    <div className=" w-full min-h-screen flex justify-center items-center">
      <ThreeDots height={100} color="white" />
    </div>
  ) : (
    <div className=" flex flex-col  md:flex-row items-center md:items-start  p-4 mt-4 justify-center w-full">
      <img className=" h-96 md:sticky top-24" src={details.img} alt="Poster" />
      <div className=" ml-0 md:ml-4 w-full md:w-1/2">
        <h1 className=" mt-3 text-3xl font-bold text-gray-400">
          {details.title}{" "}
          <span className=" text-xl">{`(${details.year})`}</span>
        </h1>
        <ReactStars
          size={20}
          half={true}
          value={details.rating / details.rated}
          edit={false}
        />
        <p className=" mt-2">{details.description}</p>
        <Reviews id={id} prvRating={details.rating} preRated={details.rated} />
      </div>
    </div>
  );
}

export default Details;
