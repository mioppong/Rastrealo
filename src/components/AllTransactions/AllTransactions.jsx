import React from "react";
import { connect } from "react-redux";

const AllTransactions = ({ data }) => {
  return (
    <div style={{ display: "flex" }}>
      {data.map((item, index) => {
        return (
          <div style={{ margin: 10 }} key={index}>
            <div>{item.from.name}</div>
            <div>{item.to.name}</div>
            <div>{item.amount}</div>
            <div>{item.date}</div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AllTransactions);
