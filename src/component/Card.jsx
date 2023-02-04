import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "../firebase/firebase";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

function Card() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const res = await getDocs(moviesRef);
      res.forEach((doc) => {
        setData((prv) => [...prv, { ...doc.data(), id: doc.id }]);
      });
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <div className="flex flex-wrap justify-center p-3 mt-2 gap-x-3">
      {loading ? (
        <div className=" relative top-52">
          <ThreeDots className="" height={100} color="white" />
        </div>
      ) : (
        data.map((e, i) => {
          return (
            <Link to={`/details/${e.id}`}>
              <div
                key={i}
                className=" flex flex-col justify-center card h-80 md:h-auto w-40 md:w-64 font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-3 transition-all duration-500 rounded"
              >
                <img className=" w-36 md:w-64" src={e.img} alt="poster" />
                <h1>
                  <span className=" text-gray-500">Name: </span>
                  {e.title}
                </h1>
                <h1 className=" flex items-center mr-1">
                  <span className=" text-gray-500">Rating: </span>
                  <ReactStars
                    size={20}
                    half={true}
                    value={e.rating / e.rated}
                    edit={false}
                  />
                </h1>
                <h1>
                  {" "}
                  <span className=" text-gray-500">Year: </span>
                  {e.year}
                </h1>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}

export default Card;
