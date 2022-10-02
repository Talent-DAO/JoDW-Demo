import axios from "axios";
import React, { useEffect, useState } from "react";
import clear from "../assets/clear.svg";
import search from "../assets/search.svg";
import { AuthorCard, Footer, ArticleCard } from "../components";
import { strcmp } from "../utils/utils";

const server = "https://tdao-api.herokuapp.com";

const AdvancedSearch = () => {
  const [category, setCategory] = useState("author");
  const [field, setField] = useState("username");
  const [sortField, setSortField] = useState("username");
  const [value, setValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [journalTitle, setJournalTitle] = useState("");
  const [ISBN, setISBN] = useState("");
  // const history = useHistory();

  // useEffect(() => {
  //   const query = history.location.search.split('=')[1];
  //   setValue(query);
  //   searchForQuery(query);
  // }, []);

  useEffect(() => {
    const sortSearchResult = result => {
      console.log("sortField == ", sortField);
      if (result !== []) {
        let isSorted = false;
        result.sort((a, b) => {
          const swapped = strcmp(b[sortField], a[sortField]);
          if (swapped < 0) isSorted = true;
          return swapped;
        });
        console.log("isSorted == ", isSorted);
        if (isSorted) setSearchResult([...result]);
        else setSearchResult(result);
      }
    };

    sortSearchResult(searchResult);
  }, [searchResult, sortField]);

  const sortSearchResult = result => {
    console.log("sortField == ", sortField);
    if (result !== []) {
      let isSorted = false;
      result.sort((a, b) => {
        const swapped = strcmp(b[sortField], a[sortField]);
        if (swapped < 0) isSorted = true;
        return swapped;
      });
      console.log("isSorted == ", isSorted);
      if (isSorted) setSearchResult([...result]);
      else setSearchResult(result);
    }
  };

  const searchForQuery = async query => {
    const cate = category === "author" ? "/api/author_find" : "/api/article_find";
    const params = new URLSearchParams([
      ["field", field],
      ["value", query],
    ]);
    try {
      const res = await axios.get(server + cate, { params });
      console.log(res);
      if (res.data.success) {
        sortSearchResult(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = async () => {
    await searchForQuery(value);
  };

  const handleCategoryChange = event => {
    setValue("");
    setSearchResult([]);
    setCategory(event.target.value);
    if (event.target.value == "author") {
      setField("username");
      setSortField("username");
    } else {
      setField("title");
      setSortField("title");
    }
  };

  const handleSortFieldChange = event => {
    setSortField(event.target.value);
  };

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      handleSearch();
    }
  };

  const handleClearAll = event => {
    setValue("");
    setCategory("author");
    setSearchResult([]);
    setField("username");
    setSortField("username");
    setJournalTitle("");
    setISBN("");
  };

  return (
    <div style={{ backgroundImage: "linear-gradient(#fff, #EEEE" }}>
      <div className="relative" style={{ backgroundColor: "#e2e2e2" }}>
        <div className="lg:mx-auto lg:max-w-2xl overflow-hidden relative text-left space-y-8 py-16">
          <div className="mx-4 flex flex-col items-center justify-center space-y-8">
            <div className="w-full flex flex-row items-center rounded-full bg-white text-white cursor-pointer p-2">
              <input
                type="text"
                className="w-full px-4 text-black text-lg focus:outline-none"
                value={value}
                placeholder="Input Keyword"
                onChange={e => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
              ></input>
              <div
                className="w-12 lg:w-40 bg-primary rounded-full py-2 text-sm flex flex-row items-center justify-center cursor-pointer space-x-2"
                onClick={handleSearch}
              >
                <img className="" src={search} width={24} height={24}></img>
                <div className="hidden lg:inline">Search</div>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row items-start md:items-end space-x-0 md:space-x-8 space-y-4 md:space-y-0">
              <div className="w-full md:w-auto flex flex-col space-y-2">
                <div className="text-sm">Sort by:</div>
                <select
                  id="select-blockchain"
                  name="select-blockchain"
                  className="mt-1 block bg-white w-full pl-3 pr-10 py-2 text-lg rounded-lg"
                  value={sortField}
                  onChange={handleSortFieldChange}
                >
                  {category === "author" ? (
                    <>
                      <option value="username">UserName</option>
                      <option value="bio">Bio</option>
                      <option value="walletId">WalletId</option>
                      <option value="aboutme">About Me</option>
                      <option value="twitter">Twitter</option>
                      <option value="linkedin">LinkedIn</option>
                    </>
                  ) : (
                    <>
                      <option value="title">Title</option>
                      <option value="walletId">WalletId</option>
                      <option value="price">Price</option>
                      <option value="authors">Authors</option>
                      <option value="abstract">Abstract</option>
                      <option value="blockchain">Blockchain</option>
                      <option value="categories">Categories</option>
                    </>
                  )}
                </select>
              </div>
              <div className="w-full md:w-auto flex flex-col space-y-2">
                <div className="text-sm">Category:</div>
                <select
                  id="select-blockchain"
                  name="select-blockchain"
                  className="mt-1 block bg-white w-full pl-3 pr-10 py-2 text-lg rounded-lg"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <option value="author">Author</option>
                  <option value="article">Article</option>
                </select>
              </div>
              <div className="w-full md:w-auto flex flex-col space-y-2">
                <div className="text-sm">Language:</div>
                <select
                  id="select-blockchain"
                  name="select-blockchain"
                  className="mt-1 block bg-white w-full pl-3 pr-10 py-2 text-lg rounded-lg"
                >
                  <option>English</option>
                </select>
              </div>
              <div className="hidden md:flex w-full md:w-auto flex-row items-center pb-4 cursor-pointer" onClick={handleClearAll}>
                <div className="text-sm" style={{ color: "rgba(133, 133, 133, 1)" }}>
                  Clear all
                </div>
                <img className="px-1" src={clear}></img>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row items-start md:items-end space-x-0 md:space-x-8 space-y-4 md:space-y-0">
              <div className="w-full md:w-1/2 flex flex-col space-y-2">
                <div className="text-sm">Journal Title</div>
                <input 
                  type="text"
                  className="text-lg rounded-md p-2 focus:outline-none"
                  onChange={e => setJournalTitle(e.target.value)}
                  value={journalTitle}
                ></input>
              </div>
              <div className="w-full md:w-1/2 flex flex-col space-y-2">
                <div className="text-sm">ISBN</div>
                <input
                  type="text"
                  className="text-lg rounded-md p-2 focus:outline-none"
                  onChange={e => setISBN(e.target.value)}
                  value={ISBN}
                ></input>
              </div>
            </div>
            <div className="md:hidden w-full md:w-auto flex flex-row items-center pb-4 cursor-pointer" onClick={handleClearAll}>
              <div className="text-sm" style={{ color: "rgba(133, 133, 133, 1)" }}>
                Clear all
              </div>
              <img className="px-1" src={clear}></img>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto pt-4 max-w-xl md:max-w-4xl xl:max-w-7xl">
        <div className="text-sm pt-8 text-left">
          {category === "author" ? (
            <div>{searchResult.length} similar Authors found</div>
          ) : (
            <div>{searchResult.length} similar Articles found</div>
          )}
        </div>
        <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {category === "author"
            ? searchResult.map(item => <AuthorCard key={Math.random()} author={item}></AuthorCard>)
            : searchResult.map(item => <ArticleCard key={Math.random()} article={item}></ArticleCard>)}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdvancedSearch;
