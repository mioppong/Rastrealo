import { Button, Modal, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";

const AddButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [otherInfo, setOtherInfo] = useState("");

  const modalContainerStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
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
              style={{ marginTop: "10px" }}
              onChange={(value) => setNumber(value.target.value)}
            />
            <TextField
              value={otherInfo}
              style={{ marginTop: "10px" }}
              onChange={(value) => setOtherInfo(value.target.value)}
            />

            <Button children="Close" onClick={() => setModalVisible(false)} />
            <Button
              children="done"
              onClick={() =>
                console.log("done function", { name, number, otherInfo })
              }
            />
          </Paper>
        </div>
      </Modal>
    </>
  );
};

export default AddButton;
