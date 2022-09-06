import React from "react";
import MainTitle from "./components/headers/MainTitle";
import ArticleView from "./components/articleDisplay/ArticleView";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <MainTitle />
      <ArticleView />
    </div>
  );
};

export default App;
