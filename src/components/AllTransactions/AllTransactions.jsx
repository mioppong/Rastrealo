import { Paper } from "@mui/material";
import React from "react";
import { connect } from "react-redux";

const EachTransaction = ({ transaction }) => (
  <div style={{ margin: 10 }}>
    <div>{transaction.from.name}</div>
    <div>{transaction.to.name}</div>
    <div>{transaction.amount}</div>
    <div>{transaction.currency}</div>
    <div>{transaction.receivingCurrency}</div>
    <div>{transaction.receivingAmount}</div>
    <div>{transaction.date}</div>
  </div>
);

const AllTransactions = ({ data }) => {
  return (
    <Paper>
      {data.map((item, index) => {
        return <EachTransaction transaction={item} key={index} />;
      })}
    </Paper>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AllTransactions);
