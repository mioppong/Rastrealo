import { List, Paper } from "@mui/material";
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

const Dashboard = (props) => {
  const { homeStore } = props;
  // const [modifiedTransactions, setModifiedTransactions] = useState(
  //   homeStore.transactions
  // );
  const rightSide = {
    width: "100%",
    height: "100vh",
    maxHeight: "100vh",
    marginLeft: "25px",
    padding: "1%",
    overflow: "hidden",
    backgroundColor: "#f2eff5",
  };
  const containerStyle = {
    display: "flex",
    padding: "1%",
    overflow: "hidden",
  };

  return (
    <div style={containerStyle}>
      <Box
        className="sideBarContainer"
        style={{ padding: "1%", backgroundColor: "#f2eff5" }}
      >
        <AddUser />
        <CreateTransaction />
        <ExportTransactions />
      </Box>

      <Box style={rightSide}>
        <div style={{ display: "flex" }}>
          <div style={{ margin: "1%" }}>
            <div style={{ display: "flex" }}></div>

            <Paper
              style={{
                maxHeight: "80vh",
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
            <div style={{ display: "flex" }}></div>
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
      </Box>
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
