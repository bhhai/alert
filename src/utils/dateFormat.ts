import moment from "moment";

export const formatDate = (date: string, format: string) => {
  return moment(new Date(date)).format(format);
};
