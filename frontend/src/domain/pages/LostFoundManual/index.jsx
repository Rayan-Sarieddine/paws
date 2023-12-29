import React, { useEffect } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { postsDataSource } from "../../../core/dataSource/remoteDataSource/posts";
import Nav from "../../components/common/Nav";
import HeaderImg from "../../components/common/HeaderImg";
import Footer from "../../components/common/Footer";
function LostFoundManual() {
  const dispatch = useDispatch();

  const loadpets = async () => {
    try {
      const response = await postsDataSource.getPosts();
      console.log(response);
      dispatch(loadPets(response.pets));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadpets();
  }, []);
  return (
    <div>
      <Nav />
      <HeaderImg img_link="found-hero.png" />

      <Footer />
    </div>
  );
}

export default LostFoundManual;
