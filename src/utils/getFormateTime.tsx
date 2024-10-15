import moment from "moment";

export const getFormateTime = (dateString: string): string => {
  return moment(dateString).format("DD MMM YYYY");
};
