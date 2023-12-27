import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "./style.css";
import { postsDataSource } from "../../../../../core/dataSource/remoteDataSource/posts";
import { useNavigate } from "react-router-dom";
function LostFound() {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      const response = await postsDataSource.getPosts();
      setPosts(response.posts);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const navigateTo = useNavigate();
  const navigatoTolostPage = () => {
    navigateTo("/lost-found-main");
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <div className="grid-header">
        <img src="./favicon.png" alt="logo"></img>
        <h3>Lost & Found</h3>
      </div>
      {posts?.length === 0 ? (
        <p className="no-pets-found">
          Hurray! There are no lost pets at the moment!
        </p>
      ) : (
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          {posts?.slice(0, 8).map((post) => {
            const formattedDate = new Date(post.updatedAt).toLocaleDateString(
              "default",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            );
            const formattedTime = new Date(post.updatedAt).toLocaleTimeString(
              "en-US",
              {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }
            );
            return (
              <SwiperSlide key={post.id}>
                <img
                  src={`http://127.0.0.1:8000/images/posts/${post.image}`}
                  alt="lost and found post"
                  className="card-post-img"
                />
                <div className="post-details">
                  <div className="post-detail">
                    <p className="post-detail-param">Location:</p>
                    <p className="post-detail-value">{post.location}</p>
                  </div>
                  <div className="post-detail">
                    <p className="post-detail-param">Date:</p>
                    <p className="post-detail-value">{formattedDate}</p>
                  </div>
                  <div className="post-detail">
                    <p className="post-detail-param">Time:</p>
                    <p className="post-detail-value">{formattedTime}</p>
                  </div>
                  <div className="post-detail">
                    <p className="post-detail-param">Type:</p>
                    <p className="post-detail-value">{post.type}</p>
                  </div>
                  <div className="post-detail">
                    <p className="post-detail-param">Description:</p>
                    <p className="post-detail-value">{post.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      <div className="center-div">
        <button
          className="btn lost-found-navigation"
          onClick={navigatoTolostPage}
        >
          View All Posts
        </button>
      </div>
    </>
  );
}

export default LostFound;
