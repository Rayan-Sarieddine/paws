import React, { useEffect } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Searching() {
  const navigate = useNavigate();
  const result = useSelector((state) => {
    return state.Post.resultPosts;
  });
  console.log(result);
  useEffect(() => {
    setTimeout(() => {
      if (result?.length === 1) {
        navigate("/lost-found-match");
      } else if (result?.length > 1) {
        navigate("/lost-found-manual");
      } else {
        navigate("/lost-found-no-match");
      }
    }, 5000);
  }, []);
  return (
    <div className="searching">
      <div class="loader"></div>
      <h4>Searching.....</h4>
      <p>This might take a few minutes</p>
    </div>
  );
}

export default Searching;
