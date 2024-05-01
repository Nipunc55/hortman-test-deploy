import dayjs from "dayjs";

export const formattedDateForStatus = () => {
  const currentDate = dayjs().format("MMMM DD, YYYY");
  return currentDate;
};
