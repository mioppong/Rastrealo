import React from "react";
import LoadingOverlay from "react-loading-overlay";
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

const AllTransactions = ({ data, homeStore }) => {
  return (
    <LoadingOverlay
      active={homeStore.loading}
      spinner
      text="Loading your content..."
      styles={{ display: "flex" }}
    >
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
