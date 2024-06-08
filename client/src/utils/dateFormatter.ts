const dateFormatter = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hour = String(d.getHours()).padStart(2, "0");
  const minute = String(d.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}  ${hour}:${minute}`;
};

export default dateFormatter;

export const monthDayDateFormatter = (date: string) => {
  const d = new Date(date);
  const options: {
    month: "long" | "numeric" | "2-digit" | "short" | "narrow" | undefined;
    day: "numeric" | "2-digit" | undefined;
  } = { month: "long", day: "numeric" };
  const formattedDate = d.toLocaleDateString("en-US", options);

  const optionswithTime: {
    month: "long" | "numeric" | "2-digit" | "short" | "narrow" | undefined;
    day: "numeric" | "2-digit" | undefined;
    hour: "numeric" | "2-digit" | undefined;
    minute: "numeric" | "2-digit" | undefined;
    hour12: boolean;
  } = {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const formattedDateWithTIme = d
    .toLocaleString("en-US", optionswithTime)
    .replace(",", "");

  return { formattedDate, formattedDateWithTIme };
};
