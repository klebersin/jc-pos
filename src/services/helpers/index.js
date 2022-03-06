import { GRADES } from "../../constants";

export const getGrade = (value) => {
  const grade = GRADES.find((grade) => grade.value === value);
  if (!grade) {
    return -1;
  }
  return grade.label;
};
