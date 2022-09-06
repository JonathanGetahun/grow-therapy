import React, { useEffect, useState } from "react";

import "./styles/articleView.css";

import ArticleCard from "./ArticleCard";
import ArticleFilter from "./ArticleFilter";
import { fetchArticles } from "../../api/fetchArticles";
import {
  getLocalStorage,
  getUniqueArticleArray,
} from "../../utils/localStorageData";

import { Divider, Paper } from "@mui/material";
import dayjs from "dayjs";

const ArticleView = () => {
  const [articles, setArticles] = useState([]);
  const [showArticles, setShowArticles] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("100");
  const [selectedDate, setSelectedDate] = useState(
    dayjs().subtract(1, "d").format("YYYY-MM-DD")
  );
  const [showPinnedArticles, setShowPinnedArticles] = useState([]);
  const [uniqueArticleArray, setUniqueArticleArray] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchArticles(selectedDate);
        const formattedData = data?.articles?.slice(0, selectedFilter);

        setArticles(data?.articles);
        setShowArticles(formattedData?.slice(0, selectedFilter));
        setShowPinnedArticles(() => getLocalStorage("pinnedArticles"));
        setUniqueArticleArray(() => getUniqueArticleArray("pinnedArticles"));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [selectedDate]);

  const handleFilterChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSelectedFilter(value);
    setShowArticles(articles.slice(0, value));
  };

  const handleDatePicker = async (e) => {
    e.preventDefault();
    const newDate = dayjs(e.target.value).format("YYYY-MM-DD");
    setSelectedDate(newDate);
  };

  const addToLocalStorage = ({ article, views }) => {
    try {
      const data = getLocalStorage("pinnedArticles");
      const uniqueArticle = article;

      data.push({ uniqueArticle, views });
      window.localStorage.setItem("pinnedArticles", JSON.stringify(data));
      setShowPinnedArticles(data);
      setUniqueArticleArray((prev) => [...prev, uniqueArticle]);
    } catch (e) {
      // TODO: catch possible errors:
      // Losing connection to internet, etc.
    }
  };

  const removeFromLocalStorage = ({ article }) => {
    try {
      const value = getLocalStorage("pinnedArticles");
      const findIdx = value.findIndex((el) => el.uniqueArticle === article);
      if (findIdx > -1) value.splice(findIdx, 1);
      window.localStorage.setItem("pinnedArticles", JSON.stringify(value));
      setUniqueArticleArray(getUniqueArticleArray("pinnedArticles"));
      setShowPinnedArticles(value);
    } catch (err) {}
  };

  return (
    <div className="articleView">
      <ArticleFilter
        selectedDate={selectedDate}
        handleDatePicker={handleDatePicker}
        selectedFilter={selectedFilter}
        handleFilterChange={handleFilterChange}
      />
      {uniqueArticleArray.length ? (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            maxHeight: 200,
            overflow: "auto",
            backgroundColor: "lightblue",
            marginTop: "2rem",
            paddingBottom: "1rem",
            width: 320,
          }}
        >
          {uniqueArticleArray && showPinnedArticles ? (
            showPinnedArticles.map(({ uniqueArticle, views }, idx) => {
              return (
                <ArticleCard
                  key={uniqueArticle + idx}
                  articleName={uniqueArticle}
                  views={views}
                  pin={false}
                  handlePinArticle={removeFromLocalStorage}
                />
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </Paper>
      ) : (
        <h3>Click a pin to save articles !</h3>
      )}
      <Divider sx={{ paddingBottom: "2rem" }} />
      {uniqueArticleArray && showArticles ? (
        showArticles.map(({ article, views }) => {
          let alreadyPinned = false;
          if (uniqueArticleArray.includes(article)) alreadyPinned = true;
          return (
            <ArticleCard
              key={article}
              articleName={article}
              views={views}
              pin={alreadyPinned}
              handlePinArticle={addToLocalStorage}
            />
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ArticleView;
