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
  Modal,
  TextField,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { connect } from "react-redux";
import { deleteUser, updateUser } from "../../redux/actions";
import { myColors } from "../../styles/myColors";

const EachUser = (props) => {
  const { user, deleteUser, homeStore } = props;
  const [dialog, setDialog] = useState(false);
  const [name, setName] = useState(user.name);
  const [number, setNumber] = useState(user.number);
  const [otherInfo, setOtherInfo] = useState(user.otherInfo);
  const [errorMessage, setErrorMessage] = useState();
  const [editModalVisivible, setEditModalVisivible] = useState(false);

  const handleClose = () => {
    setDialog(false);
  };

  const handleClickOpen = () => {
    setDialog(true);
  };

  const clearScreen = () => {
    setEditModalVisivible(false);
    setErrorMessage();
  };
  const modalContainerStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  };

  const checkData = () => {
    const arrayWithoutElement = homeStore.users.filter(
      (item) => !item.id === user.id
    );
    const numberExists = arrayWithoutElement.find(
      (item) => `${item.number}` === `${number}`
    );
    if (numberExists) {
      setErrorMessage("Phone number exists");
      return false;
    } else if (!number) {
      setErrorMessage("Phone number can not be empty");
      return false;
    }

    return true;
  };
  const handleEditUser = () => {
    if (checkData() === true) {
      props.updateUser({ id: user.id, name, number, otherInfo });
      clearScreen();
    }
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
          <Button
            style={{ display: "flex" }}
            onClick={() => setEditModalVisivible(true)}
          >
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

      <Modal open={editModalVisivible}>
        <div style={modalContainerStyle}>
          <Paper
            style={{
              height: "350px",
              width: "500px",
              marginTop: "15vh",
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              overflow: "auto",
            }}
          >
            <Typography variant="h6" color={myColors.first}>
              Update user
            </Typography>
            <TextField
              label="Name"
              type="text"
              value={name}
              style={{ margin: "10px" }}
              onChange={(value) => setName(value.target.value)}
            />
            <TextField
              label="Phone Number (ex. 14167384674)"
              value={number}
              type="number"
              style={{ margin: "10px" }}
              onChange={(value) => setNumber(value.target.value)}
            />
            <TextField
              label="Any useful info on the person"
              value={otherInfo}
              style={{ margin: "10px" }}
              onChange={(value) => setOtherInfo(value.target.value)}
            />
            {errorMessage && (
              <Typography
                style={{
                  color: "red",
                  fontWeight: "bold",
                  alignSelf: "center",
                  fontSize: 20,
                }}
                children={errorMessage}
              />
            )}
            <div style={{ marginTop: "auto", alignSelf: "center" }}>
              <Button
                size="large"
                variant="contained"
                children="Update"
                onClick={() => handleEditUser()}
                style={{ margin: "10px", backgroundColor: myColors.first }}
              />
              <Button
                children="cancel"
                variant="contained"
                onClick={() => setEditModalVisivible(false)}
                style={{
                  margin: "10px",
                  backgroundColor: "red",
                }}
              />
            </div>
          </Paper>
        </div>
      </Modal>
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
            homeStore={homeStore}
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
