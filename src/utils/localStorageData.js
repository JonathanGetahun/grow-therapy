const getLocalStorage = (key) => {
  try {
    const value = JSON.parse(window.localStorage.getItem(key));
    if (!value) {
      window.localStorage.setItem("pinnedArticles", JSON.stringify([]));
      return [];
    } else return value;
  } catch (e) {
    // TODO: catch possible errors:
    // Losing connection to internet, etc.
    return [];
  }
};

const getUniqueArticleArray = (key) => {
  try {
    const yep = getLocalStorage(key).reduce((acc, { uniqueArticle }) => {
      acc.push(uniqueArticle);
      return acc;
    }, []);
    return yep;
  } catch (e) {
    return [];
  }
};

export { getLocalStorage, getUniqueArticleArray };
