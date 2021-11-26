import {
  Autocomplete,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
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
  const [amount, setAmount] = useState();
  const [currency, setCurrency] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [receivingAmount, setreceivingAmount] = useState();
  const [receivingCurrency, setreceivingCurrency] = useState();

  console.log(!sender);
  const { homeStore } = props;

  const clearScreen = () => {
    // clear screen and clear modal
    setSender();
    setRecipient();
    setCurrency();
    setAmount();
    setreceivingCurrency();
    setreceivingAmount();
    setErrorMessage();
    setModalVisible(false);
  };

  const checkDataEmpty = () => {
    if (!sender) {
      setErrorMessage("Sender can not be empty");
      return true;
    } else if (!recipient) {
      setErrorMessage("recipient can not be empty");
      return true;
    } else if (!amount) {
      setErrorMessage("amount can not be empty");
      return true;
    } else if (!recipient) {
      setErrorMessage("recipient can not be empty");
      return true;
    } else if (!receivingAmount) {
      setErrorMessage("Receiving amount can not be empty");
      return true;
    } else if (!currency) {
      setErrorMessage("currency can not be empty");
      return true;
    } else if (!receivingCurrency) {
      setErrorMessage("Receiving currency can not be empty");
      return true;
    }
  };

  const modalContainerStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  };

  const handleDone = () => {
    if (checkDataEmpty() === true) {
      // some data is empty
    } else {
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
      clearScreen();
    }
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
              height: "80vh",
              width: "70vh",
              marginTop: "2vh",
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

            {errorMessage && (
              <Typography
                style={{ color: "red", fontWeight: "bold" }}
                children={errorMessage}
              />
            )}
            <Button children="done" onClick={handleDone} />
            <Button children="Close" onClick={() => clearScreen()} />
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
