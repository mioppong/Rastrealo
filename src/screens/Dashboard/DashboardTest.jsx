import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Paper } from "@mui/material";
import ExportTransactions from "../../components/ExportTransactions/ExportTransactions";
import CreateTransaction from "../../components/CreateTransaction/CreateTransaction";
import MyTable from "../../components/TransactionsTable/Table";
import { styled as styledComp } from "styled-components";
import AddUser from "../../components/AddUser/AddUser";
import UsersTable from "../../components/AddUserTable/UsersTable";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions";
import { useNavigate } from "react-router";
import { loadToken } from "../../api/localStorage";
import { useEffect } from "react";
import {
  DashboardRounded,
  ExitToAppRounded,
  InsertEmoticonSharp,
} from "@material-ui/icons";

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenExist = loadToken();
  const homeStore = useSelector((state) => state.homeStore);

  useEffect(() => {
    console.log("dfdf", homeStore.users);

    if (!tokenExist) {
      navigate("/welcome");
    }
  }, [tokenExist, navigate]);

  const tableHeader = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/welcome");
  };
  return (
    <Box sx={{ display: "flex", overflow: "auto" }}>
      <Drawer variant="permanent" open={true}>
        <DrawerHeader></DrawerHeader>

        <Divider />
        <Divider />

        <List>
          <ListItem button onClick={() => navigate("/dashboard")}>
            <ListItemIcon>
              <DashboardRounded />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
        </List>

        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppRounded />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </Drawer>

      <Box component="main" overflow={"auto"} sx={{ padding: 2 }}>
        <Typography color={"#333333"} variant="h4">
          DashBoard
        </Typography>
        <List>
          <div style={{ display: "flex", flex: 1 }}>
            <Paper style={{ width: 1000, margin: 10 }}>
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

            <div>
              <Paper style={{ width: 500, margin: 10 }}>
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
        </List>
      </Box>
    </Box>
  );
}

{
  /* <DrawerHeader>
<IconButton onClick={() => setOpen(!open)}>
  {theme.direction === "rtl" ? (
    <ChevronRightIcon />
  ) : (
    <ChevronLeftIcon />
  )}
</IconButton>
</DrawerHeader> */
}
