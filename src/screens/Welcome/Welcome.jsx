import { Button, TextField } from "@mui/material";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { loadToken } from "../../api/localStorage";
import { login } from "../../redux/actions";
import "./WelcomeStyle.css";
import config from "../../internet/config";
import axios from "axios";

const Welcome = (props) => {
  const { homeStore } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const tokenExist = loadToken();

  useEffect(() => {
    if (tokenExist && homeStore.token) {
      navigate("/dashboard");
    } else {
      navigate("/welcome");
    }
  }, [tokenExist, homeStore, navigate]);

  const loginButtonStyle = {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: "#516a94",
    color: "white",
    margin: 2,
    borderColor: "white",
    borderWidth: 1,
  };
  const handleLogin = async () => {
    // await props.login({ email, password });
    const response = await axios
      .post(config.backendURL, { email, password })
      .catch((errorr) => console.log(errorr));

    props.login(response.data);
  };

  return (
    <div className="container">
      <div className="loginContainer">
        <div className="inputStyles">
          <TextField
            label="Username"
            value={email}
            onChange={(value) => setEmail(value.target.value)}
          />
        </div>
        <div className="inputStyles">
          <TextField
            value={password}
            type="password"
            label="password"
            onChange={(value) => setPassword(value.target.value)}
          />
        </div>

        <div style={{ flexDirection: "row" }}>
          <Button
            children="login"
            onClick={handleLogin}
            style={loginButtonStyle}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  homeStore: state.homeStore,
});
const mapDispatchToProps = (dispatch) => ({
  login: (payload) => {
    dispatch(login(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
