import React, { useEffect, useRef, useState } from "react";
import ReactStars from "react-stars";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { reviewsRef, db } from "../firebase/firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import swal from "sweetalert";

function Reviews({ id, prvRating, preRated }) {
  //   console.log(id, prvRating, preRated);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const input = useRef();
  const nInput = useRef();

  const sendReview = async () => {
    setLoading(true);
    try {
      await addDoc(reviewsRef, {
        movieid: id,
        name: nInput.current.value,
        rating: rating,
        thought: input.current.value,
        timestamp: new Date().getTime(),
      });
      const docRef = doc(db, "movies", id);
      await updateDoc(docRef, {
        rating: prvRating + rating,
        rated: preRated + 1,
      });
      swal({
        title: "Succesfuly Shared Review",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
      setLoading(false);
      nInput.current.value = "";
      input.current.value = "";
      setRating(0);
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
  };
  useEffect(() => {
    async function getReviews() {
      setReviewsLoading(true);
      setReviews([]);
      let quer = query(reviewsRef, where("movieid", "==", id));
      const querySnap = await getDocs(quer);
      querySnap.forEach((doc) => {
        setReviews((prev) => [...prev, doc.data()]);
      });
      setReviewsLoading(false);
      console.log(reviews);
    }
    getReviews();
  }, []);

  return (
    <div className=" mt-4 border-t-2 border-gray-700 w-full">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          sendReview();
        }}
      >
        <ReactStars
          size={30}
          half={true}
          value={rating}
          edit={true}
          onChange={(rate) => setRating(rate)}
        />
        <input
          required
          type="text"
          placeholder="Enter you name here"
          className=" rounded-sm mt-1 w-full p-2 header"
          ref={nInput}
        />
        <input
          required
          type="text"
          placeholder="Share your thoughts..."
          className=" rounded-sm mt-1 w-full p-2 header"
          ref={input}
        />
        <button
          type="submit"
          className=" rounded-sm flex justify-center bg-green-600 w-full p-1"
        >
          {loading ? <TailSpin height={25} color="white" /> : "Share"}
        </button>
      </form>
      {reviewsLoading ? (
        <div className=" mt-6 flex justify-center">
          <ThreeDots height={15} color="white" />
        </div>
      ) : (
        <div className=" mt-4">
          {reviews.map((e, i) => {
            return (
              <div key={i} className=" mt-2 p-2 w-ful border-b border-gray-600">
                <div className=" flex items-center justify-between">
                  <p className=" text-blue-500">{e.name}</p>
                  <p className=" ml-3 text-xs">
                    ({new Date(e.timestamp).toLocaleString()})
                  </p>
                </div>
                <div className=" flex items-center justify-between">
                  <p>{e.thought}</p>
                  <ReactStars
                    size={15}
                    half={true}
                    value={prvRating / preRated}
                    edit={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Reviews;
