import React from "react";
import { format, parseISO, isValid } from "date-fns";

const FormatDate = (dateString) => {
  if (!dateString) return "No date";

  try {
    const date = parseISO(dateString);

    if (!isValid(date)) {
      return "Invalid date";
    }

    return format(date, "MMM d, yyyy, h:mm a");
  } catch (error) {
    console.error("Date formatting error:", error, dateString);
    return "Invalid date";
  }
};

export default FormatDate;
