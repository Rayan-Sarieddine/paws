import React, { useEffect } from "react";
import HeaderImg from "../../components/common/HeaderImg";
import Nav from "../../components/common/Nav";
import AdoptPet from "../../components/page components/Adopt/AdoptPet";
import Animals from "../../components/page components/Adopt/Animals";
import Faq from "../../components/page components/Adopt/Faq";
import Footer from "../../components/common/Footer";
import { useDispatch } from "react-redux";
import { petsDataSource } from "../../../core/dataSource/remoteDataSource/pets";
import { loadPets } from "../../../core/dataSource/localDataSource/pet";
import { useNavigate } from "react-router-dom";
function Adopt() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Function to load all pets from backend
  const loadpets = async () => {
    try {
      const response = await petsDataSource.getPets();

      dispatch(loadPets(response.pets));
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    loadpets();
  }, []);

  return (
    <div>
      <Nav />
      <HeaderImg img_link="adopt-hero.png" />
      <AdoptPet />
      <Animals />
      <Faq />
      <Footer />
    </div>
  );
}

export default Adopt;
