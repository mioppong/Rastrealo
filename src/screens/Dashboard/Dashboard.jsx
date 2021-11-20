import { Button, Modal, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AddButton from "../../components/AddUser/AddButton";
import { login, logout } from "../../redux/actions";
import "./DashboardStyle.css";

const Dashboard = (props) => {
  const [state, setstate] = useState(false);

  if (props.user && props.user.token) {
    return (
      <div className="container">
        <Paper elevation={10} className="sideBarContainer">
          <Button
            onClick={() => setstate(true)}
            style={{ width: "50px", height: "50px", backgroundColor: "red" }}
          />
          <Modal
            open={state}
            style={{ width: "50px", height: "50px", backgroundColor: "blue" }}
          >
            <Paper style={{ width: "50px", height: "50px" }} />
          </Modal>
        </Paper>

        <Paper
          elevation={10}
          style={{
            width: "100%",
            height: "100vh",
            marginLeft: "25px",
          }}
        >
          <AddButton />
          <Button children="Create Transaction" />
        </Paper>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => {
    dispatch(login(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
