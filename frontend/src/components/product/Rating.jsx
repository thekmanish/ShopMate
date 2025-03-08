import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const Rating = ({ rating }) => {
  return (
    <div className="flex items-center justify-center space-x-1 text-yellow-500">
      <span>
        {rating >= 1 ? <FaStar /> : rating >= 0.5 ? <FaStarHalf /> : <CiStar />}
      </span>
      <span>
        {rating >= 2 ? <FaStar /> : rating >= 1.5 ? <FaStarHalf /> : <CiStar />}
      </span>
      <span>
        {rating >= 3 ? <FaStar /> : rating >= 2.5 ? <FaStarHalf /> : <CiStar />}
      </span>
      <span>
        {rating >= 4 ? <FaStar /> : rating >= 3.5 ? <FaStarHalf /> : <CiStar />}
      </span>
      <span>
        {rating >= 5 ? <FaStar /> : rating >= 4.5 ? <FaStarHalf /> : <CiStar />}
      </span>
      <span className="ml-2 text-gray-600">{rating}</span>
    </div>
  );
};

export default Rating;
