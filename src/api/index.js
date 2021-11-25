import { v4 as uuidv4 } from 'uuid';

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
    const formattedMoney = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return `$ ${formattedMoney}`;
  }
  return '';
};