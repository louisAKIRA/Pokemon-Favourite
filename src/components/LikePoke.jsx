/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function LikePoke() {
  const [like, setLike] = useState(false);

  const toggleLike = () => {
    setLike((check) => !check);
  };

  return (
    <button onClick={toggleLike} title="Like">
      {like ? (
        <FaHeart style={{ color: "red", padding: "0" }} />
      ) : (
        <FaRegHeart style={{ padding: "0" }} />
      )}
    </button>
  );
}

export default LikePoke;
