import axios from "axios";
import dayjs from "dayjs";

export const fetchArticles = async (selectedDate) => {
  try {
    const newDate = dayjs(selectedDate);
    const [year, month, day] = [
      newDate.format("YYYY"),
      newDate.format("MM"),
      newDate.format("DD"),
    ];

    const response = await axios.get(
      `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month}/${day}`
    );

    return response?.data?.items?.[0];
  } catch (err) {
    console.error(err);
    if (err.response.status === 404) {
      window.alert(
        "No articles found, make sure to choose a date before today."
      );
    } else {
      return [];
    }
  }
};
