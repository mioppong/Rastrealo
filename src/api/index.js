import _ from "lodash";

export const contains = ({ name, number, otherInfo }, query) => {
  if (
    name.includes(query) ||
    number.includes(query) ||
    otherInfo.includes(query)
  ) {
    return true;
  }

  return false;
};
