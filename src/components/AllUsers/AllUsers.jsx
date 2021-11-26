import { Card, Typography } from "@mui/material";
import React from "react";
import LoadingOverlay from "react-loading-overlay";
import { connect } from "react-redux";
import { myColors } from "../../styles/myColors";

const EachUser = ({ user }) => {
  return (
    <Card
      style={{
        margin: 10,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f3e7fe",
        padding: "1%",
        width: 250,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography style={{ fontWeight: "bold" }}>{user.name}</Typography>
      <Typography
        style={{ fontWeight: "bold" }}
      >{`(${user.number})`}</Typography>
    </Card>
  );
};

const AllUsers = ({ data, homeStore }) => {
  return (
    <LoadingOverlay
      active={homeStore.loading}
      spinner
      fadeSpeed={2000}
      text="Loading your content..."
      styles={{ display: "flex" }}
    >
      <Typography variant="h6" color={myColors.first}>
        All Users
      </Typography>
      {data.map((item, index) => {
        return <EachUser user={item} key={index} />;
      })}
    </LoadingOverlay>
  );
};

const mapStateToProps = (state) => ({
  homeStore: state.homeStore,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
