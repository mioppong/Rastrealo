import { Button, List, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import AddUser from "../../components/AddUser/AddUser";
import CreateTransaction from "../../components/CreateTransaction/CreateTransaction";
import { createTransaction, login, logout } from "../../redux/actions";
import "./DashboardStyle.css";
import AllTransactions from "../../components/AllTransactions/AllTransactions";
import AllUsers from "../../components/AllUsers/AllUsers";
import ExportTransactions from "../../components/ExportTransactions/ExportTransactions";
import { myColors } from "../../styles/myColors";
import { SentimentVeryDissatisfiedRounded } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { loadToken } from "../../api/localStorage";
import LoadingOverlay from "react-loading-overlay";

const Dashboard = (props) => {
  const { homeStore, logout } = props;
  const navigate = useNavigate();
  const tokenExist = loadToken();

  // const [modifiedTransactions, setModifiedTransactions] = useState(
  //   homeStore.transactions
  // );

  useEffect(() => {
    if (!tokenExist) {
      navigate("/welcome");
    }
  }, [tokenExist, navigate]);

  const rightSide = {
    width: "100%",
    height: "90vh",
    marginLeft: "25px",
    padding: "1%",
    overflow: "hidden",
    borderRadius: "20px",
  };
  const containerStyle = {
    display: "flex",
    padding: "1%",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/welcome");
    logout();
  };

  return (
    <div style={containerStyle}>
      <Paper
        style={{
          padding: "1%",
          width: "25vh",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: 20,
        }}
        elevation={5}
      >
        <AddUser />
        <CreateTransaction />
        <ExportTransactions />
        <div
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            marginTop: "auto",
          }}
        >
          <Button style={{ color: myColors.fifth }} onClick={handleLogout}>
            <SentimentVeryDissatisfiedRounded fontSize="large" />
            <Typography fontWeight="bold">Logout</Typography>
          </Button>
        </div>
      </Paper>

      <Paper style={rightSide} elevation={0}>
        <LoadingOverlay
          active={homeStore.loading}
          spinner
          text="Loading your content..."
          styles={{ display: "flex" }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ margin: "1%" }}>
              <div style={{ display: "flex" }}>
                <Typography variant="h6" color={myColors.first}>
                  All Transactions
                </Typography>
              </div>

              <Paper
                style={{
                  maxHeight: "85vh",
                  width: 350,
                  overflow: "auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <List>
                  <AllTransactions
                    data={
                      homeStore.transactions && homeStore.transactions.reverse()
                    }
                  />
                </List>
              </Paper>
            </div>

            <div style={{ margin: "1%" }}>
              <div style={{ display: "flex" }}>
                <Typography variant="h6" color={myColors.first}>
                  All Users
                </Typography>
              </div>

              <Paper
                style={{
                  maxHeight: "80vh",
                  width: 300,
                  overflow: "auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <List>
                  <AllUsers data={homeStore.users} />
                </List>
              </Paper>
            </div>
          </div>
        </LoadingOverlay>
      </Paper>
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
  logout: () => {
    dispatch(logout());
  },
  createTransaction: (payload) => {
    dispatch(createTransaction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
