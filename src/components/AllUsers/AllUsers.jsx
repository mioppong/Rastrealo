import { Delete, EditRounded } from "@mui/icons-material";
import {
  Button,
  Card,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { connect } from "react-redux";
import { deleteUser, updateUser } from "../../redux/actions";
import { myColors } from "../../styles/myColors";

const EachUser = (props) => {
  const { user, deleteUser } = props;
  const [dialog, setDialog] = useState(false);
  const handleClose = () => {
    setDialog(false);
  };

  const handleClickOpen = () => {
    setDialog(true);
  };

  return (
    <>
      <Card
        style={{
          margin: 10,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f3e7fe",
          padding: "1%",
          width: 250,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography style={{ fontWeight: "bold" }}>{user.name}</Typography>
          <Button style={{ display: "flex" }}>
            <EditRounded fontSize="medium" />
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button style={{ color: "red" }} onClick={handleClickOpen}>
            <Delete fontSize="small" />
          </Button>
          <Typography style={{ fontWeight: "bold", alignSelf: "center" }}>
            {`(${user.number})`}
          </Typography>
        </div>
      </Card>
      <Dialog open={dialog} keepMounted onClose={handleClose}>
        <DialogTitle>{"Delete this user"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user, after deleting, it can
            not be recovered
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="large"
            variant="contained"
            children="No"
            onClick={handleClose}
            style={{ margin: "10px", backgroundColor: myColors.first }}
          />
          <Button
            children="Delete"
            variant="contained"
            onClick={() => {
              deleteUser(user);
              setDialog(false);
            }}
            size="small"
            style={{
              margin: "10px",
              backgroundColor: "red",
            }}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

const AllUsers = ({ data, homeStore, deleteUser, updateUser }) => {
  return (
    <LoadingOverlay
      active={homeStore.loading}
      spinner
      fadeSpeed={2000}
      text="Loading your content..."
      styles={{ display: "flex" }}
    >
      <Typography variant="h6" color={myColors.first}>
        All Users
      </Typography>
      {data.map((item, index) => {
        return (
          <EachUser
            deleteUser={deleteUser}
            updateUser={updateUser}
            user={item}
            key={index}
          />
        );
      })}
    </LoadingOverlay>
  );
};

const mapStateToProps = (state) => ({
  homeStore: state.homeStore,
});
const mapDispatchToProps = (dispatch) => ({
  deleteUser: (payload) => {
    dispatch(deleteUser(payload));
  },
  updateUser: (payload) => {
    dispatch(updateUser(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
