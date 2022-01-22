import {
  Autocomplete,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { connect } from "react-redux";
import { contains, generateID } from "../../api";
import { createTransaction } from "../../redux/actions";
import { myColors } from "../../styles/myColors";

const CreateTransaction = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [sender, setSender] = useState();
  const [recipient, setRecipient] = useState();
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [receivingAmount, setreceivingAmount] = useState(0);
  const [receivingCurrency, setreceivingCurrency] = useState();
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
        variant="text"
        size="medium"
        style={{
          margin: "10px",
        }}
      />
      <Modal open={modalVisible}>
        <div style={modalContainerStyle}>
          <Paper
            style={{
              height: "550px",
              width: "500px",
              marginTop: "10vh",
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              overflow: "auto",
            }}
          >
            <Typography variant="h6" color={myColors.first}>
              Create Transaction
            </Typography>
            <Autocomplete
              onChange={(event, value) => setSender(value)}
              getOptionLabel={(item) => `${item.name} (${item.number}) `}
              options={homeStore.users}
              filterOptions={(arrayOfUsers, typed) => {
                var filtered = arrayOfUsers.filter(function (value) {
                  return contains(value, typed.inputValue);
                });
                return filtered;
              }}
              renderInput={(params) => <TextField {...params} label="Sender" />}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {option.name} ({option.number})
                </Box>
              )}
              style={{ margin: 10 }}
            />

            <Autocomplete
              onChange={(event, value) => setRecipient(value)}
              getOptionLabel={(item) => `${item.name} (${item.number}) `}
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
              style={{ margin: 10 }}
            />

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
              style={{ margin: 10 }}
            />

            <TextField
              label="Sending amount"
              value={amount}
              type="number"
              style={{ margin: 10 }}
              onChange={(value) => setAmount(value.target.value)}
            />

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
              style={{ margin: 10 }}
            />

            <TextField
              label="Receiving amount"
              value={receivingAmount}
              type="number"
              style={{ margin: "10px" }}
              onChange={(value) => setreceivingAmount(value.target.value)}
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
                onClick={handleDone}
                style={{ margin: "10px", backgroundColor: myColors.first }}
              />
              <Button
                children="Close"
                variant="contained"
                onClick={() => clearScreen()}
                size="small"
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
  createTransaction: (payload) => {
    dispatch(createTransaction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransaction);
