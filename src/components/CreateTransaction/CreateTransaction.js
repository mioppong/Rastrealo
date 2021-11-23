import { Autocomplete, Button, Modal, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { contains, generateID } from "../../api";
import { createTransaction } from "../../redux/actions";

const SearchItem = ({ users }) => {
  const { name, number, otherInfo } = users;
  return (
    <>
      <div>{name}</div>
      <div>{number}</div>
    </>
  );
};

const CreateTransaction = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [sender, setSender] = useState();
  const [typedSender, setTypedSender] = useState();
  const [typedRecipient, setTypedRecipient] = useState();
  const [recipient, setRecipient] = useState();
  const { homeStore } = props;
  const [amount, setAmount] = useState();
  const [currency, setCurrency] = useState();

  const clearScreen = (props) => {
    // clear screen and clear modal
    setAmount();
    setSender();
    setCurrency();
    setRecipient();
    closeModal();
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const modalContainerStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  };

  const handleDone = () => {
    const newTransaction = {
      id: generateID(),
      from: sender,
      to: recipient,
      amount,
      date: Date.now(),
    };
    props.createTransaction(newTransaction);
    setModalVisible(false);
  };

  return (
    <>
      <Button
        children="Create Transaction"
        onClick={() => setModalVisible(true)}
      />
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
            <Autocomplete
              onChange={(event, value) => setSender(value)}
              getOptionLabel={(item) => item.id}
              options={homeStore.users}
              filterOptions={(arrayOfUsers, typed) => {
                var filtered = arrayOfUsers.filter(function (value) {
                  return contains(value, typed.inputValue);
                });
                return filtered;
              }}
              renderInput={(params) => <TextField {...params} label="Sender" />}
            />
            <Autocomplete
              onChange={(event, value) => setRecipient(value)}
              getOptionLabel={(item) => item.name}
              options={homeStore.users}
              filterOptions={(array, typed) => {
                var filtered = array.filter(function (value) {
                  return contains(value, typed.inputValue);
                });
                return filtered;
              }}
              renderInput={(params) => <TextField {...params} label="Sender" />}
            />

            <TextField
              value={amount}
              inputMode="numeric"
              style={{ marginTop: "10px" }}
              onChange={(value) => setAmount(value.target.value)}
            />

            <Button children="done" onClick={handleDone} />
            <Button children="Close" onClick={clearScreen} />
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
  createTransaction: (payload) => {
    dispatch(createTransaction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransaction);
