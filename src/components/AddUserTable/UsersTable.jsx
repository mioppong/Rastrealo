import { Typography } from "@mui/material";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { dateIntToString } from "../../api";
import Arrow from "../Icons/Arrow";
import { Audio } from "react-loader-spinner";

const customStyles = {
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      backgroundColor: "#f2f2f2",
    },
  },
};

const ColumnTitleText = ({ text }) => (
  <Typography style={{ fontWeight: "bold", fontSize: 15, color: "#404040" }}>
    {text}
  </Typography>
);

const CustomText = ({ text }) => (
  <Typography style={{ fontSize: 14 }}>{text}</Typography>
);

const columns = [
  {
    name: <ColumnTitleText text={"Name"} />,
    selector: (row) => row.name,
    sortable: true,
    cell: (row) => <CustomText text={row.name} />,
  },
  {
    name: <ColumnTitleText text={"Phone number"} />,
    selector: (row) => row.number,
    cell: (row) => <CustomText text={row.number} />,

    sortable: true,
  },
  {
    name: <ColumnTitleText text={"Other Info"} />,
    selector: (row) => row.otherInfo,
    cell: (row) => <CustomText text={row.otherInfo} />,
    sortable: true,
  },
];

const UsersTable = () => {
  const homeStore = useSelector((state) => state.homeStore);
  const { users, loading } = homeStore;
  return (
    <>
      <DataTable
        progressPending={loading}
        customStyles={{ backgroundColor: "blue" }}
        style={{ paddingLeft: 10, paddingRight: 10 }}
        sortIcon={<Arrow />}
        columns={columns}
        data={users}
        customStyles={customStyles}
        highlightOnHover
        pagination
      />
    </>
  );
};

export default UsersTable;
