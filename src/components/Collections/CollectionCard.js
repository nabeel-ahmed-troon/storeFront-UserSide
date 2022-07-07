import React from "react";
import { styled } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NftCard from "./NftCard";
import Card from "./Card";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "50%",
  maxHeight: "50%",
});

const CollectionCard = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Card />}></Route>
          <Route path="/nftCollection" element={<NftCard />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default CollectionCard;
