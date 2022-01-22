import { Typography } from "@mui/material";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { dateIntToString, formattedMoney } from "../../api";
import Arrow from "../Icons/Arrow";
import RightArrow from "../Icons/RightArrow";

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

const CurrencyComponent = ({ row }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <Typography
      style={{ fontSize: 14, marginRight: 5 }}
      children={`${row.currency}`}
    />
    <RightArrow />
    <Typography
      style={{ fontSize: 14, marginLeft: 5 }}
      children={`${row.receivingCurrency}`}
    />
  </div>
);

const CustomText = ({ text }) => (
  <Typography style={{ fontSize: 14 }}>{text}</Typography>
);

const columns = [
  {
    name: <ColumnTitleText text={"Date"} />,
    selector: (row) => row.date,
    sortable: true,
    cell: (row) => <CustomText text={dateIntToString(row.date)} />,
  },
  {
    name: <ColumnTitleText text={"From"} />,
    selector: (row) => row.from.name,
    sortable: true,
    cell: (row) => <CustomText text={row.from.name} />,
  },
  {
    name: <ColumnTitleText text={"To"} />,
    selector: (row) => row.to.name,
    cell: (row) => <CustomText text={row.to.name} />,

    sortable: true,
  },
  {
    name: <ColumnTitleText text={"Currency"} />,
    selector: (row) => row.currency,
    sortable: true,
    cell: (row) => <CurrencyComponent row={row} />,
  },

  {
    name: <ColumnTitleText text={"Amount"} />,
    selector: (row) => row.amount,
    sortable: true,
    cell: (row) => <CustomText text={formattedMoney(row.amount)} />,
  },
];

const MyTable = () => {
  const homeStore = useSelector((state) => state.homeStore);
  const { transactions, loading } = homeStore;
  return !loading ? (
    <DataTable
      customStyles={{ backgroundColor: "blue" }}
      style={{ paddingLeft: 10, paddingRight: 10 }}
      sortIcon={<Arrow />}
      columns={columns}
      data={transactions}
      customStyles={customStyles}
      highlightOnHover
      pagination
    />
  ) : null;
};

export default MyTable;
