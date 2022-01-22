import { ArrowCircleDownRounded, DeleteRounded } from "@mui/icons-material";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { connect } from "react-redux";
import { dateIntToString, formattedMoney } from "../../api";
import { deleteTransaction } from "../../redux/actions";
import { myColors } from "../../styles/myColors";

const EachTransaction = (props) => {
  const { transaction, deleteTransaction } = props;
  const [dialog, setDialog] = useState(false);
  const cardStyle = {
    margin: 10,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#e7e6ff",
    padding: "1%",
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  };
  const topPart = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1%",
  };

  const middlePart = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1%",
  };

  const bottomPart = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  };

  const handleClose = () => {
    setDialog(false);
  };

  const handleClickOpen = () => {
    setDialog(true);
  };

  return (
    <>
      <Card style={cardStyle}>
        <div style={topPart}>
          <Typography>{transaction.from.name}</Typography>
          <Typography style={{ fontWeight: "bold" }}>
            {formattedMoney(transaction.amount)} {transaction.currency}
          </Typography>
        </div>

        <ArrowCircleDownRounded fontSize="large" />
        <div style={middlePart}>
          <Typography>
            {transaction.to.name} {`(${transaction.to.number})`}
          </Typography>
          <Typography style={{ fontWeight: "bold" }}>
            {formattedMoney(transaction.receivingAmount)}{" "}
            {transaction.receivingCurrency}
          </Typography>
        </div>
        <div style={bottomPart}>
          <Button style={{ color: "red" }} onClick={() => handleClickOpen()}>
            <DeleteRounded fontSize="medium" />
          </Button>
          <Typography style={{ fontWeight: "bold" }}>
            {dateIntToString(transaction.date)}
          </Typography>
        </div>
      </Card>

      <Dialog open={dialog} keepMounted onClose={handleClose}>
        <DialogTitle>{"Delete this transaction"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete thid transaction, after deleting, it
            can not be recovered
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
              deleteTransaction(transaction);
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

const AllTransactions = ({ data, homeStore, deleteTransaction }) => {
  return (
    <LoadingOverlay
      active={homeStore.loading}
      spinner
      text="Loading your content..."
      styles={{}}
    >
      {data.map((item, index) => {
        return (
          <EachTransaction
            deleteTransaction={deleteTransaction}
            transaction={item}
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
  deleteTransaction: (payload) => {
    dispatch(deleteTransaction(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AllTransactions);
