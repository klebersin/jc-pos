import { GRADES } from "../../constants";

export const getGrade = (value) => {
  const grade = GRADES.find((grade) => grade.value === value);
  if (!grade) {
    return -1;
  }
  return grade.label;
};
export const toLocaleString = (value) => {
  return parseFloat(value).toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
  });
};
export const getDate = (date) => {
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const today = new Date(date);
  return today.toLocaleDateString("es-PE", options);
};