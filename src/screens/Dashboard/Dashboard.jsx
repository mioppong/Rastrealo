import { Button, List, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import AddUser from "../../components/AddUser/AddUser";
import CreateTransaction from "../../components/CreateTransaction/CreateTransaction";
import { createTransaction, login, logout } from "../../redux/actions";
import "./DashboardStyle.css";
import ExportTransactions from "../../components/ExportTransactions/ExportTransactions";
import { myColors } from "../../styles/myColors";
import { SentimentVeryDissatisfiedRounded } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { loadToken } from "../../api/localStorage";
import MyTable from "../../components/TransactionsTable/Table";
import "./DashboardStyle.css";
import UsersTable from "../../components/AddUserTable/UsersTable";
import StickyBox from "react-sticky-box";
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
    width: "90vw",
    padding: "4%",
    // backgroundColor: "#F6F7F9",
    backgroundColor: "green",
  };
  const tableHeader = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/welcome");
    logout();
  };

  return (
    <div className="container">
      {/* <Paper className="sideBarContainer">
        <Button style={{ color: myColors.fifth }} onClick={handleLogout}>
          <SentimentVeryDissatisfiedRounded fontSize="large" />
          <Typography fontWeight="bold">Settings</Typography>
        </Button>
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
      </Paper> */}
      <div
        style={{ height: "100vh", overflow: "auto", backgroundColor: "brown" }}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <StickyBox
            style={{ width: "10vw", backgroundColor: "green", height: "100vh" }}
          >
            Sidebar
          </StickyBox>
          <div style={{ width: "90vw", border: "3px solid blue" }}>
            Main Content
            <Paper style={{ width: "100%", marginBottom: 10 }}>
              <div style={tableHeader}>
                <Typography
                  style={{ fontSize: 20, fontWeight: "bold", color: "gray" }}
                  children="Transaction Overview"
                />

                <div style={{ display: "flex" }}>
                  <ExportTransactions />
                  <CreateTransaction />
                </div>
              </div>
              <MyTable />
            </Paper>
            <Paper style={{ width: "100%", marginBottom: 10 }}>
              <div style={tableHeader}>
                <Typography
                  style={{ fontSize: 20, fontWeight: "bold", color: "gray" }}
                  children="Transaction Overview"
                />

                <div style={{ display: "flex" }}>
                  <ExportTransactions />
                  <CreateTransaction />
                </div>
              </div>
              <MyTable />
            </Paper>
            <Paper style={{ width: "100%", marginBottom: 10 }}>
              <div style={tableHeader}>
                <Typography
                  style={{ fontSize: 20, fontWeight: "bold", color: "gray" }}
                  children="Transaction Overview"
                />

                <div style={{ display: "flex" }}>
                  <ExportTransactions />
                  <CreateTransaction />
                </div>
              </div>
              <MyTable />
            </Paper>
          </div>
        </div>
      </div>

      {/* <div style={rightSide}>
        <Typography
          variant="h4"
          children="Dashboard"
          style={{ marginBottom: 20, marginTop: 20, color: "#404040" }}
        />
        <div style={{}}>
          <Paper style={{ width: "100%", marginBottom: 10 }}>
            <div style={tableHeader}>
              <Typography
                style={{ fontSize: 20, fontWeight: "bold", color: "gray" }}
                children="Transaction Overview"
              />

              <div style={{ display: "flex" }}>
                <ExportTransactions />
                <CreateTransaction />
              </div>
            </div>
            <MyTable />
          </Paper>

          <Paper style={{ width: "50%", marginBottom: 10 }}>
            <div style={tableHeader}>
              <Typography
                style={{ fontSize: 20, fontWeight: "bold", color: "gray" }}
                children="Users"
              />

              <div style={{ display: "flex" }}>
                <AddUser />
              </div>
            </div>

            <UsersTable />
          </Paper>
        </div>
      </div> */}
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
