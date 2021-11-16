import { Button, TextField } from "@mui/material";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { login } from "../../redux/actions";
import "./WelcomeStyle.css";

const Welcome = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (props.user.token) {
      console.log("the token is", props.user.token);
    }
  }, [props.user]);

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
            onClick={() => props.login({ email, password })}
            style={loginButtonStyle}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => {
    dispatch(login(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
