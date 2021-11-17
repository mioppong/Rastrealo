import { Button, Modal, Paper } from "@mui/material";
import React, { useState } from "react";
import "./DashboardStyle.css";

const Dashboard = () => {
  const [state, setstate] = useState(false);
  return (
    <div style={{ flexDirection: "row", display: "flex" }}>
      <Paper
        elevation={10}
        style={{ width: "25vh", height: "100vh", background: "pink" }}
      >
        <Button
          onClick={() => setstate(true)}
          style={{ width: "50px", height: "50px", backgroundColor: "red" }}
        />
        <Modal
          open={state}
          style={{ width: "50px", height: "50px", backgroundColor: "blue" }}
        >
          <Paper style={{ width: "50px", height: "50px" }} />
        </Modal>
      </Paper>

      <Paper
        elevation={10}
        style={{
          width: "100%",
          height: "100vh",
          marginLeft: "25px",
        }}
      >
        <Button children="ADD" />
      </Paper>
    </div>
  );
};
export default Dashboard;
