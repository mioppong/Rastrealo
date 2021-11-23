import { Autocomplete, Button, Modal, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { contains } from "../../api";
import { creteTransaction } from "../../redux/actions";

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

  const clearScreen = () => {
    // clear screen and clear modal
    setAmount("");
    setSender("");
    setCurrency("");
    setRecipient("");
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
  const options = [
    { label: "The Godfather", id: 1 },
    { label: "Pulp Fiction", id: 2 },
  ];
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
              getOptionLabel={(item) =>
                // <SearchItem key={item.id} users={item} />
                item.name
              }
              options={homeStore.users}
              filterOptions={(arrayOfUsers, typed) => {
                var filtered = arrayOfUsers.filter(function (
                  value,
                ) {
                  return contains(value, typed.inputValue);
                });

                return filtered;
              }}
              renderInput={(params) => <TextField {...params} label="Sender" />}
              sx={{ width: 300 }}
            />
            {/* <Autocomplete
              getOptionLabel={(item) => <SearchItem users={item} />}
              options={homeStore.users}
              //   filterOptions={(a) => console.log("we got", a)}
              renderInput={(params) => (
                <TextField {...params} label="Recipient"   onChange={(value) => setTypedSender(value.target.value)}
                />
              )}
                value={typedSender}
              sx={{ width: 300 }}
            /> */}

            <TextField
              value={recipient}
              style={{ marginTop: "10px" }}
              onChange={(value) => setRecipient(value.target.value)}
            />
            <TextField
              value={sender}
              style={{ marginTop: "10px" }}
              onChange={(value) => setAmount(value.target.value)}
            />
            <TextField
              value={sender}
              style={{ marginTop: "10px" }}
              onChange={(value) => setCurrency(value.target.value)}
            />
            <Button children="done" onClick={() => console.log("")} />
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
  creteTransaction: (payload) => {
    dispatch(creteTransaction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransaction);
