import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = ({
  breed,
  setBreed,
  selectedSubcetagory,
  setSelectedSubcetagory,
}) => {
  const [data, setData] = useState([]);
  const [cetagory, setCetagory] = useState([]);
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

  useEffect(() => {
    if (cetagory) {
      axios({
        method: "get",
        url: `https://dog.ceo/api/breed/${cetagory}/list`,
      })
        .then((result) => {
          setCetagory(result.data.message);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [cetagory]);

  const handleSuggestionClick = (val) => {
    setSelectedSuggestion(val);
    setInputValue(val[0]);
    setCetagory(val);
  };

  const handleSearch = () => {
    setBreed(inputValue);
  };

  return (
    <div>
      <div className="">
        <div className="pt-4   w-[80%] lg:w-[700px] relative  mx-auto">
          <div
            className=" bg-white mt-8  flex gap-2 items-center py-2  px-4 rounded "
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
            <div className=" max-md:hidden border-l-2 border-gray-300">
              <select
                className=" max-sm:w-full px-4 py-2 outline-none"
                name="subBreed"
                id="subBreedSelect"
                value={selectedSubcetagory}
                onChange={(e) => {
                  setSelectedSubcetagory(e.target.value);
                }}
              >
                <option value="">Select sub breed</option>
                {cetagory.map((val, i) => {
                  return (
                    <option key={i} value={val}>
                      {val}
                    </option>
                  );
                })}
                {cetagory.length === 0 ? (
                  <option value="">No result found!</option>
                ) : null}
              </select>
            </div>

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
          <div
            className=" md:hidden bg-white  mt-4 max-sm:w-full   w-fit"
            style={{
              boxShadow: " 0 0 2px #525252",
            }}
          >
            <select
              className=" max-sm:w-full px-4 py-2 outline-none"
              name="subBreed"
              id="subBreedSelect"
              value={selectedSubcetagory}
              onChange={(e) => {
                setSelectedSubcetagory(e.target.value);
              }}
            >
              <option value="">Select sub breed</option>
              {cetagory.map((val, i) => {
                return (
                  <option key={i} value={val}>
                    {val}
                  </option>
                );
              })}
              {cetagory.length === 0 ? (
                <option value="">No result found!</option>
              ) : null}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
