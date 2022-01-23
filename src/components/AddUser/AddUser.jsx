import { Button, Modal, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { createUser } from "../../redux/actions";
import { myColors } from "../../styles/myColors";
import { generateID } from "../../api/index";

const AddUser = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const { homeStore } = props;

  const modalContainerStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  };

  const clearScreen = () => {
    // clear screen and clear modal
    setName("");
    setNumber("");
    setOtherInfo("");
    setModalVisible(false);
    setErrorMessage();
  };

  const checkData = () => {
    const numberExists = homeStore.users.find(
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
  const handleCreateUser = () => {
    if (checkData() === true) {
      props.createUser({ id: generateID(), name, number, otherInfo });
      clearScreen();
    }
  };
  return (
    <>
      <Button
        children="Create User"
        onClick={() => setModalVisible(true)}
        variant="text"
        size="medium"
        style={{
          margin: "10px",
          color: myColors.third,
        }}
      />

      <Modal open={modalVisible}>
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
              Create User
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
                children="done"
                onClick={() => handleCreateUser()}
                style={{ margin: "10px", backgroundColor: myColors.first }}
              />
              <Button
                children="Close"
                variant="contained"
                onClick={clearScreen}
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

const mapStateToProps = (state) => ({
  homeStore: state.homeStore,
});

const mapDispatchToProps = (dispatch) => ({
  createUser: (payload) => {
    dispatch(createUser(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
