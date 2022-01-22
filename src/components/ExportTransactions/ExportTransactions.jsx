import { Button, Modal, Paper, Radio, Typography } from "@mui/material";
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { connect } from "react-redux";

import { myColors } from "../../styles/myColors";
import { dateIntToString, exportAllData, exportTodayData } from "../../api";

// Button and modal for exporting transactions in csv, excel format
const ExportTransactions = (props) => {
  const { homeStore } = props;
  const [exportType, setExportType] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);

  const clearScreen = () => {
    setModalVisible(false);
  };

  const modalContainerStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  };

  return (
    <div>
      <Button
        children="Export Transactions"
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
              height: "200px",
              width: "300px",
              marginTop: "10vh",
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              overflow: "auto",
            }}
          >
            <FormControl component="fieldset">
              <FormLabel component="legend">Which Data to Export</FormLabel>
              <RadioGroup
                aria-label="gender"
                defaultValue="all"
                name="radio-buttons-group"
                onChange={(item) => setExportType(item.target.value)}
              >
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel
                  value="today"
                  control={<Radio />}
                  label="Only today"
                />
              </RadioGroup>
              <Typography style={{ opacity: 0.5 }}>
                data format is a csv
              </Typography>
            </FormControl>

            <div style={{ marginTop: "auto", alignSelf: "center" }}>
              <Button
                size="large"
                variant="contained"
                children="done"
                style={{ margin: "10px", backgroundColor: myColors.first }}
              >
                <CSVLink
                  style={{ flex: 1 }}
                  filename={`${dateIntToString()}.csv`}
                  data={
                    exportType === "all"
                      ? exportAllData(homeStore.transactions)
                      : exportTodayData(homeStore.transactions)
                  }
                >
                  Export to CSV
                </CSVLink>
              </Button>

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
    </div>
  );
};

const mapStateToProps = (state) => ({
  homeStore: state.homeStore,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ExportTransactions);
