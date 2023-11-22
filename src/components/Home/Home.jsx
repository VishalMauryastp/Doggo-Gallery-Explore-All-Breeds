import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ breed, setBreed }) => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://dog.ceo/api/breeds/list/all",
    })
      .then((result) => {
        var as = Object.keys(result.data.message).map((key) => [key]);
        setData(as);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [setBreed]);

  const handleSuggestionClick = (val) => {
    setSelectedSuggestion(val);
    setInputValue(val[0]);
  };

  const handleSearch = () => {
    setBreed(inputValue);
  };

  return (
    <div>
      <div className="">
        <div className="pt-4  w-[80%] lg:w-[700px] relative  mx-auto">
          <div
            className=" bg-white   flex items-center py-2  px-4 rounded "
            style={{
              boxShadow: " 0 0 10px #525252",
            }}
          >
            <input
              className="w-[100%]  block  outline-none border-none"
              type="text"
              placeholder="Search here..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setSelectedSuggestion(null);
              }}
            />
            <button
              className="px-4 py-1 bg-gray-400 text-white rounded"
              onClick={handleSearch}

              disabled={!inputValue}
            >
              Search
            </button>
          </div>

          <div
            className={`${
              inputValue.length == 0 || selectedSuggestion ? "hidden" : " "
            }`}
          >
            <div
              className=" absolute  bg-white w-full max-h-[50vh] overflow-y-scroll py-2   my-3"
              style={{
                boxShadow: " 0 0 2px #525252",
              }}
            >
              {data
                .filter((item) => item[0].startsWith(inputValue.toLowerCase()))
                .map((val, i) => {
                  return (
                    <button
                      key={i}
                      className={`block mx-4 py-1 outline-none ${
                        selectedSuggestion === val ? "bg-blue-200" : ""
                      }`}
                      onClick={() => handleSuggestionClick(val)}
                    >
                      {val}
                    </button>
                  );
                })}
              {data.filter((item) =>
                item[0].startsWith(inputValue.toLowerCase())
              ).length === 0 && (
                <div className="mx-4 py-1 text-gray-500">No results found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
