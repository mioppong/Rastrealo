import { Button, List, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import AddUser from "../../components/AddUser/AddUser";
import CreateTransaction from "../../components/CreateTransaction/CreateTransaction";
import { createTransaction, login } from "../../redux/actions";
import "./DashboardStyle.css";
import AllTransactions from "../../components/AllTransactions/AllTransactions";
import { myColors } from "../../styles/myColors";

const csvData = [
  ["from", "to", "CAN", "USD", "GNC"],
  ["PRISCILLA OSEI", "HAMS OSEI 593814347", "150", "", "150"],
  ["PRISCILLA OSEI", "HAMS OSEI 593814347", "150", "", "150"],
  ["PRISCILLA OSEI", "HAMS OSEI 593814347", "150", "", "150"],
  ["PRISCILLA OSEI", "HAMS OSEI 593814347", "150", "", "150"],
  ["PRISCILLA OSEI", "HAMS OSEI 593814347", "150", "", "150"],
  ["PRISCILLA OSEI", "HAMS OSEI 593814347", "150", "", "150"],
  ["PRISCILLA OSEI", "HAMS OSEI 593814347", "150", "", "150"],
];

const Dashboard = (props) => {
  const { homeStore } = props;
  const [modifiedTransactions, setModifiedTransactions] = useState(
    homeStore.transactions
  );
  const rightSide = {
    width: "100%",
    height: "100vh",
    maxHeight: "100vh",
    marginLeft: "25px",
    padding: "1%",
    overflow: "hidden",
  };
  const containerStyle = {
    display: "flex",
    padding: "1%",
    overflow: "hidden",
  };

  const sectionTitleStyles = {
    fontSize: 20,
    fontWeight: "bold",
    color: myColors.first,
  };
  return (
    <div style={containerStyle}>
      <Paper
        elevation={10}
        className="sideBarContainer"
        style={{ padding: "1%" }}
      />

      <Paper elevation={10} style={rightSide}>
        <AddUser />
        <CreateTransaction />
        {/* <Button
          children="Check redux"
          onClick={() => console.log(homeStore.transactions)}
        /> */}

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

{
  /* <CSVLink filename="mike.csv" data={csvData}>
Export to CSV
</CSVLink> */
}
