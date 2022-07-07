import React from "react";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
//below near api js function call for testing purpose
import { InsertMetadata, NftMintCall } from "../../NearProvider/utils";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const NftCard = () => {
  //========================
  const handlePurchase = async () => {
    await NftMintCall();
  };
  //========================
  return (
    <div>
      <Grid container spacing={8} my={2} mx={2}>
        <Grid item xs={3}>
          <Paper elevation={3}>
            <Box
              sx={{
                width: 300,
                height: 300,
                backgroundColor: "primary.dark",
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              <Link to="/nftCollection">
                <ButtonBase sx={{ marginTop: 2, marginBottom: 2 }}>
                  <img
                    src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg"
                    alt="image"
                    width={"250px"}
                    height={"270"}
                  />
                </ButtonBase>
              </Link>
            </Box>
            <Box sx={{ alignContent: "right" }}>
              <Typography align="left">Price:</Typography>
            </Box>
            <Box sx={{ marginTop: 2, display: "flex" }}>
              <img
                src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
                alt="image"
                width={"50px"}
                height={"50"}
              />
              <Button
                align="right"
                sx={{ justifyContent: "right" }}
                onClick={handlePurchase}
              >
                Purchase
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default NftCard;
