import moment from "moment";

export const getTimeFromNow = (time: string) => {
  return moment(time).fromNow();
};
