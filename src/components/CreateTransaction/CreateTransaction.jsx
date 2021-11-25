import { Autocomplete, Button, Modal, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { contains, generateID } from "../../api";
import { createTransaction } from "../../redux/actions";

// const SearchItem = ({ users }) => {
//   const { name, number, otherInfo } = users;
//   return (
//     <>
//       <div>{name}</div>
//       <div>{number}</div>
//     </>
//   );
// };

const CreateTransaction = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [sender, setSender] = useState();
  const [recipient, setRecipient] = useState();
  const { homeStore } = props;
  const [amount, setAmount] = useState("");
  const [receivingAmount, setreceivingAmount] = useState("");
  const [currency, setCurrency] = useState();
  const [receivingCurrency, setreceivingCurrency] = useState();

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
      currency,
      amount,
      receivingCurrency,
      receivingAmount,
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
            <div>from </div>
            <Autocomplete
              onChange={(event, value) => setSender(value)}
              getOptionLabel={(item) => item.name}
              options={homeStore.users}
              filterOptions={(arrayOfUsers, typed) => {
                var filtered = arrayOfUsers.filter(function (value) {
                  return contains(value, typed.inputValue);
                });
                return filtered;
              }}
              renderInput={(params) => <TextField {...params} label="Sender" />}
            />
            <div>to </div>
            <Autocomplete
              onChange={(event, value) => setRecipient(value)}
              getOptionLabel={(item) => item.name}
              options={homeStore.users}
              filterOptions={(arrayOfUsers, typed) => {
                var filtered = arrayOfUsers.filter(function (value) {
                  return contains(value, typed.inputValue);
                });
                return filtered;
              }}
              renderInput={(params) => (
                <TextField {...params} label="Recipient" />
              )}
            />

            <div>currency </div>
            <Autocomplete
              onChange={(event, value) => setCurrency(value)}
              getOptionLabel={(item) => item}
              options={homeStore.currencies}
              filterOptions={(array, typed) => {
                var filtered = array.filter(function (value) {
                  return value
                    .toLowerCase()
                    .includes(typed.inputValue.toLowerCase());
                });
                return filtered;
              }}
              renderInput={(params) => (
                <TextField {...params} label="Currency" />
              )}
            />

            <div>Sending amount </div>
            <TextField
              label="Sending amount"
              value={amount}
              type="number"
              style={{ marginTop: "10px" }}
              onChange={(value) => setAmount(value.target.value)}
            />

            <div>Receiving Currency </div>
            <Autocomplete
              onChange={(event, value) => setreceivingCurrency(value)}
              getOptionLabel={(item) => item}
              options={homeStore.currencies}
              filterOptions={(array, typed) => {
                var filtered = array.filter(function (value) {
                  return value
                    .toLowerCase()
                    .includes(typed.inputValue.toLowerCase());
                });
                return filtered;
              }}
              renderInput={(params) => (
                <TextField {...params} label="Receiving Currency" />
              )}
            />

            <div>Receiving amount</div>
            <TextField
              label="Receiving amount"
              value={receivingAmount}
              type="number"
              style={{ marginTop: "10px" }}
              onChange={(value) => setreceivingAmount(value.target.value)}
            />

            <Button children="done" onClick={handleDone} />
            <Button
              children="Close"
              onClick={() => console.log(homeStore.currencies[0])}
            />
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
