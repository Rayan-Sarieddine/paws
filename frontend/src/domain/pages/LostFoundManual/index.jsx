import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { postsDataSource } from "../../../core/dataSource/remoteDataSource/posts";
import Nav from "../../components/common/Nav";
import HeaderImg from "../../components/common/HeaderImg";
import Footer from "../../components/common/Footer";
import { loadPosts } from "../../../core/dataSource/localDataSource/post";
import AllPosts from "../../components/page components/LostFoundManual/AllPosts";

function LostFoundManual() {
  const dispatch = useDispatch();

  const loadposts = async () => {
    try {
      const response = await postsDataSource.getPosts();
      console.log("new posts", response);
      dispatch(loadPosts(response.posts));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadposts();
  }, []);
  return (
    <div>
      <Nav />
      <HeaderImg img_link="found-hero.png" />
      <AllPosts />
      <Footer />
    </div>
  );
}

export default LostFoundManual;
