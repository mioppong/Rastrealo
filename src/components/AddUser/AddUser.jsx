import { Button, Modal, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { createUser } from "../../redux/actions";

const AddUser = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [otherInfo, setOtherInfo] = useState("");

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
    closeModal();
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <>
      <Button children="Create User" onClick={() => setModalVisible(true)} />

      <Modal open={modalVisible}>
        <div style={modalContainerStyle}>
          <Paper
            style={{
              height: "50vh",
              width: "50vh",
              marginTop: "15vh",
              display: "flex",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            <TextField
              value={name}
              style={{ marginTop: "10px" }}
              onChange={(value) => setName(value.target.value)}
            />
            <TextField
              value={number}
              type="number"
              style={{ marginTop: "10px" }}
              onChange={(value) => setNumber(value.target.value)}
            />
            <TextField
              value={otherInfo}
              style={{ marginTop: "10px" }}
              onChange={(value) => setOtherInfo(value.target.value)}
            />

            <Button
              children="done"
              onClick={() => {
                props.createUser({ name, number, otherInfo });
                clearScreen();
              }}
            />
            <Button children="Close" onClick={closeModal} />
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