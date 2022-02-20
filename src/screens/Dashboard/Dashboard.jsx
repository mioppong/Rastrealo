import { Button, Paper } from "@mui/material";

import { TextField } from "@mui/material";

import {
  AppBar,
  Toolbar,
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  CssBaseline,
  Drawer,
  Typography,
} from "@material-ui/core";
import {
  Apps,
  Menu,
  ContactMail,
  AssignmentInd,
  Home,
  MailOutlineOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
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
  const [sidebar, setSidebar] = useState(false);
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

  const container = {
    height: "100vh",
    overflow: "auto",
    backgroundColor: "#f2f2f2",
  };
  const insideContainer = {
    display: "flex",
    alignItems: "flex-start",
  };

  const leftSide = {
    width: "12vw",

    height: "100vh",
  };
  const rightSide = {
    width: "88vw",
    padding: "2%",
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

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const MySideBar = ({ open }) => (
    <Drawer variant="permanent" open={open}>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? (
                <MailOutlineOutlined />
              ) : (
                <MailOutlineOutlined />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <>
      <div style={container}>
        <div style={insideContainer}>
          <StickyBox style={leftSide}>
            {/* <div
              style={{
                height: 120,
                width: "100%",
                backgroundColor: "red",
                borderBottomColor: "blue",
                borderBottomWidth: 1,
              }}
            >
              LOGO HERE
            </div> */}
          </StickyBox>
          <MySideBar open={sidebar} />

          <div style={rightSide}>
            <Button onClick={toggleSidebar}>Hello</Button>
            <Typography
              variant="h4"
              children="Dashboard"
              style={{
                marginBottom: 20,
                marginTop: 20,
                color: "#404040",
                fontWeight: "bold",
              }}
            />
            <Paper style={{ width: "100%", marginBottom: 10 }}>
              <div style={tableHeader}>
                <Typography
                  style={{ fontSize: 20, color: "#404040" }}
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
        </div>
      </div>

      {/* <div style={rightSide}>
      
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
    </>
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
