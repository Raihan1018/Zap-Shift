import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { userName, review: testominal, user_photoURL, ratings } = review;

  const safe = Math.max(
    0,
    Math.min(
      5,
      Number.isFinite(Number(ratings)) ? Math.floor(Number(ratings)) : 0
    )
  );

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8 mx-auto">
      {/* Quote Icon */}
      <div className="text-primary mb-3 sm:mb-4">
        <FaQuoteLeft size={28} className=" opacity-60" />
      </div>

      {/* Quote text */}
      <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
        {testominal}
      </p>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-300 my-3 sm:my-4"></div>

      {/* Profile section */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#004D66] overflow-hidden flex-shrink-0">
          <img
            className="w-full h-full object-cover rounded-full"
            src={user_photoURL}
            alt={userName}
          />
        </div>

        <div className="flex flex-col">
          <h3 className="text-base sm:text-lg font-semibold text-[#004D66]">
            {userName}
          </h3>

          <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1">
            {/* Filled Stars */}
            {[...Array(safe)].map((_, i) => (
              <FaStar key={`filled-${i}`} className="text-yellow-400" />
            ))}

            {/* Empty Stars */}
            {[...Array(5 - safe)].map((_, i) => (
              <FaStar key={`empty-${i}`} className="text-gray-300" />
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
