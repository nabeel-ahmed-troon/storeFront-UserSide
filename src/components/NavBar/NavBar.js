import React, { useState, useEffect } from "react";
import { AppBar, Button, Tab, Tabs, Toolbar } from "@mui/material";
// import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";

import { logIn, logout } from "../../NearProvider/utils";

import CollectionCard from "../Collections/CollectionCard";

const NavBar = () => {
  const [value, setValue] = useState(0);
  const [login, setLogin] = useState("Login");
  const [accountId, setAccountId] = useState(" ");
  const [connected, setConnected] = useState("Not Connected");
  useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      let id = window.walletConnection.getAccountId();
      setAccountId(id);
      let res = accountId;
      setConnected(res);
    }
  }, []);
  useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      setLogin("Logout");
    }
  }, []);

  const handleLogin = () => {
    if (window.walletConnection.isSignedIn()) {
      logout();
      setLogin("Connect Wallet");
    } else {
      logIn();
      setLogin("Logout");
      let res = accountId;
      setConnected(res);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }} position="sticky">
        <Toolbar>
          <StoreMallDirectoryIcon sx={{ transform: "scale(2)" }} />

          <Tabs
            sx={{ marginLeft: "auto" }}
            indicatorColor="secondary"
            textColor="inherit"
            value={value}
            onChange={handleChange}
          >
            <Tab label="Collections" />
            <Tab label="Owned NFTs" />
          </Tabs>

          <Button
            sx={{ marginLeft: "auto" }}
            variant="contained"
            onClick={handleLogin}
          >
            {login}
          </Button>
        </Toolbar>
      </AppBar>
      {value === 0 && <CollectionCard />}
    </React.Fragment>
  );
};

export default NavBar;
