import { v4 as uuidv4 } from "uuid";

export const contains = ({ name, number, otherInfo }, query) => {
  if (
    name.toLowerCase().includes(query.toLowerCase()) ||
    `${number}`.toLowerCase().includes(query.toLowerCase()) ||
    otherInfo.toLowerCase().includes(query.toLowerCase())
  ) {
    return true;
  }

  return false;
};
export const generateID = () => {
  return uuidv4();
};

export const formattedMoney = (money) => {
  if (money) {
    const twoDecimalPlaces = (Math.round(money * 100) / 100).toFixed(2);

    const formattedMoney = twoDecimalPlaces
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$ ${formattedMoney}`;
  }
  return "";
};

export const dateIntToString = (date) => {
  // convert date.now to string
  const d = date ? new Date(date) : new Date();
  const formattedDate = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  return formattedDate;
};
export const exportAllData = (array) => {
  let returningArray = [
    [
      "index",
      "Sender",
      "Receiver + Phone number",
      "Sending Amount + Currency",
      "Receiving Amount + Currency",
      "Date",
    ],
  ];
  Array.from(array).forEach((transaction, index) => {
    const newItemInArray = [
      `${index+ 1}`,
      `${transaction.from.name} ${transaction.from.number}`,
      `${transaction.to.name} ${transaction.to.number}`,
      `${formattedMoney(transaction.amount)} ${transaction.currency}`,
      `${formattedMoney(transaction.receivingAmount)} ${
        transaction.receivingCurrency
      }`,
      `${dateIntToString(transaction.date)}`,
    ];

    returningArray.push(newItemInArray);
  });

  return returningArray;
};
export const exportTodayData = (array) => {
  let returningArray = [
    [
      "index",
      "Sender",
      "Receiver + Phone number",
      "Sending Amount + Currency",
      "Receiving Amount + Currency",
      "Date",
    ],
  ];

  Array.from(array).forEach((transaction, index) => {
    const newItemInArray = [
      `${index+ 1}`,
      `${transaction.from.name} ${transaction.from.number}`,
      `${transaction.to.name} ${transaction.to.number}`,
      `${formattedMoney(transaction.amount)} ${transaction.currency}`,
      `${formattedMoney(transaction.receivingAmount)} ${
        transaction.receivingCurrency
      }`,
      `${dateIntToString(transaction.date)}`,
    ];
    const itemsDate = new Date(transaction.date);
    const currentDate = new Date();
    if (
      itemsDate.getFullYear() === currentDate.getFullYear() &&
      itemsDate.getMonth() === currentDate.getMonth() &&
      itemsDate.getDate() === currentDate.getDate()
    ) {
      returningArray.push(newItemInArray);
    }
  });
  return returningArray;

};
