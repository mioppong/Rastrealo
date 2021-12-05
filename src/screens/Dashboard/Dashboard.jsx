import { Button, List, Paper, Typography } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { Box } from "@mui/system";
import AddUser from "../../components/AddUser/AddUser";
import CreateTransaction from "../../components/CreateTransaction/CreateTransaction";
import { createTransaction, login } from "../../redux/actions";
import "./DashboardStyle.css";
import AllTransactions from "../../components/AllTransactions/AllTransactions";
import AllUsers from "../../components/AllUsers/AllUsers";
import ExportTransactions from "../../components/ExportTransactions/ExportTransactions";
import { myColors } from "../../styles/myColors";

const Dashboard = (props) => {
  const { homeStore } = props;
  // const [modifiedTransactions, setModifiedTransactions] = useState(
  //   homeStore.transactions
  // );
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

  return (
    <div style={containerStyle}>
      <Paper
        style={{
          padding: "1%",
          width: "25vh",
          height: "90vh",
          borderRadius: 20,
        }}
        elevation={5}
      >
        <AddUser />
        <CreateTransaction />
        <ExportTransactions />
      </Paper>

      <Paper style={rightSide} elevation={0}>
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
                <AllTransactions data={homeStore.transactions.reverse()} />
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
  createTransaction: (payload) => {
    dispatch(createTransaction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
