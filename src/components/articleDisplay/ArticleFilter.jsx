import React from "react";
import "./styles/articleFilter.css";

const ArticleFilter = ({
  selectedDate,
  handleDatePicker,
  selectedFilter,
  handleFilterChange,
}) => {
  return (
    <div className="articleViewFilter">
      <div>
        <p>Start date:</p>
        <input
          data-testid={"article-date"}
          type="date"
          value={selectedDate}
          onChange={handleDatePicker}
        />
      </div>
      <div className="articleViewFilterResults">
        <p>Number of Results</p>
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          name="articleFilter"
          id="articleFilter"
        >
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="75">75</option>
          <option value="100">100</option>
          <option value="200">200</option>
        </select>
      </div>
    </div>
  );
};

export default ArticleFilter;
