import { v4 as uuidv4 } from 'uuid';

export const contains = ({ name, number, otherInfo }, query) => {
  if (
    name.includes(query) ||
    `${number}`.includes(query) ||
    otherInfo.includes(query)
  ) {
    return true;
  }

  return false;
};
export const generateID = () => {
  return uuidv4();;
};
