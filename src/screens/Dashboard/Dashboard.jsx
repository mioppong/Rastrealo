import { Button, List, Paper } from "@mui/material";
import React from "react";
import { connect } from "react-redux";

import AddUser from "../../components/AddUser/AddUser";
import CreateTransaction from "../../components/CreateTransaction/CreateTransaction";
import { createTransaction, login } from "../../redux/actions";
import "./DashboardStyle.css";
import AllTransactions from "../../components/AllTransactions/AllTransactions";
import { myColors } from "../../styles/myColors";
import AllUsers from "../../components/AllUsers/AllUsers";

// const csvData = [
//   ["from", "to", "CAN", "USD", "GNC"],
//   ["PRISCILLA OSEI", "HAMS OSEI 593814347", "150", "", "150"],
//   ["PRISCILLA OSEI", "HAMS OSEI 593814347", "150", "", "150"],
//   ["PRISCILLA OSEI", "HAMS OSEI 593814347", "150", "", "150"],
//   ["PRISCILLA OSEI", "HAMS OSEI 593814347", "150", "", "150"],
//   ["PRISCILLA OSEI", "HAMS OSEI 593814347", "150", "", "150"],
//   ["PRISCILLA OSEI", "HAMS OSEI 593814347", "150", "", "150"],
//   ["PRISCILLA OSEI", "HAMS OSEI 593814347", "150", "", "150"],
// ];

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
    backgroundColor: "#f3e7fe",
  };
  const containerStyle = {
    display: "flex",
    padding: "1%",
    overflow: "hidden",
  };

  return (
    <div style={containerStyle}>
      <Paper
        className="sideBarContainer"
        style={{ padding: "1%", backgroundColor: "#f3e7fe" }}
      >
        <AddUser />
        <CreateTransaction />
      </Paper>

      <Paper style={rightSide}>
        <div style={{ display: "flex" }}>
          <div style={{ margin: "1%" }}>
            <div style={{ display: "flex" }}>
              <Button
                children="Sort"
                onClick={() => console.log(homeStore.transactions)}
                variant="contained"
                size="large"
                style={{
                  backgroundColor: myColors.first,
                  marginBottom: "10px",
                }}
              />
              <Button
                children="Export"
                onClick={() => console.log(homeStore.transactions)}
                variant="contained"
                size="large"
                style={{
                  marginLeft: "10px",
                  marginBottom: "10px",
                  backgroundColor: myColors.fifth,
                }}
              />
            </div>

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
            <div style={{ display: "flex" }}>
              <Button
                children="Export"
                onClick={() => console.log(homeStore.transactions)}
                variant="contained"
                size="large"
                style={{
                  backgroundColor: myColors.fifth,
                  marginBottom: "10px",
                }}
              />
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

/* <CSVLink filename="mike.csv" data={csvData}>
Export to CSV
</CSVLink> */
