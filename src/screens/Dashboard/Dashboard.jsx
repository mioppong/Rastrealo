import { Button, Modal, Paper } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import AddUser from "../../components/AddUser/AddUser";
import CreateTransaction from "../../components/CreateTransaction/CreateTransaction";
import { login, logout } from "../../redux/actions";
import "./DashboardStyle.css";

const Dashboard = (props) => {
  const { homeStore } = props;
  const [state, setstate] = useState(false);

  if (homeStore && homeStore.token) {
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
          <AddUser />
          <CreateTransaction />
          <Button children="Log Out" onClick={logout} />
          <Button
            children="Check redux"
            onClick={() => console.log(homeStore)}
          />
          <div style={{ display: "flex" }}>
            {homeStore.transactions.map((item, index) => {
              return (
                <div style={{ margin: 10 }} key={index}>
                  <div>{item.from.name}</div>
                  <div>{item.amount}</div>
                  <div>{item.to.name}</div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex" }}>
            {homeStore.users.map((item, index) => {
              return (
                <div style={{ margin: 10 }} key={index}>
                  <div>{item.name}</div>
                  <div>{item.number}</div>
                </div>
              );
            })}
          </div>
        </Paper>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  homeStore: state.homeStore,
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => {
    dispatch(login(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
