import { ArrowCircleDownRounded } from "@mui/icons-material";
import { Card, Typography } from "@mui/material";
import React from "react";
import LoadingOverlay from "react-loading-overlay";
import { connect } from "react-redux";
import { dateIntToString, formattedMoney } from "../../api";
import { myColors } from "../../styles/myColors";

const EachTransaction = ({ transaction }) => (
  <Card
    style={{
      margin: 10,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#f3e7fe",
      padding: "1%",
      width: 300,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1%",
      }}
    >
      <Typography>{transaction.from.name}</Typography>
      <Typography style={{ fontWeight: "bold" }}>
        {formattedMoney(transaction.amount)} {transaction.currency}
      </Typography>
    </div>

    <ArrowCircleDownRounded fontSize="large" />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1%",
      }}
    >
      <Typography>
        {transaction.to.name} {`(${transaction.to.number})`}
      </Typography>
      <Typography style={{ fontWeight: "bold" }}>
        {formattedMoney(transaction.receivingAmount)}{" "}
        {transaction.receivingCurrency}
      </Typography>
    </div>
    <div style={{ alignSelf: "flex-end" }}>
      {dateIntToString(transaction.date)}
    </div>
  </Card>
);

const AllTransactions = ({ data, homeStore }) => {
  return (
    <LoadingOverlay
      active={homeStore.loading}
      spinner
      text="Loading your content..."
      styles={{ display: "flex" }}
    >
      <Typography variant="h6" color={myColors.first}>
        All Transactions
      </Typography>
      {data.map((item, index) => {
        return <EachTransaction transaction={item} key={index} />;
      })}
    </LoadingOverlay>
  );
};

const mapStateToProps = (state) => ({
  homeStore: state.homeStore,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AllTransactions);
