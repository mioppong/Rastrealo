import { Button, Modal, Paper } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import AddUser from "../../components/AddUser/AddUser";
import CreateTransaction from "../../components/CreateTransaction/CreateTransaction";
import { login, logout } from "../../redux/actions";
import "./DashboardStyle.css";
import { CSVLink } from "react-csv";
import AllTransactions from "../../components/AllTransactions/AllTransactions";

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

  const [filterActive, setFilterActive] = useState(false);

  if (homeStore && homeStore.token) {
    return (
      <div className="container">
        <Paper elevation={10} className="sideBarContainer"></Paper>

        <Paper
          elevation={10}
          style={{
            width: "100%",
            height: "100vh",
            marginLeft: "25px",
          }}
        >
          <CSVLink filename="mike.csv" data={csvData}>
            Export to CSV
          </CSVLink>

          <AddUser />
          <CreateTransaction />
          <Button children="Log Out" onClick={logout} />
          <Button
            children="Check redux"
            onClick={() => console.log(homeStore)}
          />
          <AllTransactions
            data={filterActive ? modifiedTransactions : homeStore.transactions}
          />

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
